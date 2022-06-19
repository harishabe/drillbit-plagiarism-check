import React, { useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import debouce from "lodash.debounce";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import VpnKeyOffOutlinedIcon from '@mui/icons-material/VpnKeyOffOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import { Skeleton, TextField, Pagination } from '@mui/material';
import Admin from './../../layouts/Admin';
import { BreadCrumb } from './../../components';
import {
    CardView,
    CommonTable,
    MainHeading,
    StatusDot,
    AvatarName,
    CreateDrawer,
    WarningDialog,
    DialogModal
} from '../../components';
import { EditIcon, DeleteIcon, LockIcon, StatsIcon, DeleteWarningIcon } from '../../assets/icon';
import { GetInstructorData, EditData, DeleteData, DeactivateData } from '../../redux/action/admin/AdminAction';
import { PaginationValue } from '../../utils/PaginationUrl';
import InstructorForm from './form/InstructorForm';
import InstructorStats  from './instructor/InstructorStats';

const columns = [
    { id: 'id', label: 'ID', minWidth: 100 },
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'email', label: 'Email', minWidth: 170 },
    { id: 'creationDate', label: 'Creation Date', minWidth: 170 },
    { id: 'status', label: 'Status', minWidth: 170 },
    { id: 'stats', label: 'Stats', minWidth: 100 },
    { id: 'action', label: 'Action', minWidth: 100 }
]

function createData(id, name, email, creationDate, status, stats, action) {
    return { id, name, email, creationDate, status, stats, action }
};

const AddButtonBottom = styled.div`
    position:fixed;
    bottom: 30px;
    right:30px;
`;

