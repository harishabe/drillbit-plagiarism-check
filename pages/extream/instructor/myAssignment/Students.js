import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import _ from 'lodash';
import debouce from 'lodash.debounce';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import { Grid, TextField, Tooltip, Skeleton } from '@mui/material';
import { Pagination } from '@mui/material';
import { IconButton } from '@mui/material';
import Instructor from '../../../../layouts/Instructor';
import {
    CommonTable,
    CreateDrawer,
    WarningDialog,
    DialogModal,
    Instructions,
    CardView,
} from '../../../../components';
import {
    EditIcon,
    DeleteIcon,
    DeleteWarningIcon,
    AddMultipleIcon,
    AddPersonIcon,
    AddFromListIcon,
    DownloadIcon
} from '../../../../assets/icon';
import StudentForm from '../form/StudentForm';
import {
    GetStudent,
    DeleteStudent,
    UploadFileDataClear,
} from '../../../../redux/action/instructor/InstructorAction';
import {
    DownloadCsv,
} from '../../../../redux/action/common/Submission/SubmissionAction';
import StudentInstitute from '../studentInstitute';
import { removeCommaWordEnd, setItemSessionStorage, platform } from '../../../../utils/RegExp';
import { PaginationValue } from '../../../../utils/PaginationUrl';
import { PaginationContainer } from '../../../../style/index';
import { BASE_URL_EXTREM } from '../../../../utils/BaseUrl';
import END_POINTS from '../../../../utils/EndPoints';
import { DOWNLOAD_CSV, WARNING_MESSAGES, WINDOW_PLATFORM } from '../../../../constant/data/Constant';
import { INSTRUCTIONS_STEPS } from '../../../../constant/data/InstructionMessage';

const AddButtonBottom = styled.div`
    position:fixed;
    bottom: 30px;
    right:30px;
    z-index:999;
`;

const SearchField = styled.div`
    position:absolute;
    top: 125px;
    right:16px;
`;

const DownloadField = styled.div`
    position:absolute;
    top: 125px;
    right:${platform === WINDOW_PLATFORM ? '245px' : '225px'};
`;

const SkeletonContainer = styled.div`
    marginTop: 10px;
    margin-right: 5px;
`;

const DownloadButton = styled.div`
    margin-top:-5px;
`;

const DeleteAllButton = styled.div`
    marginLeft: 10px;
`;

const columns = [
    { id: 'student_id', label: 'Student ID' },
    { id: 'name', label: 'Student Name' },
    { id: 'username', label: 'Email' },
    { id: 'department', label: 'Department' },
    { id: 'section', label: 'Section' },
    { id: 'action', label: 'Actions' },
];

function createData(id, student_id, name, username, department, section, action, phone_number) {
    return { id, student_id, name, username, department, section, action, phone_number };
}

