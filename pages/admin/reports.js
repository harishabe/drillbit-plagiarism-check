import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Admin from './../../layouts/Admin';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { BreadCrumb, CardView, WidgetCard, Heading } from './../../components';
import { DownloadIcon } from '../../assets/icon';
import { DownloadInstructorStudentData } from '../../redux/action/admin/AdminAction';
import ReportForm from './form/ReportForm';

const IntegrationBreadCrumb = [
    {
        name: 'Dashboard',
        link: '/admin/dashboard',
        active: false,
    },
    {
        name: 'Reports',
        link: '',
        active: true,
    },
];

const Reports = ({
    reportsData,
    DownloadInstructorStudentData,
    isLoadingDownload,
    isLoading
}) => {

    const [usersType, setUsersType] = useState('');

    const handDownload = (e, title) => {
        if (title === 'Instructors lists') {
            DownloadInstructorStudentData('instructors');
            setUsersType('instructors');
        } else if (title === 'Student lists') {
            DownloadInstructorStudentData('students');
            setUsersType('students');
        }
    };

    return (
        <React.Fragment>
            <BreadCrumb item={IntegrationBreadCrumb} />
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item md={6} xs={12}>
                        <WidgetCard
                            title='Instructors lists'
                            count={ reportsData?.no_of_instructors }
                            handleDownload={handDownload}
                            isLoading={isLoading}
                            isLoadingIcon={usersType === 'instructors' ? isLoadingDownload : false}
                            icon={<DownloadIcon />}
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <WidgetCard
                            title='Student lists'
                            count={ reportsData?.no_of_students }
                            handleDownload={handDownload}
                            isLoading={isLoading}
                            isLoadingIcon={usersType === 'students' ? isLoadingDownload : false}
                            icon={<DownloadIcon />}
                        />
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ mt: 3, flexGrow: 1 }}>
                <CardView>
                    <Heading title='Reports' />
                    <ReportForm />
                </CardView>
            </Box>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => ({
    reportsData: state?.adminReport?.reportData,
    isLoading: state?.adminReport?.isLoading,
    isLoadingDownload: state?.adminReport?.isLoadingDownload,
});

const mapDispatchToProps = (dispatch) => {
    return {
        DownloadInstructorStudentData: (userType) => dispatch(DownloadInstructorStudentData(userType)),
    };
};


Reports.layout = Admin;

export default connect(mapStateToProps, mapDispatchToProps)(Reports);
