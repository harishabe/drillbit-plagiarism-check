import React from 'react'
import Grid from '@mui/material/Grid'
import Student from '../../layouts/Student'
import { BreadCrumb, CardInfoView, MainHeading } from '../../components'

const StudentBreadCrumb = [
    {
        name: 'Dashboard',
        link: '/student/dashboard',
        active: false,
    },
    {
        name: 'My classes',
        link: '/student/myclasses',
        active: false,
    },
    {
        name: 'My assignments',
        link: '',
        active: true,
    },
]

const classes = [
    {
        name: 'Assignment 1',
        description: 'The only condition to run that byte code',
        validity: '2 days left',
        color: '#38BE62',
    },
    {
        name: 'Assignment 2',
        description: 'Our team is here round the clock to help',
        validity: '2 days left',
        color: '#F1A045',
    },
    {
        name: 'Assignment 3',
        description: 'Our team is here round the clock to help',
        validity: '2 days left',
        color: '#8D34FF',
    },
]

const MyAssignments = () => {
    return (
        <React.Fragment>
            <BreadCrumb item={StudentBreadCrumb} />
            <MainHeading title='My Assignments' />
            <Grid container spacing={2}>
                {classes.map((item, index) => (
                    <Grid key={index} item md={4} xs={12}>
                        <CardInfoView
                            path=''
                            item={item}
                            isDownload={true}
                            isSubmit={true}
                            submitPath='/student/myassignment-details'
                        />
                    </Grid>
                ))}
            </Grid>
        </React.Fragment>
    )
}

MyAssignments.layout = Student

export default MyAssignments
