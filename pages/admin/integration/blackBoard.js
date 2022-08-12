import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Admin from './../../../layouts/Admin';
import {
    BreadCrumb,
    CardView,
    Heading,
    MainHeading
} from '../../../components';
import { GetIntegrationList } from '../../../redux/action/admin/AdminAction';
import END_POINTS from '../../../utils/EndPoints';

const InstructorBreadCrumb = [
    {
        name: 'Dashboard',
        link: '/admin/dashboard',
        active: false,
    },
    {
        name: 'Integrations',
        link: '/admin/integration',
        active: false,
    },
    {
        name: 'Integration details',
        link: '',
        active: true,
    },
];

const BlackBoard = ({
    GetIntegrationList
}) => {

    useEffect(() => {
        GetIntegrationList(END_POINTS.ADMIN_MOODLE_INTEGRATION);
    }, []);

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
                        <MainHeading title='Integrations' />
                        <CardView>


                        </CardView>
                    </Grid>
                </Grid>
            </Box>
        </React.Fragment>
    )
};

BlackBoard.layout = Admin;

export default BlackBoard;