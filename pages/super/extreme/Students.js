import React, { useEffect, useState, useMemo } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import debouce from 'lodash.debounce';
import { Grid, Tooltip, TextField, Pagination, IconButton, Switch } from '@mui/material';
import {
    CommonTable,
    MainHeading,
    StatusDot,
    WarningDialog,
    DialogModal,
    CreateDrawer,
} from '../../../components';
import SuperAdmin from './../../../layouts/SuperAdmin';
import { EditIcon, DeleteIcon, StatsIcon, DeleteWarningIcon } from '../../../assets/icon';
import {
    // EditData, 
    DeleteStudentData,
    DeactivateData
} from '../../../redux/action/admin/AdminAction';
import { GetExtremeStudentList, ResendCredentials } from '../../../redux/action/super/SuperAdminAction';
import { PaginationValue } from '../../../utils/PaginationUrl';
import StudentForm from '../../extream/instructor/form/StudentForm';
import StudentStats from '../../extream/admin/student/StudentStats';
import { removeCommaWordEnd } from '../../../utils/RegExp';
import { WARNING_MESSAGES, EXTREME } from '../../../constant/data/Constant';
import { PaginationContainer } from '../../../style/index';
import END_POINTS from '../../../utils/EndPoints';
import { BASE_URL_SUPER } from '../../../utils/BaseUrl';

const SearchField = styled.div`
    position:absolute;
    top: 125px;
    right:16px;
`;

const AddButtonBottom = styled.div`
    position:fixed;
    bottom: 30px;
    right:30px;
    z-index: 999;
`;

const columns = [
    { id: 'name', label: 'Name', maxWidth: 200 },
    { id: 'username', label: 'Email', maxWidth: 200 },
    { id: 'expiry_date', label: 'End date', maxWidth: 200 },
    { id: 'status', label: 'Status', maxWidth: 200 },
    { id: 'stats', label: 'Statistics', maxWidth: 60 },
    { id: 'action', label: 'Actions', maxWidth: 200 },
];

function createData(id, name, user_id, username, department, section, expiry_date, status, stats, action, phone_number) {
    return { id, name, user_id, username, department, section, expiry_date, status, stats, action, phone_number };
}

const Students = ({
    GetExtremeStudentList, 
    ResendCredentials,
    studentData,
    pageDetailsStudent,
    // EditData,
    DeactivateData,
    DeleteStudentData,
    isLoadingExtStuList,
    isLoadingEditStudent,
    isLoadingResend
}) => {
    const router = useRouter();
    const [rows, setRows] = useState([]);
    const [showDeleteWarning, setShowDeleteWarning] = useState(false);
    const [showDialogModal, setShowDialogModal] = useState(false);
    const [studentId, setStudentId] = useState('');
    const [deleteRowData, setDeleteRowData] = useState('');
    const [editStudent, setEditStudent] = useState(false);
    const [editStudentData, setEditStudentData] = useState('');
    const [showStatusWarning, setStatusWarning] = useState(false);
    const [statusRowData, setStatusRowData] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    const [resendCredentialsDialogModal, setResendCredentialsDialogModal] = useState(false);
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
                    student.expiry_date,
                    <StatusDot color={ (student.status === 'active') || (student.status === 'ACTIVE') ? '#38BE62' : '#E9596F' } title={ student.status } />,
                    [{ 'component': <StatsIcon />, 'type': 'stats', 'title': 'Stats' }],
                    [{ 'component': <EditIcon />, 'type': 'edit', 'title': 'Edit' },
                        { 'component': <DeleteIcon />, 'type': 'delete', 'title': 'Delete' },
                        { 'component': <VpnKeyIcon />, 'type': 'resend', 'title': 'Resend credentials' },
                        {
                            'component': <Switch checked={ student.status === 'active' ? true : false } size="small" />,
                            'type': student.status === 'active' ? 'lock' : 'unlock',
                            'title': student.status === 'active' ? 'Activate' : 'De-activate'
                        }
                    ],
                    student.phone_number
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
        } else if (icon === 'lock') {
            let activateDeactive = {
                'id': rowData?.id,
                'status': 'INACTIVE'
            };
            setStatusRowData(activateDeactive);
            setStatusWarning(true);
            setStatusMessage('inactive');
        } else if (icon === 'unlock') {
            let activateDeactive = {
                'id': rowData?.id,
                'status': 'ACTIVE'
            };
            setStatusRowData(activateDeactive);
            setStatusWarning(true);
            setStatusMessage('active');
        } else if (icon === 'resend') {
            setStudentId(rowData.id);
            setResendCredentialsDialogModal(true);
        }
    };

    const handleCloseDialog = () => {
        setShowDialogModal(false);
    };

    const handleResendCredentialsCloseWarning = () => {
        setResendCredentialsDialogModal(false);
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

    const handleStatusWarning = () => {
        DeactivateData(BASE_URL_SUPER + END_POINTS.SUPER_ADMIN_INSTRUCTOR + router?.query?.licenseId + '/instructor/' + statusRowData.id + '/' + statusRowData.status, paginationPayload);
        setTimeout(() => {
            setStatusWarning(false);
        }, [100]);
    };

    const handleResendCredentialsWarning = () => {
        let data = {
            'lid': router?.query?.licenseId,
            'user_id': studentId
        }
        ResendCredentials(EXTREME, data)
        setTimeout(() => {
            setResendCredentialsDialogModal(false)
        }, [100]);
    };

    const handleStatusCloseWarning = () => {
        setStatusWarning(false);
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

            {
                showStatusWarning &&
                <WarningDialog
                    warningIcon={ <DeleteWarningIcon /> }
                    message={ 'Are you sure, you want to ' + statusMessage + '?' }
                    handleYes={ handleStatusWarning }
                    handleNo={ handleStatusCloseWarning }
                    isOpen={ true }
                />
            }

            {
                resendCredentialsDialogModal &&
                <WarningDialog
                    warningIcon={ <VpnKeyIcon /> }
                    message={ WARNING_MESSAGES.RESEND_CREDENTIALS }
                    handleYes={ handleResendCredentialsWarning }
                    handleNo={ handleResendCredentialsCloseWarning }
                    isOpen={ true }
                />
            }

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

            <AddButtonBottom>
                <CreateDrawer
                    isShowAddIcon={ true }
                    title='Add Student'
                >
                    <StudentForm
                    />
                </CreateDrawer>
            </AddButtonBottom>

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
                    isLoading={ isLoadingExtStuList || isLoadingResend }
                    path=''
                />


                <PaginationContainer>
                    <Pagination
                        count={ pageDetailsStudent?.totalPages }
                        page={ pageDetailsStudent?.number + 1 }
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
    isLoadingResend: state?.superAdmin?.isLoadingResend
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetExtremeStudentList: (url, paginationPayload) => dispatch(GetExtremeStudentList(url, paginationPayload)),
        // EditData: (data) => dispatch(EditData(data)),
        DeleteStudentData: (url) => dispatch(DeleteStudentData(url)),
        DeactivateData: (url, paginationPayload) => dispatch(DeactivateData(url, paginationPayload)),
        ResendCredentials: (role, data) => dispatch(ResendCredentials(role, data)),
    };
};

Students.layout = SuperAdmin;

export default connect(mapStateToProps, mapDispatchToProps)(Students);