const Students = ({
    GetStudent,
    studentData,
    pageDetailsStudent,
    isLoadingStudent,
    DeleteStudent,
    setPaginationStudent,
    UploadFileDataClear,
    DownloadCsv,
    isLoadingDownload,
    activeTab
}) => {

    const router = useRouter();

    const [rows, setRows] = useState([]);
    const [showInstructions, setShowInstructions] = useState(false);
    const [showDialogModal, setShowDialogModal] = useState(false);
    const [showDeleteWarning, setShowDeleteWarning] = useState(false);
    const [showDeleteAllIcon, setShowDeleteAllIcon] = useState(false);
    const [deleteRowData, setDeleteRowData] = useState('');
    const [editStudent, setEditStudent] = useState(false);
    const [search, setSearch] = useState(false);
    const [editStudentData, setEditStudentData] = useState('');
    const [paginationPayload, setPaginationPayload] = useState({
        page: PaginationValue?.page,
        size: PaginationValue?.size,
        field: 'user_id',
        orderBy: PaginationValue?.orderBy,
    });
    const [clasId, setClasId] = useState('');
    const [clasName, setClasName] = useState('');

    useEffect(() => {
        GetStudent(router.query.clasId, paginationPayload);
        setItemSessionStorage('tab', activeTab)
    }, [, paginationPayload]);

    useEffect(() => {
        setClasId(router.query.clasId);
        setClasName(router.query.clasName);
    }, [router.isReady]);

    useEffect(() => {
        let row = '';
        let arr = [];
        studentData?.map((student) => {
            row =
                createData(
                    student.id,
                    student.student_id,
                    student.name,
                    student.username,
                    student.department,
                    student.section,
                    [{ 'component': <EditIcon />, 'type': 'edit', 'title': 'Edit' },
                        { 'component': <DeleteIcon />, 'type': 'delete', 'title': 'Delete' },
                    ],
                    student.phone_number,
                );
            row['isSelected'] = false;
            arr.push(row);
        });
        setRows([...arr]);
    }, [studentData]);

    useEffect(() => {
        if (rows.length === 0 && !isLoadingStudent) {
            const timer = setTimeout(() => {
                setShowInstructions(true);
            }, 100);
            return () => clearTimeout(timer);
        } else {
            setShowInstructions(false);
        }
    }, [isLoadingStudent, rows]);

    const handleAction = (e, icon, rowData) => {
        e.preventDefault();
        if (icon === 'edit') {
            setEditStudent(true);
            setEditStudentData(rowData);
        } else if (icon === 'delete') {
            setDeleteRowData(rowData?.id);
            setShowDeleteWarning(true);
        }
    };

    const handleYesWarning = () => {
        DeleteStudent(clasId, deleteRowData);
        setShowDeleteAllIcon(false);
        setTimeout(() => {
            setShowDeleteWarning(false);
        }, [100]);
    };

    const handleCloseWarning = () => {
        setShowDeleteWarning(false);
    };

    const handleTableSort = (e, column, sortToggle) => {
        e.preventDefault();
        if (sortToggle) {
            paginationPayload['field'] = column.id;
            paginationPayload['orderBy'] = 'asc';
        } else {
            paginationPayload['field'] = column.id;
            paginationPayload['orderBy'] = 'desc';
        }
        setPaginationPayload({ ...paginationPayload, paginationPayload });
    };

    const handleCheckboxSelect = (e, value) => {
        e.preventDefault();
        if (value) {
            let rowData = rows?.map((rowItem) => {
                rowItem['isSelected'] = false;
                return rowItem;
            });
            setRows(rowData);
        } else {
            let rowData = rows?.map((rowItem) => {
                rowItem['isSelected'] = !rowItem['isSelected'];
                return rowItem;
            });
            setRows(rowData);
        }
    };

    const handleSingleSelect = (e, row) => {
        let rowData = rows?.map((rowItem) => {
            if (rowItem?.id === row?.id) {
                rowItem['isSelected'] = !rowItem['isSelected'];
            }
            return rowItem;
        });
        setRows(rowData);
    };

    const deleteAllStudent = () => {
        let rowsId = '';
        _.filter(rows, function (o) {
            if (o.isSelected === true) {
                return rows;
            }
        }).map((rowItem) => {
            rowsId += rowItem?.id + ',';
        });
        setDeleteRowData(removeCommaWordEnd(rowsId));
        setShowDeleteWarning(true);
    };

    const handleShow = (e, info) => {
        if (info?.title === 'Add From List') {
            setShowDialogModal(true);
        } else if (info?.title === 'Add Multiple Student') {
            UploadFileDataClear();
            router.push({ pathname: '/extream/instructor/addBulkStudent', query: { clasId: clasId, clasName: clasName } });
        }
    };

    const handleCloseDialog = () => {
        setShowDialogModal(false);
    };

    const handlePagination = (event, value) => {
        event.preventDefault();
        setPaginationStudent({ ...paginationPayload, 'page': value - 1 });
    };

    const handleSearchStudent = (event) => {
        if (event.target.value !== '') {
            paginationPayload['search'] = event.target.value;
            setSearch(true)
            setPaginationPayload({ ...paginationPayload, paginationPayload });
        } else {
            delete paginationPayload['search'];
            setSearch(false)
            setPaginationPayload({ ...paginationPayload, paginationPayload });
        }
    };

    const searchStudents = useMemo(() => {
        return debouce(handleSearchStudent, 300);
    }, []);

    useEffect(() => {
        return () => {
            searchStudents.cancel();
        };
    });

    const handleCloseDrawer = (drawerClose) => {
        setEditStudent(drawerClose);
    };

    const handleDownload = () => {
        DownloadCsv(BASE_URL_EXTREM + END_POINTS.CREATE_ASSIGNMENT + `${router.query.clasId}/students/download`, DOWNLOAD_CSV.STUDENTS_LISTS);
    };

    const tableComponent = (
        <CommonTable
            isCheckbox={ true }
            isSorting={ true }
            isStudent={ true }
            tableHeader={ columns }
            tableData={ rows }
            handleAction={ handleAction }
            handleTableSort={ handleTableSort }
            handleCheckboxSelect={ handleCheckboxSelect }
            handleSingleSelect={ handleSingleSelect }
            isLoading={ isLoadingStudent }
            charLength={ 17 }
            path=''
        />
    );

    return (
        <React.Fragment>
            { showDialogModal &&
                <>
                    <DialogModal
                    headingTitle={ 'Institute Students List' }
                    isOpen={ true }
                        fullWidth="lg"
                        maxWidth="lg"
                    handleClose={ handleCloseDialog }
                    >
                        <StudentInstitute
                        classId={ router.query.clasId }
                        />
                    </DialogModal>
                </>
            }
            {
                showDeleteWarning &&
                <WarningDialog
                    warningIcon={ <DeleteWarningIcon /> }
                    message={ WARNING_MESSAGES.DELETE }
                    handleYes={ handleYesWarning }
                    handleNo={ handleCloseWarning }
                    isOpen={ true }
                />
            }
            <AddButtonBottom>
                <CreateDrawer
                    options={ [
                        {
                            icon: <AddPersonIcon />,
                            title: 'Add Student',
                            handleFromCreateDrawer: false
                        },
                        {
                            icon: <AddMultipleIcon />,
                            title: 'Add Multiple Student',
                            handleFromCreateDrawer: true
                        },
                        {
                            icon: <AddFromListIcon />,
                            title: 'Add From List',
                            handleFromCreateDrawer: true
                        }] }
                    title="Add Student"
                    handleMultiData={ handleShow }
                    isShowAddIcon={ true }>
                    <StudentForm />
                </CreateDrawer>
            </AddButtonBottom>
            {
                editStudent &&
                <CreateDrawer
                    title="Edit Student"
                        isShowAddIcon={ false }
                        showDrawer={ editStudent }
                        handleDrawerClose={ handleCloseDrawer }
                >
                    <StudentForm
                            editData={ editStudentData }
                    />
                </CreateDrawer>
            }
            <Box sx={ { flexGrow: 1 } }>
                <Grid container spacing={ 1 }>
                    <Grid item container direction='row' justifyContent={ 'right' }>
                        <DownloadField>
                            <DownloadButton>
                                { studentData?.length > 0 &&
                                    isLoadingDownload ?
                                    <SkeletonContainer>
                                        <Skeleton style={ { marginTop: '10px' } } width={ 50 } />
                                    </SkeletonContainer>
                                    : <Tooltip title="Download csv" arrow>
                                        <IconButton
                                            color="primary"
                                            aria-label="download-file"
                                            size="large"
                                            onClick={ handleDownload }>
                                            <DownloadIcon />
                                        </IconButton>
                                    </Tooltip>
                                }
                            </DownloadButton>
                        </DownloadField>
                        <SearchField>
                            <TextField
                                placeholder='Search'
                                onChange={ searchStudents }
                                inputProps={ {
                                    style: {
                                        padding: 5,
                                        display: 'inline-flex'
                                    }
                                } }
                            />
                        </SearchField>
                    </Grid>
                </Grid>
            </Box>
            <>
                { _.find(rows, function (o) { return o.isSelected === true; }) && <DeleteAllButton>
                    <Tooltip title='Delete' arrow>
                        <IconButton onClick={ deleteAllStudent }>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </DeleteAllButton> }
                { isLoadingStudent ? tableComponent :
                    <>
                        { search ? tableComponent :
                            <>
                                { rows && rows.length > 0 ? tableComponent :
                                    showInstructions && (<CardView>
                                        <Instructions message={ Object.values(INSTRUCTIONS_STEPS.STUDENT) } />
                                    </CardView>)
                                }
                            </>
                        }
                    </>
                }

                { !showInstructions && <PaginationContainer>
                    <Pagination
                        count={ pageDetailsStudent?.totalPages }
                        onChange={ handlePagination }
                        color="primary"
                        variant="outlined"
                        shape="rounded"
                    />
                </PaginationContainer> }
            </>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => ({
    isLoadingDownload: state?.submission?.isLoadingDownload,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetStudent: (ClasId, PaginationValue) => dispatch(GetStudent(ClasId, PaginationValue)),
        DeleteStudent: (ClasId, userId) => dispatch(DeleteStudent(ClasId, userId)),
        UploadFileDataClear: () => dispatch(UploadFileDataClear()),
        DownloadCsv: (url, title) => dispatch(DownloadCsv(url, title)),
    };
};

Students.layout = Instructor;

export default connect(mapStateToProps, mapDispatchToProps)(Students);