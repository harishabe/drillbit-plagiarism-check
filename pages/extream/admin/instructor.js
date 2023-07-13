import React, { useEffect, useState, useMemo } from 'react';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import styled from 'styled-components';
import debouce from 'lodash.debounce';
import { Grid, Tooltip, Switch } from '@mui/material';
import Box from '@mui/material/Box';
import { TextField, Pagination, IconButton } from '@mui/material';
import Admin from './../../../layouts/Admin';
import {
    CommonTable,
    MainHeading,
    StatusDot,
    BreadCrumb,
    CreateDrawer,
    WarningDialog,
    DialogModal
} from '../../../components';
import {
    EditIcon,
    DeleteIcon,
    StatsIcon,
    DeleteWarningIcon,
    AddMultipleIcon,
    AddPersonIcon
} from '../../../assets/icon';
import {
    GetInstructorData,
    DeleteData,
    DeactivateData,
    UploadFileDataClear
} from '../../../redux/action/admin/AdminAction';
import { PaginationValue } from '../../../utils/PaginationUrl';
import InstructorForm from './form/InstructorForm';
import InstructorStats from './instructor/InstructorStats';
import { removeCommaWordEnd, formatDate } from '../../../utils/RegExp';
import END_POINTS from '../../../utils/EndPoints';
import { BASE_URL_EXTREM } from '../../../utils/BaseUrl';
import { Role } from '../../../constant/data';
import { WARNING_MESSAGES } from '../../../constant/data/Constant';
import { PaginationContainer } from '../../../style/index';

const columns = [
    // { id: 'user_id', label: 'ID', minWidth: 100 },
    { id: 'name', label: 'Name', maxWidth: 180 },
    { id: 'username', label: 'Email', maxWidth: 180 },
    { id: 'created_date', label: 'Creation Date', maxWidth: 180 },
    { id: 'status', label: 'Status', maxWidth: 180 },
    { id: 'stats', label: 'Statistics', maxWidth: 180 },
    { id: 'action', label: 'Actions', maxWidth: 180 }
];

function createData(user_id, role, name, username, created_date, plagairism, grammar, status, stats, action, expiry_date, department, designation, phone_number, plagiarismUsed, grammarUsed) {
    return { user_id, role, name, username, created_date, plagairism, grammar, status, stats, action, expiry_date, department, designation, phone_number, plagiarismUsed, grammarUsed };
};

const AddButtonBottom = styled.div`
    position:fixed;
    bottom: 30px;
    right:30px;
    z-index: 999;
`;

const InstructorBreadCrumb = [
    {
        name: 'Dashboard',
        link: '/extream/admin/dashboard',
        active: false,
    },
    {
        name: 'Instructors',
        link: '',
        active: true,
    },
];

