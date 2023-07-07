import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@mui/styles';
import Admin from './../../../../../layouts/Admin';
import ClassList from './classList';
import { Grid, Box, Skeleton } from "@mui/material";
import { GetGoogleLiveCourses } from './../../../../../redux/action/admin/AdminAction';
import {
    BreadCrumb,
    CardView
} from './../../../../../components';

const useStyles = makeStyles(() => ({
    width: {
        width: '100%'
    }
}));

const IntegrationBreadCrumb = [
    {
        name: 'Dashboard',
        link: '/extream/admin/dashboard',
        active: false,
    },
    {
        name: 'Integrations',
        link: '/extream/admin/integration',
        active: false,
    },
    {
        name: 'Live courses',
        link: '',
        active: true,
    },
];

const LiveCourses = ({
    GetGoogleLiveCourses,
    googleLiveCourseData,
    isLoadingLiveCourse,
}) => {
    const classes = useStyles();

    useEffect(() => {
        GetGoogleLiveCourses()
    }, []);

    return (
        <>
            <Box sx={ { flexGrow: 1 } }>
                <Grid container spacing={ 1 }>
                    <Grid item md={ 10 } xs={ 10 }>
                        <BreadCrumb item={ IntegrationBreadCrumb } />
                    </Grid>
                </Grid>
            </Box>
            <CardView>
                { isLoadingLiveCourse ?
                    <Skeleton className={ classes.width } />
                    :
                    <ClassList
                        googleLiveCourseData={ googleLiveCourseData }
                    />
                }
            </CardView>
        </>
    )
}

const mapStateToProps = (state) => ({
    googleLiveCourseData: state?.adminIntegrationData?.googleLiveCourseData,
    isLoadingLiveCourse: state?.adminIntegrationData?.isLoadingLiveCourse,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetGoogleLiveCourses: () => dispatch(GetGoogleLiveCourses())
    };
};

LiveCourses.layout = Admin;

export default connect(mapStateToProps, mapDispatchToProps)(LiveCourses);