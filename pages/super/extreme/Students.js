import React, { useEffect, useState, useMemo } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import debouce from 'lodash.debounce';
import { Grid, Tooltip, TextField, Pagination, IconButton } from '@mui/material';
import {
    CommonTable,
    MainHeading,
    WarningDialog,
    DialogModal,
    CreateDrawer,
} from '../../../components';
import SuperAdmin from './../../../layouts/SuperAdmin';
import { EditIcon, DeleteIcon, StatsIcon, DeleteWarningIcon } from '../../../assets/icon';
import {
    // EditData, 
    DeleteStudentData
} from '../../../redux/action/admin/AdminAction';
import { GetExtremeStudentList } from '../../../redux/action/super/SuperAdminAction';
import { PaginationValue } from '../../../utils/PaginationUrl';
import StudentForm from '../../extream/instructor/form/StudentForm';
import StudentStats from '../../extream/admin/student/StudentStats';
import { removeCommaWordEnd } from '../../../utils/RegExp';
import { WARNING_MESSAGES } from '../../../constant/data/Constant';
import { PaginationContainer } from '../../../style/index';
import END_POINTS from '../../../utils/EndPoints';
import { BASE_URL_SUPER } from '../../../utils/BaseUrl';

const SearchField = styled.div`
    position:absolute;
    top: 125px;
    right:16px;
`;

const columns = [
    { id: 'name', label: 'Name' },
    { id: 'username', label: 'Email' },
    { id: 'end_date', label: 'End date' },
    { id: 'status', label: 'Status' },
    // { id: 'user_id', label: 'ID' },
    // { id: 'department', label: 'Department' },
    // { id: 'section', label: 'Section' },
    { id: 'stats', label: 'Statistics' },
    { id: 'action', label: 'Actions' },
];

function createData(id, name, user_id, username, department, section, end_date, status, stats, action) {
    return { id, name, user_id, username, department, section, end_date, status, stats, action };
}

