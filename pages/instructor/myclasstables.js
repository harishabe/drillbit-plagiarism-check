import React from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { TextField } from '@mui/material'

import Instructor from '../../layouts/Instructor'
import { BreadCrumb, TabMenu } from '../../components'

import Assignments from './assignments'
import Students from './students'

const InstructorBreadCrumb = [
    {
        name: 'Dashboard',
        link: '/instructor/dashboard',
        active: false,
    },
    {
        name: 'My classes',
        link: '/instructor/myclasses',
        active: false,
    },
    {
        name: 'Java',
        link: '/instructor/myclasstables',
        active: true,
    },
]

const tabMenu = [
    {
        label: 'Students(23)',
    },
    {
        label: 'Assignments(27)',
    },
]

const componentList = [<Students />, <Assignments />]

const MyClassesTables = () => {
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
                                    display: 'inline-flex',
                                },
                            }}
                        />
                    </Grid>
                </Grid>
            </Box>
            <TabMenu menuButton={tabMenu} components={componentList} />
        </React.Fragment>
    )
}

MyClassesTables.layout = Instructor

export default MyClassesTables
