import React from 'react'
import Admin from '../../layouts/Admin'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { TextField } from '@mui/material'
import { BreadCrumb } from './../../components'
import {
    CardView,
    CommonTable,
    MainHeading,
    SubTitle,
    AvatarName,
} from '../../components'
import { EditIcon, DeleteIcon, LockIcon, InfoIcon } from '../../assets/icon'

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

const rows = [
    createData(
        <AvatarName title='S101' color='#4795EE' />,
        'Harisha B E',
        'harish@drillbit.com',
        'CS',
        'A',
        [<EditIcon />, <DeleteIcon />, <LockIcon />]
    ),
    createData(
        <AvatarName title='S101' color='#5E47EE' />,
        'Harisha B E',
        'harish@drillbit.com',
        'CS',
        'A',
        [<EditIcon />, <DeleteIcon />, <LockIcon />]
    ),
    createData(
        <AvatarName title='S101' color='#EE4747' />,
        'Harisha B E',
        'harish@drillbit.com',
        'CS',
        'A',
        [<EditIcon />, <DeleteIcon />, <LockIcon />]
    ),
    createData(
        <AvatarName title='S101' color='#4795EE' />,
        'Harisha B E',
        'harish@drillbit.com',
        'CS',
        'A',
        [<EditIcon />, <DeleteIcon />, <LockIcon />]
    ),
]

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

const Students = () => {
    return (
        <React.Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item md={10} xs={10}>
                        <BreadCrumb item={IntegrationBreadCrumb} />
                    </Grid>
                    <Grid item md={2} xs={2}>
                        <TextField
                            placeholder='Search'
                            inputProps={{
                                style: {
                                    padding: 5,
                                    display: 'inline-flex',
                                },
                            }}
                        />
                    </Grid>
                </Grid>
            </Box>

            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item md={10} xs={12}>
                        <MainHeading title='My Students(6)' />
                    </Grid>
                    <Grid
                        item
                        md={2}
                        xs={12}
                        container
                        direction='row'
                        justifyContent={'right'}
                    >
                        <SubTitle title='6/10 users &nbsp;' />
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

Students.layout = Admin

export default Students