const Students = ({
    GetExtremeStudentList,
    studentData,
    pageDetailsStudent,
    // EditData,
    DeleteStudentData,
    isLoadingExtStuList,
    isLoadingEditStudent
}) => {
    const router = useRouter();
    const [rows, setRows] = useState([]);
    const [showDeleteWarning, setShowDeleteWarning] = useState(false);
    const [showDialogModal, setShowDialogModal] = useState(false);
    const [studentId, setStudentId] = useState('');
    const [deleteRowData, setDeleteRowData] = useState('');
    const [editStudent, setEditStudent] = useState(false);
    const [editStudentData, setEditStudentData] = useState('');
    const [paginationPayload, setPaginationPayload] = useState({
        page: PaginationValue?.page,
        size: PaginationValue?.size,
        field: PaginationValue?.field,
        orderBy: PaginationValue?.orderBy,
    });

    useEffect(() => {
        if (router.isReady) {
            GetExtremeStudentList(END_POINTS.SUPER_ADMIN_INSTRUCTOR + `${router?.query?.licenseId}/students`, paginationPayload);
        }
    }, [router.isReady, paginationPayload]);

    useEffect(() => {
        let row = '';
        let arr = [];
        studentData?.map((student) => {
            row =
                createData(
                    student.id,
                    student.name,
                    student.student_id,
                    student.username,
                    student.department,
                    student.section,
                    student.end_date,
                    student.status,
                    [{ 'component': <StatsIcon />, 'type': 'stats', 'title': 'Stats' }],
                    [{ 'component': <EditIcon />, 'type': 'edit', 'title': 'Edit' },
                    { 'component': <DeleteIcon />, 'type': 'delete', 'title': 'Delete' }]
                );
            row['isSelected'] = false;
            arr.push(row);
        });
        setRows([...arr]);
    }, [studentData]);

    const handleChange = (event, value) => {
        event.preventDefault();
        setPaginationPayload({ ...paginationPayload, 'page': value - 1 });
    };

    const handleCloseWarning = () => {
        setShowDeleteWarning(false);
    };

    const handleYesWarning = () => {
        DeleteStudentData(BASE_URL_SUPER + END_POINTS.SUPER_ADMIN_INSTRUCTOR + `${router?.query?.licenseId}/students?id=${deleteRowData}`);
        setTimeout(() => {
            setShowDeleteWarning(false);
        }, [100]);
    };

    const handleAction = (event, icon, rowData) => {
        if (icon === 'edit') {
            setEditStudent(true);
            setEditStudentData(rowData);

        } else if (icon === 'delete') {
            setDeleteRowData(rowData.id);
            setShowDeleteWarning(true);

        } else if (icon === 'stats') {
            setStudentId(rowData.id);
            setShowDialogModal(true);
        }
    };

    const handleCloseDialog = () => {
        setShowDialogModal(false);
    };


    const handleSearch = (event) => {
        if (event.target.value !== '') {
            paginationPayload['search'] = event.target.value;
            setPaginationPayload({ ...paginationPayload, paginationPayload });
        } else {
            delete paginationPayload['search'];
            setPaginationPayload({ ...paginationPayload, paginationPayload });
        }
    };

    const debouncedResults = useMemo(() => {
        return debouce(handleSearch, 300);
    }, []);

    useEffect(() => {
        return () => {
            debouncedResults.cancel();
        };
    });

    /** end debounce concepts */

    const handleTableSort = (e, column, sortToggle) => {
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

    const deleteAllInstructor = () => {
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

    const handleCloseDrawer = (value) => {
        setEditStudent(value);
    };

    return (
        <React.Fragment>

            { showDeleteWarning &&
                <WarningDialog
                    warningIcon={ <DeleteWarningIcon /> }
                    message={ WARNING_MESSAGES.DELETE }
                    handleYes={ handleYesWarning }
                    handleNo={ handleCloseWarning }
                    isOpen={ true }
                /> }

            { editStudent &&
                <CreateDrawer
                    title="Edit Instructor"
                    isShowAddIcon={ false }
                    showDrawer={ editStudent }
                    handleDrawerClose={ handleCloseDrawer }
                >
                    <StudentForm
                        editData={ editStudentData }
                        isLoadingEditStudent={ isLoadingEditStudent }
                    />
                </CreateDrawer> }

            { showDialogModal &&
                <>
                    <DialogModal
                        headingTitle="Students Statistics"
                        isOpen={ true }
                        fullWidth="lg"
                        maxWidth="lg"
                        handleClose={ handleCloseDialog }
                    >
                    <StudentStats
                        lid={ router?.query?.licenseId }
                        studentId={ studentId }
                    />
                    </DialogModal>
                </>
            }

            <Box sx={ { flexGrow: 1 } }>
                <Grid container spacing={ 1 }>
                    <Grid item container direction='row' justifyContent={ 'right' }>
                        {/* <DownloadField>
                            <DownloadButton>
                                { assignmentData?.length > 0 &&
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
                        </DownloadField> */}
                        <SearchField>
                            <TextField
                                placeholder='Search'
                                onChange={ debouncedResults }
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
                { _.find(rows, function (o) { return o.isSelected === true; }) && <div style={ { marginLeft: '10px' } }>
                    <Tooltip title='Delete' arrow>
                        <IconButton onClick={ deleteAllInstructor }>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </div> }

                <CommonTable
                    isCheckbox={ true }
                    isSorting={ true }
                    tableHeader={ columns }
                    tableData={ rows }
                    handleAction={ handleAction }
                    handleTableSort={ handleTableSort }
                    handleCheckboxSelect={ handleCheckboxSelect }
                    handleSingleSelect={ handleSingleSelect }
                    isLoading={ isLoadingExtStuList }
                    charLength={ 17 }
                    path=''
                />


                <PaginationContainer>
                    <Pagination
                        count={ pageDetailsStudent?.totalPages }
                        onChange={ handleChange }
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
    pageDetailsStudent: state?.superAdmin?.extStuList?.page,
    studentData: state?.superAdmin?.extStuList?._embedded?.studentDTOList,
    isLoadingExtStuList: state?.superAdmin?.isLoadingExtStuList,
    isLoadingEditStudent: state?.superAdmin?.isLoadingEditStudent,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetExtremeStudentList: (url, paginationPayload) => dispatch(GetExtremeStudentList(url, paginationPayload)),
        // EditData: (data) => dispatch(EditData(data)),
        DeleteStudentData: (url) => dispatch(DeleteStudentData(url))
    };
};

Students.layout = SuperAdmin;

export default connect(mapStateToProps, mapDispatchToProps)(Students);