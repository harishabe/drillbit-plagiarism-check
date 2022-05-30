import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Admin from '../../layouts/Admin';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Skeleton, TextField } from '@mui/material';
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
    isLoading
}) => {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        GetStudnetData();
    }, []);

    useEffect(() => {
        let row = ''
        studentData?.map((student) => {
            row =
                createData(
                    <AvatarName title={student.student_id} color='#4795EE' />,
                    student.name,
                    student.username,
                    student.department,
                    student.section,
                    [<EditIcon />, <DeleteIcon />, <LockIcon />]
                );
            rows.push(row)
        });
        setRows([...rows]);
    }, [studentData]);

    return (
        <React.Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item md={10} xs={10}>
                        <BreadCrumb item={IntegrationBreadCrumb} />
                    </Grid>
                    <Grid item md={2} xs={2}>
                        {/* <TextField
                            placeholder='Search'
                            inputProps={{
                                style: {
                                    padding: 5,
                                    display: 'inline-flex',
                                },
                            }}
                        /> */}
                    </Grid>
                </Grid>
            </Box>

            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item md={10} xs={12}>
                        <MainHeading title='My Students(6)' />
                    </Grid>
                    {/* <Grid
                        item
                        md={2}
                        xs={12}
                        container
                        direction='row'
                        justifyContent={'right'}
                    >
                        <SubTitle title='6/10 users &nbsp;' />
                        <InfoIcon />
                    </Grid> */}
                </Grid>
            </Box>

            <CardView>
                {isLoading ? <Skeleton /> :
                    <CommonTable
                        isCheckbox={true}
                        tableHeader={columns}
                        tableData={rows}
                        actionIcon={actionIcon}
                        isActionIcon={true}
                        charLength={20}
                    />
                }
            </CardView>
        </React.Fragment>
    )
}


const mapStateToProps = (state) => ({
    studentData: state?.detailsData?.studentData?.studentsDTO,
    isLoading: state?.detailsData?.isLoading,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetStudnetData: () => dispatch(GetStudnetData())
    };
};

Students.layout = Admin;

export default connect(mapStateToProps, mapDispatchToProps)(Students);