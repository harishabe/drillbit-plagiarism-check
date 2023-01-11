import React, { useEffect, useState, useMemo } from 'react';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import styled from 'styled-components';
import debouce from 'lodash.debounce';
import { Grid, Tooltip, Switch } from '@mui/material';
import Box from '@mui/material/Box';
import PersonIcon from '@mui/icons-material/Person';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import { TextField, Pagination, IconButton } from '@mui/material';
import SuperAdmin from './../../layouts/SuperAdmin';
import {
    CommonTable,
    MainHeading,
    StatusDot,
    BreadCrumb,
    CreateDrawer,
    WarningDialog,
    DialogModal,
} from '../../components';
import {
    EditIcon,
    DeleteIcon,
    StatsIcon,
    DeleteWarningIcon,
    AddMultipleIcon,
    AddPersonIcon
} from '../../assets/icon';
import {
    GetInstructorData,
    DeleteData,
    DeactivateData,
} from '../../redux/action/admin/AdminAction';
import {
    MakeHimAdmin,
    ResendCredentials
} from '../../redux/action/super/SuperAdminAction';
import { PaginationValue } from '../../utils/PaginationUrl';
import UserForm from '../pro/admin/form/UserForm';
import UserStats from '../pro/admin/users/UserStats';
import { removeCommaWordEnd, formatDate } from '../../utils/RegExp';
import END_POINTS_PRO from '../../utils/EndPointPro';
import { BASE_URL_SUPER } from '../../utils/BaseUrl';
import { PaginationContainer, PlagiarismGrammarContainer } from '../../style/index';
import { Role } from '../../constant/data';
import { WARNING_MESSAGES, PRO } from '../../constant/data/Constant';

const columns = [
    { id: 'name', label: 'Name' },
    { id: 'username', label: 'Email' },
    { id: 'expiry_date', label: 'End Date' },
    { id: 'status', label: 'Status' },
    { id: 'stats', label: 'Statistics' },
    { id: 'superadminplagairism', label: 'Plagiarism' },
    { id: 'superadmingrammar', label: 'Grammar' },
    { id: 'action', label: 'Actions', maxWidth: 100 }
];

function createData(user_id, role, name, username, created_date, total_submissions, total_grammar, status, stats, superadminplagairism, superadmingrammar, action, expiry_date, department, designation, phone_number) {
    return { user_id, role, name, username, created_date, total_submissions, total_grammar, status, stats, superadminplagairism, superadmingrammar, action, expiry_date, department, designation, phone_number };
};

const AddButtonBottom = styled.div`
    position:fixed;
    bottom: 30px;
    right:30px;
`;