const InstructorBreadCrumb = [
    {
        name: 'Dashboard',
        link: '/admin/dashboard',
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
    instructorData,
    EditData,
    DeleteData,
    DeactivateData,
    isLoading
}) => {
    const [rows, setRows] = useState([]);

    const [showDeleteWarning, setShowDeleteWarning] = useState(false);
    const [deleteRowData, setDeleteRowData] = useState('');
    const [showStatusWarning, setStatusWarning] = useState(false);
    const [showDialogModal, setShowDialogModal] = useState(false);
    const [statusRowData, setStatusRowData] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    const [paginationPayload, setPaginationPayload] = useState({
        page: PaginationValue?.page,
        size: PaginationValue?.size,
        field: PaginationValue?.field,
        orderBy: PaginationValue?.orderBy,
    });

    useEffect(() => {
        GetInstructorData(paginationPayload);
    }, [, paginationPayload]);

    useEffect(() => {
        let row = '';
        let arr = [];
        instructorData?.map((instructor) => {
            row =
                createData(
                    <AvatarName avatarText="I" title={instructor.id} color='#4795EE' />,
                    instructor.name,
                    instructor.username,
                    instructor.creation_date,
                    <StatusDot color={instructor.status === 'active' ? '#38BE62' : '#E9596F'} title={instructor.status} />,
                    [{ 'component': <StatsIcon />, 'type': 'stats' }],
                    [{ 'component': <EditIcon />, 'type': 'edit' },
                    { 'component': <DeleteIcon />, 'type': 'delete' },
                    {
                        'component': instructor.status === 'active' ? <VpnKeyOutlinedIcon /> : <VpnKeyOffOutlinedIcon />,
                        'type': instructor.status === 'active' ? 'lock' : 'unlock'
                    }
                    ]
                );
            arr.push(row)
        });
        setRows([...arr]);
    }, [instructorData]);

    const handleChange = (event, value) => {
        event.preventDefault();
        setPaginationPayload({ ...paginationPayload, 'page': value - 1 })
    };

    const handleCloseWarning = () => {
        setShowDeleteWarning(false);
    };

    const handleStatusCloseWarning = () => {
        setStatusWarning(false);
    };

    const handleYesWarning = () => {
        DeleteData(deleteRowData, paginationPayload);
        setTimeout(() => {
            setShowDeleteWarning(false);
        }, [100]);
    };

    const handleStatusWarning = () => {
        DeactivateData(statusRowData, paginationPayload);
        setTimeout(() => {
            setStatusWarning(false);
        }, [100]);
    };

    const handleAction = (event, icon, rowData) => {
        if (icon === 'edit') {
            EditData();
        } else if (icon === 'delete') {
            setDeleteRowData(rowData?.id?.props?.title);
            setShowDeleteWarning(true);
        } else if (icon === 'lock') {
            let activateDeactive = {
                'id': rowData?.id?.props?.title,
                'status': 'inactive'
            }
            setStatusRowData(activateDeactive);
            setStatusWarning(true);
            setStatusMessage('inactive');
        } else if (icon === 'unlock') {
            let activateDeactive = {
                'id': rowData?.id?.props?.title,
                'status': 'active'
            };
            setStatusRowData(activateDeactive);
            setStatusWarning(true);
            setStatusMessage('active');
        } else if (icon === 'stats') {
            setShowDialogModal(true);
        }
    }

    const handleCloseDialog = () => {
        setShowDialogModal(false);
    }

    /** search implementation using debounce concepts */

    const handleSearch = (event) => {
        if (event.target.value !== '') {
            paginationPayload['search'] = event.target.value;
            setPaginationPayload({ ...paginationPayload, paginationPayload });
        } else {
            delete paginationPayload['search'];
            setPaginationPayload({ ...paginationPayload, paginationPayload });
        }
    }

    const debouncedResults = useMemo(() => {
        return debouce(handleSearch, 300);
    }, []);

    useEffect(() => {
        return () => {
            debouncedResults.cancel();
        };
    });

    /** end debounce concepts */

    return (
        <React.Fragment>

            {showDeleteWarning &&
                <WarningDialog
                    warningIcon={<DeleteWarningIcon />}
                    message="Are you sure you want to delete ?"
                    handleYes={handleYesWarning}
                    handleNo={handleCloseWarning}
                    isOpen={true}
                />}
            {showStatusWarning &&
                <WarningDialog
                    warningIcon={<DeleteWarningIcon />}
                    message={"Are you sure, you want to " + statusMessage + "?"}
                    handleYes={handleStatusWarning}
                    handleNo={handleStatusCloseWarning}
                    isOpen={true}
                />}
            {showDialogModal &&
                <>
                    <DialogModal isOpen={true} fullWidth="lg" maxWidth="lg" handleClose={handleCloseDialog}>
                        <InstructorStats  />
                    </DialogModal>
                </>
            }

            <AddButtonBottom>
                <CreateDrawer 
                    title="create instructor">
                    <InstructorForm />
                </CreateDrawer>
            </AddButtonBottom>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item md={10} xs={10}>
                        <BreadCrumb item={InstructorBreadCrumb} />
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item md={8}>
                        <MainHeading title={'Instructors' + '(' + pageDetails?.totalElements + ')'} />
                    </Grid>
                    <Grid item md={4} xs container direction='row' justifyContent={'right'}>
                        <TextField
                            placeholder='Search'
                            onChange={debouncedResults}
                            inputProps={{
                                style: {
                                    padding: 5,
                                    display: 'inline-flex'
                                }
                            }}
                        />
                        {/* <SubTitle title='6/10 users' />
                        <InfoIcon /> */}
                    </Grid>
                </Grid>
            </Box>
            <CardView>
                {isLoading ?
                    <>
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                    </> :
                    <>
                        <CommonTable
                            isCheckbox={true}
                            tableHeader={columns}
                            tableData={rows}
                            handleAction={handleAction}
                            charLength={17}
                            path=''
                        />
                        <div style={{ marginLeft: '35%', marginTop: '25px' }}>
                            <Pagination
                                count={pageDetails?.totalPages}
                                onChange={handleChange}
                                color="primary"
                                variant="outlined"
                                shape="rounded"
                            />
                        </div>
                    </>
                }
            </CardView>
        </React.Fragment >
    )
}


const mapStateToProps = (state) => ({
    pageDetails: state?.detailsData?.instructorData?.page,
    instructorData: state?.detailsData?.instructorData?._embedded?.instructorDTOList,
    isLoading: state?.detailsData?.isLoading,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetInstructorData: (paginationPayload) => dispatch(GetInstructorData(paginationPayload)),
        EditData: (data) => dispatch(EditData(data)),
        DeactivateData: (data, paginationPayload) => dispatch(DeactivateData(data, paginationPayload)),
        DeleteData: (deleteRowData, paginationPayload) => dispatch(DeleteData(deleteRowData, paginationPayload)),
    };
};

Instructor.layout = Admin

export default connect(mapStateToProps, mapDispatchToProps)(Instructor);