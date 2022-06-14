import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Skeleton, TextField, Pagination } from '@mui/material';
import Admin from './../../layouts/Admin';
import { BreadCrumb } from './../../components';
import { CardView, CommonTable, MainHeading, SubTitle, StatusDot, AvatarName, CreateDrawer } from '../../components';
import { EditIcon, DeleteIcon, LockIcon, InfoIcon, StatsIcon } from '../../assets/icon';
import { GetInstructorData, EditData, DeleteData, DeactivateData } from '../../redux/action/admin/AdminAction';
import { PaginationValue } from '../../utils/PaginationUrl';

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
    position:absolute;
    bottom: 0px;
    right:0px;
`;


const actionIcon = [<DeleteIcon />, <LockIcon />]

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
]

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
                    <StatsIcon />,
                    [{ 'component': <EditIcon />, 'type': 'edit' }, { 'component': <DeleteIcon />, 'type': 'delete' }, { 'component': <LockIcon />, 'type': 'lock' }]
                );
            arr.push(row)
        });
        setRows([...arr]);
    }, [instructorData]);

    const handleChange = (event, value) => {
        event.preventDefault();
        setPaginationPayload({ ...paginationPayload, 'page': value - 1 })
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

    const handleAction = (event, icon) => {
        // console.log('handleActionhandleAction', event, icon);

        if (icon === 'edit') {
            EditData();
        } else if (icon === 'delete') {
            DeleteData();
        } else if (icon === 'lock') {
            DeactivateData();
        }
    }

    return (
        <React.Fragment>
            <AddButtonBottom>
                <CreateDrawer />
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
                            onChange={handleSearch}
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
                            actionIcon={actionIcon}
                            handleAction={handleAction}
                            isActionIcon={true}
                            charLength={20}
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
        </React.Fragment>
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
        DeactivateData: (data) => dispatch(DeactivateData(data)),
        DeleteData: () => dispatch(DeleteData()),
    };
};

Instructor.layout = Admin

export default connect(mapStateToProps, mapDispatchToProps)(Instructor);