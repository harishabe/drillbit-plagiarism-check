import React from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Instructor from '../../layouts/Instructor';
import { BreadCrumb, CardInfoView, MainHeading } from '../../components';

const InstructorBreadCrumb = [{
    'name': 'Dashboard',
    'link': '/instructor/dashboard',
    'active': false
}, {
    'name': 'My classes',
    'link': '',
    'active': true
}];

const classes = [{
    'name': 'Dashboard'
}, {
    'name': 'My classes'
},{
    'name': 'My classes'
},{
    'name': 'My classes'
}];


const MyClasses = () => {
    return (
        <React.Fragment>
            <BreadCrumb item={InstructorBreadCrumb} />
            <MainHeading title="My Classes(6)" />
            <Grid container spacing={2}>
                {classes.map((item, index) => (
                    <Grid key={index} item md={4} xs={12}>
                        <CardInfoView />
                    </Grid>
                ))}
            </Grid>
        </React.Fragment>
    )
};

MyClasses.layout = Instructor;

export default MyClasses;