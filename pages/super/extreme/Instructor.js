import React, { useEffect, useState, useMemo } from 'react';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import styled from 'styled-components';
import debouce from 'lodash.debounce';
import { Grid, Tooltip, Switch, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import PersonIcon from '@mui/icons-material/Person';
import { TextField, Pagination } from '@mui/material';
import SuperAdmin from './../../../layouts/SuperAdmin';
import {
    CommonTable,
    StatusDot,
    CreateDrawer,
    WarningDialog,
    DialogModal
} from '../../../components';
import {
    StatsIcon,
    DeleteWarningIcon,
} from '../../../assets/icon';
import {
    DeleteData,
    DeactivateData,
    UploadFileDataClear
} from '../../../redux/action/admin/AdminAction';
import {
    GetExtremeInstructorList,
    MakeHimAdmin,
    ResendCredentials
} from '../../../redux/action/super/SuperAdminAction';
import { PaginationValue } from '../../../utils/PaginationUrl';
import InstructorForm from '../form/InstructorForm';
import InstructorStats from '../../extream/admin/instructor/InstructorStats';
import { removeCommaWordEnd } from '../../../utils/RegExp';
import END_POINTS from '../../../utils/EndPoints';
import { BASE_URL_SUPER } from '../../../utils/BaseUrl';
import { Role } from '../../../constant/data';
import { WARNING_MESSAGES, WINDOW_PLATFORM, EXTREME } from '../../../constant/data/Constant';
import { PaginationContainer, PlagiarismGrammarContainer } from '../../../style/index';
import { platform } from '../../../utils/RegExp';

const columns = [
    { id: 'name', label: 'Name', maxWidth: 100 },
    { id: 'username', label: 'Email', maxWidth: 100 },
    { id: 'expiry_date', label: 'End Date', maxWidth: 100 },
    { id: 'status', label: 'Status', maxWidth: 70 },
    { id: 'stats', label: 'Statistics', maxWidth: 60 },
    { id: 'superadminplagairism', label: 'Plagiarism', maxWidth: 130 },
    { id: 'superadmingrammar', label: 'Grammar', maxWidth: 130 },
    { id: 'action', label: 'Actions', maxWidth: 190 }
];

function createData(name, username, expiry_date, status, stats, superadminplagairism, superadmingrammar, action, created_date, department, designation, phone_number, user_id, role) {
    return { name, username, expiry_date, status, stats, superadminplagairism, superadmingrammar, action, created_date, department, designation, phone_number, user_id, role };
};

const AddButtonBottom = styled.div`
    position:fixed;
    bottom: 30px;
    right:30px;
    z-index: 999;
`;

const DownloadField = styled.div`
    position:absolute;
    top: 125px;
    right:${platform === WINDOW_PLATFORM ? '245px' : '225px'};
`;

const DownloadButton = styled.div`
    margin-top:-5px;
`;

const SkeletonContainer = styled.div`
    marginTop: 10px;
    margin-right: 5px;
`;

const SearchField = styled.div`
    position:absolute;
    top: 125px;
    right:16px;
`;

const Instructor = ({
    pageDetailsInstructor,
    GetExtremeInstructorList,
    ResendCredentials,
    UploadFileDataClear,
    MakeHimAdmin,
    extInsList,
    DeleteData,
    DeactivateData,
    isLoadingExtInsList,
    isLoadingResend
}) => {
    const router = useRouter();
    const [rows, setRows] = useState([]);
    const [showDeleteWarning, setShowDeleteWarning] = useState(false);
    const [deleteRowData, setDeleteRowData] = useState('');
    const [showStatusWarning, setStatusWarning] = useState(false);
    const [showDialogModal, setShowDialogModal] = useState(false);
    const [statusRowData, setStatusRowData] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    const [instructorId, setInstructorId] = useState('');
    const [showDeleteAllIcon, setShowDeleteAllIcon] = useState(false);
    const [paginationPayload, setPaginationPayload] = useState({
        page: PaginationValue?.page,
        size: PaginationValue?.size,
        field: 'user_id',
        orderBy: PaginationValue?.orderBy,
    });
    const [editInstructor, setEditInstructor] = useState(false);
    const [editInstructorData, setEditInstructorData] = useState('');
    const [makeAdminDialogModal, setMakeAdminDialogModal] = useState(false);
    const [resendCredentialsDialogModal, setResendCredentialsDialogModal] = useState(false);

    useEffect(() => {
        if (router.isReady) {
            GetExtremeInstructorList(`/extreme/license/${router?.query?.licenseId}/instructors`, paginationPayload);
        }
    }, [router.isReady, paginationPayload]);

    useEffect(() => {
        let row = '';
        let arr = [];
        extInsList?.map((instructor) => {
            row =
                createData(
                    // <AvatarName avatarText="I" title={instructor.id} color='#4795EE' />,
                    instructor.name,
                    instructor.username,
                    instructor.expiry_date,
                    <StatusDot color={ instructor.status?.toUpperCase() === 'ACTIVE' ? '#38BE62' : '#E9596F' } title={ instructor.status } />,
                    [{ 'component': <StatsIcon />, 'type': 'stats', 'title': 'Stats' }],
                    [
                        <>
                            <div style={ { display: 'flex', width: '100%' } }>
                                <Tooltip title='Plagiarism allocation' arrow>
                                    <PlagiarismGrammarContainer color='#e6e6fa'>
                                        { instructor.plagairism }
                                    </PlagiarismGrammarContainer>
                                </Tooltip>
                                <Tooltip title='Plagiarism uploaded' arrow>
                                    <PlagiarismGrammarContainer color='#ffe'>
                                        { instructor.plagiarismUsed }
                                    </PlagiarismGrammarContainer>
                                </Tooltip>
                                <Tooltip title='Plagiarism remaining' arrow>
                                    <PlagiarismGrammarContainer color='#DAF7A6'>
                                        { instructor.plagairism - instructor.plagiarismUsed }
                                    </PlagiarismGrammarContainer>
                                </Tooltip>
                            </div>
                        </>
                    ],
                    [
                        <>
                            <div style={ { display: 'flex', width: '100%' } }>
                                <Tooltip title='Grammar allocation' arrow>
                                    <PlagiarismGrammarContainer color='#e6e6fa'>
                                        { instructor.grammar }
                                    </PlagiarismGrammarContainer>
                                </Tooltip>
                                <Tooltip title='Grammar uploaded' arrow>
                                    <PlagiarismGrammarContainer color='#ffe'>
                                        { instructor?.grammarUsed }
                                    </PlagiarismGrammarContainer>
                                </Tooltip>
                                <Tooltip title='Grammar remaining' arrow>
                                    <PlagiarismGrammarContainer color='#DAF7A6'>
                                        { instructor.grammar - instructor?.grammarUsed }
                                    </PlagiarismGrammarContainer>
                                </Tooltip>
                            </div>
                        </>
                    ],
                    instructor.role === Role.admin ?
                        ([
                            { 'component': <EditOutlinedIcon fontSize='small' />, 'type': 'edit', 'title': 'Edit' },
                            { 'component': <VpnKeyIcon fontSize='small' />, 'type': 'resend', 'title': 'Resend credentials' },
                        ]) :
                        ([{ 'component': <EditOutlinedIcon fontSize='small' />, 'type': 'edit', 'title': 'Edit' },
                            { 'component': <DeleteOutlineOutlinedIcon fontSize='small' />, 'type': 'delete', 'title': 'Delete' },
                            { 'component': <PersonIcon fontSize='small' />, 'type': 'admin', 'title': 'Make him admin' },
                            { 'component': <VpnKeyIcon fontSize='small' />, 'type': 'resend', 'title': 'Resend credentials' },
                        {
                            'component': <Switch checked={ instructor.status === 'active' ? true : false } size="small" />,
                            'type': instructor.status === 'active' ? 'lock' : 'unlock',
                            'title': instructor.status === 'active' ? 'Activate' : 'De-activate'
                            },
                        ]),
                    instructor.creation_date,
                    instructor.department,
                    instructor.designation,
                    instructor.phone_number,
                    instructor.id,
                    instructor.role,
                );
            row['isSelected'] = false;
            arr.push(row);
        });
        setRows([...arr]);
    }, [extInsList]);

    const handleChange = (event, value) => {
        event.preventDefault();
        setPaginationPayload({ ...paginationPayload, 'page': value - 1 });
    };

    const handleCloseWarning = () => {
        setShowDeleteWarning(false);
    };

    const handleStatusCloseWarning = () => {
        setStatusWarning(false);
    };

    const handleMakeAdminCloseWarning = () => {
        setMakeAdminDialogModal(false);
    };

    const handleResendCredentialsCloseWarning = () => {
        setResendCredentialsDialogModal(false);
    };

    const handleYesWarning = () => {
        DeleteData(BASE_URL_SUPER + END_POINTS.SUPER_ADMIN_INSTRUCTOR + `${router?.query?.licenseId}/instructors?id=${deleteRowData}`, paginationPayload);
        setShowDeleteAllIcon(false);
        setTimeout(() => {
            setShowDeleteWarning(false);
        }, [100]);
    };

    const handleStatusWarning = () => {
        DeactivateData(BASE_URL_SUPER + END_POINTS.SUPER_ADMIN_INSTRUCTOR + router?.query?.licenseId + '/instructor/' + statusRowData.id + '/' + statusRowData.status, paginationPayload);
        setTimeout(() => {
            setStatusWarning(false);
        }, [100]);
    };

    const handleMakeAdminWarning = () => {
        MakeHimAdmin(BASE_URL_SUPER + END_POINTS.SUPER_ADMIN_INSTRUCTOR + `${router?.query?.licenseId}/admin/${instructorId}`, paginationPayload)
        setTimeout(() => {
            setMakeAdminDialogModal(false)
        }, [100]);
    };

    const handleResendCredentialsWarning = () => {
        let data = {
            'lid': router?.query?.licenseId,
            'user_id': instructorId
        }
        ResendCredentials(EXTREME, data)
        setTimeout(() => {
            setResendCredentialsDialogModal(false)
        }, [100]);
    };

    const handleAction = (event, icon, rowData) => {
        if (icon === 'edit') {
            setEditInstructor(true);
            setEditInstructorData(rowData);
        } else if (icon === 'delete') {
            setDeleteRowData(rowData?.user_id);
            setShowDeleteWarning(true);
        } else if (icon === 'lock') {
            let activateDeactive = {
                'id': rowData?.user_id,
                'status': 'INACTIVE'
            };
            setStatusRowData(activateDeactive);
            setStatusWarning(true);
            setStatusMessage('inactive');
        } else if (icon === 'unlock') {
            let activateDeactive = {
                'id': rowData?.user_id,
                'status': 'ACTIVE'
            };
            setStatusRowData(activateDeactive);
            setStatusWarning(true);
            setStatusMessage('active');
        } else if (icon === 'stats') {
            setInstructorId(rowData?.user_id);
            setShowDialogModal(true);
        } else if (icon === 'admin') {
            setInstructorId(rowData?.user_id);
            setMakeAdminDialogModal(true);
        } else if (icon === 'resend') {
            setInstructorId(rowData?.user_id);
            setResendCredentialsDialogModal(true);
        }
    };

    const handleCloseDialog = () => {
        setShowDialogModal(false);
    };

    /** search implementation using debounce concepts */

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

    const handleSingleSelect = (e, row) => {
        let rowData = rows?.map((rowItem) => {
            if (rowItem?.user_id === row?.user_id) {
                rowItem['isSelected'] = !rowItem['isSelected'];
            }
            return rowItem;
        });
        setRows(rowData);
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

    const deleteAllInstructor = () => {
        let rowsId = '';
        _.filter(rows, function (o) {
            if (o.isSelected === true) {
                return rows;
            }
        }).map((rowItem) => {
            rowsId += rowItem?.user_id + ',';
        });
        setDeleteRowData(removeCommaWordEnd(rowsId));
        setShowDeleteWarning(true);
    };

    const handleCloseDrawer = (drawerClose) => {
        setEditInstructor(drawerClose);
    };

    return (
        <React.Fragment>
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
                showDialogModal &&
                <DialogModal
                    headingTitle="Instructor Statistics"
                    isOpen={ true }
                    fullWidth="lg"
                    maxWidth="lg"
                    handleClose={ handleCloseDialog }
                >
                        <InstructorStats
                            lid={ router?.query?.licenseId }
                            instructorId={ instructorId }
                        />
                </DialogModal>
            }

            <AddButtonBottom>
                <CreateDrawer
                    isShowAddIcon={ true }
                    title='Add Instructor'
                >
                    <InstructorForm
                    />
                </CreateDrawer>
            </AddButtonBottom>

            {
                editInstructor &&
                <CreateDrawer
                    title="Edit Instructor"
                    isShowAddIcon={ false }
                    showDrawer={ editInstructor }
                    handleDrawerClose={ handleCloseDrawer }
                >
                    <InstructorForm
                        editData={ editInstructorData }
                    />
                </CreateDrawer>
            }

            {
                makeAdminDialogModal &&
                <WarningDialog
                    warningIcon={ <PersonIcon /> }
                    message={ WARNING_MESSAGES.MAKE_ADMIN }
                    handleYes={ handleMakeAdminWarning }
                    handleNo={ handleMakeAdminCloseWarning }
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
                            <DeleteOutlineOutlinedIcon fontSize='small' />
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
                    isLoading={ isLoadingExtInsList || isLoadingResend }
                    path=''
                />

                <PaginationContainer>
                    <Pagination
                        count={ pageDetailsInstructor?.totalPages }
                        page={ pageDetailsInstructor?.number + 1 }
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
    pageDetailsInstructor: state?.superAdmin?.extInsList?.list?.page,
    extInsList: state?.superAdmin?.extInsList?.list?._embedded?.instructorDTOList,
    isLoadingExtInsList: state?.superAdmin?.isLoadingExtInsList,
    isLoadingResend: state?.superAdmin?.isLoadingResend,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetExtremeInstructorList: (url, paginationPayload) => dispatch(GetExtremeInstructorList(url, paginationPayload)),
        DeactivateData: (url, paginationPayload) => dispatch(DeactivateData(url, paginationPayload)),
        DeleteData: (url, paginationPayload) => dispatch(DeleteData(url, paginationPayload)),
        MakeHimAdmin: (url, paginationPayload) => dispatch(MakeHimAdmin(url, paginationPayload)),
        ResendCredentials: (role, data) => dispatch(ResendCredentials(role, data)),
        UploadFileDataClear: () => dispatch(UploadFileDataClear()),
    };
};

Instructor.layout = SuperAdmin;

export default connect(mapStateToProps, mapDispatchToProps)(Instructor);