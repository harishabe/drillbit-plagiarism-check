import React from 'react'
import Admin from './../../layouts/Admin'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { CardView, CommonTable, MainHeading, SubTitle } from '../../components'
import { DeleteIcon, LockIcon, InfoIcon } from '../../assets/icon'

import { BreadCrumb } from './../../components'

const columns = [
    { id: 'id', label: 'Student ID', minWidth: 170 },
    { id: 'name', label: 'Student Name', minWidth: 170 },
    { id: 'email', label: 'Email', minWidth: 170 },
    { id: 'department', label: 'Department', minWidth: 170 },
    { id: 'section', label: 'Section', minWidth: 170 },
]

function createData(id, name, email, department, section) {
    return { id, name, email, department, section }
}

const rows = [
    createData(1001, 'Harisha B E', 'harish@drillbit.com', 'CS', 'A'),
    createData(1001, 'Harisha B E', 'harish@drillbit.com', 'CS', 'A'),
    createData(1001, 'Harisha B E', 'harish@drillbit.com', 'CS', 'A'),
]

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

const Instructor = () => {
    return (
        <React.Fragment>
            <BreadCrumb item={InstructorBreadCrumb} />
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item md={10} xs={12}>
                        <MainHeading title='Instructors(3)' />
                    </Grid>
                    <Grid item xs container direction='row' justifyContent={'right'}>
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

Instructor.layout = Admin

export default Instructor
