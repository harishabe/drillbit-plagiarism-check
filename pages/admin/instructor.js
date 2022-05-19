import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import Admin from './../../layouts/Admin';
import { BreadCrumb } from './../../components';
import { CardView, CommonTable, MainHeading, SubTitle, StatusDot, AvatarName } from '../../components';
import { DeleteIcon, LockIcon, InfoIcon, StatsIcon } from '../../assets/icon';

const columns = [
    { id: 'id', label: 'ID', minWidth: 100 },
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'email', label: 'Email', minWidth: 170 },
    { id: 'creationDate', label: 'Creation Date', minWidth: 170 },
    { id: 'status', label: 'Status', minWidth: 170 },
    { id: 'stats', label: 'Stats', minWidth: 100 },
    { id: 'action', label: 'Action', minWidth: 100 }
];

function createData(id, name, email, creationDate, status, stats, action) {
    return { id, name, email, creationDate, status, stats, action }
};

const rows = [
    createData(<AvatarName title='S101' color='#4795EE' />, 'Harisha B E', 'harish@drillbit.com', '2022-01-06', <StatusDot color="#38BE62" title="Active" />, <StatsIcon />, [<DeleteIcon />, <LockIcon />]),
    createData(<AvatarName title='S102' color='#5E47EE' />, 'Harisha B E', 'harish@drillbit.com', '2022-01-06', <StatusDot color="#38BE62" title="Active" />, <StatsIcon />, [<DeleteIcon />, <LockIcon />]),
    createData(<AvatarName title='S103' color='#EE4747' />, 'Harisha B E', 'harish@drillbit.com', '2022-01-06', <StatusDot color="#E9596F" title="In Active" />, <StatsIcon />, [<DeleteIcon />, <LockIcon />]),
];

const actionIcon = [<DeleteIcon />, <LockIcon />];

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

const Instructor = () => {
    return (
        <React.Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item md={10} xs={10}>
                        <BreadCrumb item={InstructorBreadCrumb} />
                    </Grid>
                    <Grid item md={2} xs={2}>
                        <TextField
                            placeholder='Search'
                            inputProps={{
                                style: {
                                    padding: 5,
                                    display: 'inline-flex'
                                }
                            }}
                        />
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item md={10}>
                        <MainHeading title='Instructors(3)' />
                    </Grid>
                    <Grid item md={2} xs container direction='row' justifyContent={'right'}>
                        <SubTitle title='6/10 users' />
                        <InfoIcon />
                    </Grid>
                </Grid>
            </Box>
            <CardView>
                <CommonTable
                    isCheckbox={true}
                    tableHeader={columns}
                    tableData={rows}
                    actionIcon={actionIcon}
                    isActionIcon={true}
                />
            </CardView>
        </React.Fragment>
    )
}

Instructor.layout = Admin;

export default Instructor;