const Instructor = ({
    pageDetails,
    GetInstructorData,
    UploadFileDataClear,
    instructorData,
    DeleteData,
    DeactivateData,
    isLoading
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

    useEffect(() => {
        GetInstructorData(BASE_URL_EXTREM + END_POINTS.ADMIN_INSTRUCTOR, paginationPayload);
    }, [, paginationPayload]);

    useEffect(() => {
        let row = '';
        let arr = [];
        instructorData?.map((instructor) => {
            row =
                createData(
                    // <AvatarName avatarText="I" title={instructor.id} color='#4795EE' />,
                    instructor.id,
                    instructor.role,
                    instructor.name,
                    instructor.username,
                    formatDate(instructor.creation_date),
                    instructor.plagairism,
                    instructor.grammar,
                    <StatusDot color={ (instructor.status === 'active') || (instructor.status === 'ACTIVE') ? '#38BE62' : '#E9596F' } title={ instructor.status } />,
                    [{ 'component': <StatsIcon />, 'type': 'stats', 'title': 'Stats' }],
                    instructor.role === Role.admin ? ([{ 'component': <EditIcon />, 'type': 'edit', 'title': 'Edit' }]) :
                        ([{ 'component': <EditIcon />, 'type': 'edit', 'title': 'Edit' },
                            { 'component': <DeleteIcon />, 'type': 'delete', 'title': 'Delete' },
                            {
                                'component': <Switch checked={ instructor.status === 'active' ? true : false } size="small" />,
                                'type': instructor.status === 'active' ? 'lock' : 'unlock',
                                'title': instructor.status === 'active' ? 'Activate' : 'De-activate'
                            }
                        ]),
                    instructor.expiry_date,
                    instructor.department,
                    instructor.designation,
                    instructor.phone_number,
                    instructor.plagiarismUsed,
                    instructor.grammarUsed,
                );
            row['isSelected'] = false;
            arr.push(row);
        });
        setRows([...arr]);
    }, [instructorData]);

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

    const handleYesWarning = () => {
        DeleteData(BASE_URL_EXTREM + END_POINTS.ADMIN_INSTRUCTOR_DELETE + deleteRowData, paginationPayload);
        setShowDeleteAllIcon(false);
        setTimeout(() => {
            setShowDeleteWarning(false);
        }, [100]);
    };

    const handleStatusWarning = () => {
        DeactivateData(BASE_URL_EXTREM + END_POINTS.ACTIVATE_DEACTIVATE_INSTRUCTOR + '/' + statusRowData.id + '/' + statusRowData.status, paginationPayload);
        setTimeout(() => {
            setStatusWarning(false);
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

    const handleShow = (e, info) => {
        if (info?.title === 'Add Instructor') {
            setShowDialogModal(true);
        } else if (info?.title === 'Add Multiple Instructors') {
            UploadFileDataClear();
            router.push({ pathname: '/extream/admin/addBulkInstructor' });
        }
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
                    <InstructorStats instructorId={ instructorId } />
                </DialogModal>
            }

            <AddButtonBottom>
                <CreateDrawer
                    options={ [
                        {
                            icon: <AddPersonIcon />,
                            title: 'Add Instructor',
                            handleFromCreateDrawer: false
                        },
                        {
                            icon: <AddMultipleIcon />,
                            title: 'Add Multiple Instructors',
                            handleFromCreateDrawer: true
                        }] }
                    title="Add Instructor"
                    handleMultiData={ handleShow }
                    isShowAddIcon={ true }
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

            <Box sx={ { flexGrow: 1 } }>
                <Grid container spacing={ 1 }>
                    <Grid item md={ 10 } xs={ 10 }>
                        <BreadCrumb item={ InstructorBreadCrumb } />
                    </Grid>
                </Grid>
            </Box>

            <Box sx={ { flexGrow: 1 } }>
                <Grid container spacing={ 1 }>
                    <Grid item md={ 5 } xs={ 5 }>
                        <MainHeading title={ `Instructors(${pageDetails?.totalElements !== undefined ? pageDetails?.totalElements : 0})` } />
                    </Grid>
                    <Grid item md={ 7 } xs={ 7 } style={ { textAlign: 'right' } }>
                        <TextField
                            sx={ { width: '40%', marginTop: '8px' } }
                            placeholder='Search by Email'
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
                    isLoading={ isLoading }
                    path=''
                />

                    <PaginationContainer>
                        <Pagination
                            count={ pageDetails?.totalPages }
                            page={ pageDetails?.number + 1 }
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
    pageDetails: state?.detailsData?.instructorData?.list?.page,
    instructorData: state?.detailsData?.instructorData?.list?.content,
    isLoading: state?.detailsData?.isLoading,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetInstructorData: (url, paginationPayload) => dispatch(GetInstructorData(url, paginationPayload)),
        DeactivateData: (url, paginationPayload) => dispatch(DeactivateData(url, paginationPayload)),
        DeleteData: (url, paginationPayload) => dispatch(DeleteData(url, paginationPayload)),
        UploadFileDataClear: () => dispatch(UploadFileDataClear()),
    };
};

Instructor.layout = Admin;

export default connect(mapStateToProps, mapDispatchToProps)(Instructor);