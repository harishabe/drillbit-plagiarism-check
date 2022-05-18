import React from 'react'
import Grid from '@mui/material/Grid'
import Instructor from '../../layouts/Instructor'
import { BreadCrumb, MainHeading, Folder } from '../../components'


const InstructorBreadCrumb = [
    {
        name: 'Dashboard',
        link: '/instructor/dashboard',
        active: false,
    },
    {
        name: 'My folder',
        link: '',
        active: true,
    },
]

const folderData = ['', '', '', '', '']

const MyFolder = () => {
    return (
        <React.Fragment>
            <BreadCrumb item={InstructorBreadCrumb} />
            <MainHeading title='My Folder(6)' />
            {/* <Folder /> */}
            <Grid container spacing={2}>
                <Grid item md={3} sm={4} xs={6}>
                    <Folder />
                </Grid>
                <Grid item md={3} sm={4} xs={6}>
                    <Folder />
                </Grid>
                <Grid item md={3} sm={4} xs={6}>
                    <Folder />
                </Grid>
                <Grid item md={3} sm={4} xs={6}>
                    <Folder />
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

MyFolder.layout = Instructor

export default MyFolder