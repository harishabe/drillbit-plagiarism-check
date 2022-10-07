import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import { BreadCrumb, MainHeading } from './../../components';
import Instructor from '../../layouts/Instructor';

const InstructorBreadCrumb = [
    {
        name: 'Dashboard',
        link: '/admin/dashboard',
        active: false,
    },
    {
        name: 'Document Comparision',
        link: '',
        active: true,
    },
];

const Comparedoc = () => {
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
            <Grid item md={10}>
                <MainHeading title='Compare Doc' />
            </Grid>
        </React.Fragment>
    );
};

Comparedoc.layout = Instructor;

export default Comparedoc;