const ProUser = ({
    pageDetails,
    GetInstructorData,
    MakeHimAdmin,
    ResendCredentials,
    userData,
    DeleteData,
    DeactivateData,
    isLoadingdetailsData,
    isLoadingsuperAdmin,
    isLoadingadminCrud,
    isLoadingResend
}) => {
    const router = useRouter();
    const [adminName, setAdminName] = useState('');
    const [rows, setRows] = useState([]);
    const [showDeleteWarning, setShowDeleteWarning] = useState(false);
    const [deleteRowData, setDeleteRowData] = useState('');
    const [showStatusWarning, setStatusWarning] = useState(false);
    const [showDialogModal, setShowDialogModal] = useState(false);
    const [statusRowData, setStatusRowData] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    const [userId, setUserId] = useState('');
    const [showDeleteAllIcon, setShowDeleteAllIcon] = useState(false);
    const [paginationPayload, setPaginationPayload] = useState({
        page: PaginationValue?.page,
        size: PaginationValue?.size,
        field: PaginationValue?.field,
        orderBy: PaginationValue?.orderBy,
    });
    const [editInstructor, setEditInstructor] = useState(false);
    const [editInstructorData, setEditInstructorData] = useState('');
    const [makeAdminDialogModal, setMakeAdminDialogModal] = useState(false);
    const [resendCredentialsDialogModal, setResendCredentialsDialogModal] = useState(false);

    const UserBreadCrumb = [
        {
            name: 'Dashboard',
            link: '/pro/admin/dashboard',
            active: false,
        },
        {
            name: 'Pro',
            link: '/super/refproduct',
            active: false,
        },
        {
            name: adminName,
            link: '',
            active: true,
        },
    ];

    useEffect(() => {
        if (router.isReady) {
            setAdminName(router.query.name);
            GetInstructorData(BASE_URL_SUPER + END_POINTS_PRO.SUPER_ADMIN_USER + `${router.query.licenseId}/users`, paginationPayload);
        }
    }, [router.isReady, paginationPayload]);

    useEffect(() => {
        let row = '';
        let arr = [];
        userData?.map((user) => {
            row =
                createData(
                    user.id,
                    user.role,
                    user.name,
                    user.username,
                    formatDate(user.expiry_date),
                    user.plagairism,
                    user.grammar,
                    <StatusDot color={ user.status.toUpperCase() === 'ACTIVE' ? '#38BE62' : '#E9596F' } title={ user.status } />,
                    [{ 'component': <StatsIcon />, 'type': 'stats', 'title': 'Stats' }],
                    [
                        <>
                            <div style={ { display: 'flex', width: '100%' } }>
                                <Tooltip title='Plagiarism allocation' arrow>
                                    <PlagiarismGrammarContainer color='#e6e6fa'>
                                        { user.plagairism }
                                    </PlagiarismGrammarContainer>
                                </Tooltip>
                                <Tooltip title='Plagiarism uploaded' arrow>
                                    <PlagiarismGrammarContainer color='#ffe'>
                                        { user.plagiarismUsed }
                                    </PlagiarismGrammarContainer>
                                </Tooltip>
                                <Tooltip title='Plagiarism remaining' arrow>
                                    <PlagiarismGrammarContainer color='#DAF7A6'>
                                        { user.plagairism - user.plagiarismUsed }
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
                                        { user.grammar }
                                    </PlagiarismGrammarContainer>
                                </Tooltip>
                                <Tooltip title='Grammar uploaded' arrow>
                                    <PlagiarismGrammarContainer color='#ffe'>
                                        { user?.grammarUsed }
                                    </PlagiarismGrammarContainer>
                                </Tooltip>
                                <Tooltip title='Grammar remaining' arrow>
                                    <PlagiarismGrammarContainer color='#DAF7A6'>
                                        { user.grammar - user?.grammarUsed }
                                    </PlagiarismGrammarContainer>
                                </Tooltip>
                            </div>
                        </>
                    ],
                    user.role === Role.proAdmin ? ([
                        { 'component': <EditIcon />, 'type': 'edit', 'title': 'Edit' },
                        { 'component': <VpnKeyIcon />, 'type': 'resend', 'title': 'Resend credentials' },
                        {
                            'component': <Switch checked={ user.status.toUpperCase() === 'ACTIVE' ? true : false } size="small" />,
                            'type': user.status === 'active' ? 'lock' : 'unlock',
                            'title': user.status === 'active' ? 'Activate' : 'De-activate'
                        }
                    ]) :
                        ([{ 'component': <EditIcon />, 'type': 'edit', 'title': 'Edit' },
                        { 'component': <DeleteIcon />, 'type': 'delete', 'title': 'Delete' },
                        { 'component': <PersonIcon />, 'type': 'admin', 'title': 'Make him admin' },
                            { 'component': <VpnKeyIcon />, 'type': 'resend', 'title': 'Resend credentials' },
                        {
                            'component': <Switch checked={ user.status === 'active' ? true : false } size="small" />,
                            'type': user.status === 'active' ? 'lock' : 'unlock',
                            'title': user.status === 'active' ? 'Activate' : 'De-activate'
                        }
                        ]),
                    user.expiry_date,
                    user.department,
                    user.designation,
                    user.phone_number,
                );
            row['isSelected'] = false;
            arr.push(row);
        });
        setRows([...arr]);
    }, [userData]);

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

    const handleYesWarning = () => {
        DeleteData(BASE_URL_SUPER + END_POINTS_PRO.SUPER_ADMIN_USER + `${router?.query?.licenseId}/users?id=${deleteRowData}`, paginationPayload);
        setShowDeleteAllIcon(false);
        setTimeout(() => {
            setShowDeleteWarning(false);
        }, [100]);
    };

    const handleStatusWarning = () => {
        DeactivateData(BASE_URL_SUPER + END_POINTS_PRO.SUPER_ADMIN_USER + router?.query?.licenseId + '/user/' + statusRowData.id + '/' + statusRowData.status, paginationPayload);
        setTimeout(() => {
            setStatusWarning(false);
        }, [100]);
    };

    const handleMakeAdminWarning = () => {
        setTimeout(() => {
            setMakeAdminDialogModal(false)
        }, [100]);
        MakeHimAdmin(BASE_URL_SUPER + END_POINTS_PRO.SUPER_ADMIN_USER + `${router?.query?.licenseId}/admin/${userId}`, paginationPayload)
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
            setUserId(rowData?.user_id);
            setShowDialogModal(true);
        } else if (icon === 'admin') {
            setUserId(rowData?.user_id);
            setMakeAdminDialogModal(true);
        } else if (icon === 'resend') {
            setUserId(rowData?.user_id);
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
            if (rowItem?.user_id === row?.user_id) {
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
            rowsId += rowItem?.user_id + ',';
        });
        setDeleteRowData(removeCommaWordEnd(rowsId));
        setShowDeleteWarning(true);
    };

    const handleCloseDrawer = (drawerClose) => {
        setEditInstructor(drawerClose);
    };

    const handleResendCredentialsWarning = () => {
        let data = {
            'lid': router?.query?.licenseId,
            'user_id': userId
        }
        ResendCredentials(PRO, data)
        setTimeout(() => {
            setResendCredentialsDialogModal(false)
        }, [100]);
    };

    const handleResendCredentialsCloseWarning = () => {
        setResendCredentialsDialogModal(false);
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
                makeAdminDialogModal &&
                <WarningDialog
                    warningIcon={ <DeleteWarningIcon /> }
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

            {
                showDialogModal &&
                <DialogModal
                    headingTitle="User Statistics"
                    isOpen={ true }
                    fullWidth="lg"
                    maxWidth="lg"
                    handleClose={ handleCloseDialog }
                >
                    <UserStats
                        licenseId={ router?.query?.licenseId }
                        userId={ userId }
                    />
                </DialogModal>
            }

            <AddButtonBottom>
                <CreateDrawer
                    isShowAddIcon={ true }
                    title='Add user'
                >
                    <UserForm
                        licenseId={ router?.query?.licenseId }
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
                    <UserForm
                        licenseId={ router?.query?.licenseId }
                        editData={ editInstructorData }
                    />
                </CreateDrawer>
            }

            <Box sx={ { flexGrow: 1 } }>
                <Grid container spacing={ 1 }>
                    <Grid item md={ 10 } xs={ 10 }>
                        <BreadCrumb item={ UserBreadCrumb } />
                    </Grid>
                </Grid>
            </Box>

            <Box sx={ { flexGrow: 1 } }>
                <Grid container spacing={ 1 }>
                    <Grid item md={ 5 } xs={ 5 }>
                        <MainHeading title={ `Users(${pageDetails?.totalElements !== undefined ? pageDetails?.totalElements : 0})` } />
                    </Grid>
                    <Grid item md={ 7 } xs={ 7 } style={ { textAlign: 'right' } }>
                        <TextField
                            sx={ { width: '40%', marginTop: '8px' } }
                            placeholder='Search'
                            onChange={ debouncedResults }
                            inputProps={ {
                                style: {
                                    padding: 5,
                                    display: 'inline-flex'
                                }
                            } }
                        />
                    </Grid>
                </Grid>
                {/* <SubTitle title='6/10 users' />
                <InfoIcon /> */}
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
                    isLoading={
                        isLoadingdetailsData ||
                        isLoadingsuperAdmin ||
                        isLoadingadminCrud ||
                        isLoadingResend
                    }
                    charLength={ 7 }
                    path=''
                />

                <PaginationContainer>
                    <Pagination
                        count={ pageDetails?.totalPages }
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
    pageDetails: state?.detailsData?.instructorData?.user?.page,
    userData: state?.detailsData?.instructorData?.user?._embedded?.usersDTOList,
    isLoadingdetailsData: state?.detailsData?.isLoading,
    isLoadingsuperAdmin: state?.superAdmin?.isLoading,
    isLoadingResend: state?.superAdmin?.isLoadingResend,
    isLoadingadminCrud: state?.adminCrud?.isLoading,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetInstructorData: (url, paginationPayload) => dispatch(GetInstructorData(url, paginationPayload)),
        DeactivateData: (url, paginationPayload) => dispatch(DeactivateData(url, paginationPayload)),
        DeleteData: (deleteRowData, paginationPayload) => dispatch(DeleteData(deleteRowData, paginationPayload)),
        MakeHimAdmin: (url, paginationPayload) => dispatch(MakeHimAdmin(url, paginationPayload)),
        ResendCredentials: (role, data) => dispatch(ResendCredentials(role, data)),
    };
};

ProUser.layout = SuperAdmin;

export default connect(mapStateToProps, mapDispatchToProps)(ProUser);