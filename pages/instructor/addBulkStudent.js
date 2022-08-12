import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Instructor from '../../layouts/Instructor';
import {
    BreadCrumb,
    CardView,
    Heading
} from '../../components';

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
        name: 'My assignments',
        link: '/instructor/my-assignment',
        active: false,
    },
    {
        name: 'Add multiple student',
        link: '/instructor/my-assignment/addBulkStudent',
        active: true,
    },
];

const AddBulkStudent = () => {
    return (
        <React.Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item md={10} xs={10}>
                        <BreadCrumb item={InstructorBreadCrumb} />
                    </Grid>
                    <Grid item md={2} xs={2}>

                    </Grid>
                </Grid>
                <Grid container spacing={1}>
                    <Grid item md={12} xs={12}>
                        <CardView>
                            <div style={{ padding: '25px 150px' }}>
                                <Grid container spacing={1}>
                                    <Grid item md={6} xs={6}>
                                        <MainHeading title='Add Student' />
                                    </Grid>
                                    <Grid item md={6} xs={6}>

                                    </Grid>
                                </Grid>
                            </div>
                        </CardView>
                    </Grid>
                </Grid>
            </Box>
        </React.Fragment>
    )
};

AddBulkStudent.layout = Instructor;

export default AddBulkStudent;