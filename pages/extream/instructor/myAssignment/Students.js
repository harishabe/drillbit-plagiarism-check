import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import _ from 'lodash';
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import debouce from 'lodash.debounce';
import styled from 'styled-components';
import { makeStyles } from "@mui/styles";
import Box from '@mui/material/Box';
import { Grid, TextField, Tooltip, Skeleton, Pagination, IconButton } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
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
    DeleteWarningIcon,
    AddMultipleIcon,
    AddPersonIcon,
    AddFromListIcon
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
import { PaginationContainer, StyledButtonIcon, StyledButtonRedIcon, AddButtonBottom } from '../../../../style/index';
import { BASE_URL_EXTREM } from '../../../../utils/BaseUrl';
import END_POINTS from '../../../../utils/EndPoints';
import { DOWNLOAD_CSV, WARNING_MESSAGES, WINDOW_PLATFORM } from '../../../../constant/data/Constant';
import { INSTRUCTIONS_STEPS } from '../../../../constant/data/InstructionMessage';

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

const useStyles = makeStyles(() => ({
    button: {
        margin: "6px 8px 0px 0px",
    },
    multiButton: {
        margin: "6px 6px 6px 0px",
    },
}));

const columns = [
    { id: 'student_id', label: 'Student ID', maxWidth: 100 },
    { id: 'name', label: 'Student Name', maxWidth: 190 },
    { id: 'username', label: 'Email', maxWidth: 190 },
    { id: 'department', label: 'Department', maxWidth: 110 },
    { id: 'section', label: 'Section', maxWidth: 90 },
    { id: 'action', label: 'Actions', maxWidth: 90 },
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
    UploadFileDataClear,
    DownloadCsv,
    isLoadingDownload,
    activeTab
}) => {
    const theme = useTheme();
    const router = useRouter();
    const classes = useStyles();
    const [rows, setRows] = useState([]);
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

    const isSmallScreen = useMediaQuery(theme.breakpoints.down("900"));

    const DownloadField = styled.div`
        position:absolute;
        top: ${isSmallScreen ? "85px" : "125px"};
        right:${platform === WINDOW_PLATFORM ? '255px' : '235px'};
    `;

    const SearchField = styled.div`
        position:absolute;
        top: ${isSmallScreen ? "85px" : "125px"};
        right:16px; 
    `;

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
                    [{
                        'component': <StyledButtonIcon variant="outlined" size='small'><EditOutlinedIcon fontSize="small" /></StyledButtonIcon>, 'type': 'edit', 'title': 'Edit'
                    },
                        { 'component': <StyledButtonRedIcon variant="outlined" size='small'><DeleteOutlineOutlinedIcon fontSize="small" /></StyledButtonRedIcon>, 'type': 'delete', 'title': 'Delete' },
                    ],
                    student.phone_number,
                );
            row['isSelected'] = false;
            arr.push(row);
        });
        setRows([...arr]);
    }, [studentData]);

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
        setPaginationPayload({ ...paginationPayload, 'page': value - 1 });
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

    const handleDrawerClose = (drawerClose) => {
        setEditStudent(drawerClose);
    };

    const closeDrawerOnSuccess = (drawerClose) => {
        setEditStudent(drawerClose);
    };

    const handleDownload = () => {
        DownloadCsv(BASE_URL_EXTREM + END_POINTS.CREATE_ASSIGNMENT + `${router.query.clasId}/students/download`, DOWNLOAD_CSV.STUDENTS_LISTS);
    };

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
                        handleDrawerClose={ handleDrawerClose }
                        handleCloseDrawer={ closeDrawerOnSuccess }
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
                                        <StyledButtonIcon variant="outlined" size='small' className={ classes.button } onClick={ handleDownload }><FileDownloadOutlinedIcon fontSize='medium' /></StyledButtonIcon>
                                    </Tooltip>
                                }
                            </DownloadButton>
                        </DownloadField>
                        <SearchField>
                            <TextField
                                sx={ { width: 222 } }
                                placeholder='Search by Student ID'
                                onChange={ searchStudents }
                                inputProps={ {
                                    style: {
                                        padding: 7,
                                        display: 'inline-flex',
                                        fontWeight: 500,
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
                        <StyledButtonRedIcon
                            className={ classes.multiButton }
                            variant="outlined"
                            size="small"
                            onClick={ deleteAllStudent }
                        >
                            <DeleteOutlineOutlinedIcon fontSize="small" />
                        </StyledButtonRedIcon>
                    </Tooltip>
                </DeleteAllButton> }
                { search ?
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
                        path=''
                    />
                    :
                    <>
                        { rows.length > 0 ?
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
                                path=''
                            /> :
                            <CardView>
                                <Instructions message={ Object.values(INSTRUCTIONS_STEPS.STUDENT) } />
                            </CardView>
                        }
                    </>
                }

                <PaginationContainer>
                    <Pagination
                        count={ pageDetailsStudent?.totalPages }
                        page={ pageDetailsStudent?.number + 1 }
                        onChange={ handlePagination }
                        color="primary"
                        variant="outlined"
                        shape="rounded"
                    />
                </PaginationContainer>
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