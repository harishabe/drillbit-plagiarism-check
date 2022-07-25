import React from 'react'
import SuperAdmin from './../../layouts/SuperAdmin'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import {
    WidgetCard,
    CardView,
    CommonTable,
    BreadCrumb,
} from './../../components'
import {
    EditIcon,
    DeleteIcon,
    NoOfClassIcon,
    NoOfAssignmntIcon,
    NoOfSubmission,
} from '../../assets/icon'

const columns = [
    { id: 'id', label: 'Sl.no' },
    { id: 'name', label: 'Name' },
    { id: 'email', label: 'Username (Email)' },
    { id: 'college', label: 'College Name' },
    { id: 'INlimit', label: 'Instructors Limit' },
    { id: 'STlimit', label: 'Students Limit' },
    { id: 'DOlimit', label: 'Documents Limit' },
]

function createData(id, name, email, college, INlimit, STlimit, DOlimit) {
    return { id, name, email, college, INlimit, STlimit, DOlimit }
}

const rows = [
    createData(
        1001,
        'Harisha B E',
        'harish@drillbit.com',
        'MIT',
        100,
        1000,
        1737
    ),
    createData(
        1001,
        'Harisha B E',
        'harish@drillbit.com',
        'MIT',
        100,
        1000,
        1737
    ),
    createData(
        1001,
        'Harisha B E',
        'harish@drillbit.com',
        'MIT',
        100,
        1000,
        1737
    ),
]

const actionIcon = [<EditIcon />, <DeleteIcon />]

// const IntegrationBreadCrumb = [
//     {
//         name: 'Dashboard',
//         link: '/admin/dashboard',
//         active: false,
//     },
//     {
//         name: 'Reports',
//         link: '',
//         active: true,
//     },
// ]

const Dashboard = () => {
    return (
        <React.Fragment>
            {/* <BreadCrumb item={IntegrationBreadCrumb} /> */ }
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item md={4} xs={12}>
                        <WidgetCard
                            title='Institutions'
                            count='111'
                            icon={<NoOfClassIcon />}
                        />
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <WidgetCard
                            title='Users'
                            count='11111'
                            icon={<NoOfAssignmntIcon />}
                        />
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <WidgetCard
                            title='Submissions'
                            count='11111111'
                            icon={<NoOfSubmission />}
                        />
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ mt: 1, flexGrow: 1 }}>
                <CardView>
                    <CommonTable
                        isCheckbox={false}
                        tableHeader={columns}
                        tableData={rows}
                        actionIcon={actionIcon}
                        isActionIcon={true}
                    />
                </CardView>
            </Box>
        </React.Fragment>
    )
}

Dashboard.layout = SuperAdmin

export default Dashboard
