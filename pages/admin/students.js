import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Admin from '../../layouts/Admin';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Skeleton, TextField, Pagination } from '@mui/material';
import { BreadCrumb } from './../../components';
import {
    CardView,
    CommonTable,
    MainHeading,
    SubTitle,
    AvatarName,
} from '../../components';
import { EditIcon, DeleteIcon, LockIcon, InfoIcon } from '../../assets/icon';
import { GetStudnetData } from '../../redux/action/admin/AdminAction';
import { PaginationValue } from '../../utils/PaginationUrl';

const columns = [
    { id: 'id', label: 'Student ID', minWidth: 170 },
    { id: 'name', label: 'Student Name', minWidth: 170 },
    { id: 'email', label: 'Email', minWidth: 170 },
    { id: 'department', label: 'Department', minWidth: 170 },
    { id: 'section', label: 'Section', minWidth: 170 },
    { id: 'action', label: 'Action', minWidth: 100 },
]

function createData(id, name, email, department, section, action) {
    return { id, name, email, department, section, action }
}

const actionIcon = [<EditIcon />, <DeleteIcon />, <LockIcon />]

const IntegrationBreadCrumb = [
    {
        name: 'Dashboard',
        link: '/admin/dashboard',
        active: false,
    },
    {
        name: 'Students',
        link: '',
        active: true,
    },
]

const Students = ({
    GetStudnetData,
    studentData,
    pageDetails,
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
        GetStudnetData(paginationPayload);
    }, [, paginationPayload]);

    useEffect(() => {
        let row = '';
        let arr = [];
        studentData?.map((student) => {
            row =
                createData(
                    <AvatarName avatarText="S" title={student.student_id} color='#4795EE' />,
                    student.name,
                    student.username,
                    student.department,
                    student.section,
                    [<EditIcon />, <DeleteIcon />, <LockIcon />]
                );
            arr.push(row)
        });
        setRows([...arr]);
    }, [studentData]);

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

    return (
        <React.Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item md={10} xs={10}>
                        <BreadCrumb item={IntegrationBreadCrumb} />
                    </Grid>
                </Grid>
            </Box>

            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item md={10} xs={12}>
                        <MainHeading title={'Students'+'('+pageDetails?.totalElements+')'} />
                    </Grid>
                    <Grid
                        item
                        md={2}
                        xs={12}
                        container
                        direction='row'
                        justifyContent={'right'}
                    >
                        <TextField
                            placeholder='Search'
                            onChange={handleSearch}
                            inputProps={{
                                style: {
                                    padding: 5,
                                    display: 'inline-flex',
                                },
                            }}
                        />
                        {/* <SubTitle title='6/10 users &nbsp;' />
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
                            isActionIcon={true}
                            charLength={20}
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
    studentData: state?.detailsData?.studentData?._embedded?.studentDTOList,
    isLoading: state?.detailsData?.isLoading,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetStudnetData: (paginationPayload) => dispatch(GetStudnetData(paginationPayload))
    };
};

Students.layout = Admin;

export default connect(mapStateToProps, mapDispatchToProps)(Students);