import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Admin from './../../layouts/Admin';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { BreadCrumb, CardView, WidgetCard, Heading } from './../../components';
import { DownloadIcon } from '../../assets/icon';
import { ReportsData, DownloadReportData } from '../../redux/action/admin/AdminAction';
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
    ReportsData, 
    DownloadReportData
}) => {
    
    useEffect(() => {
        ReportsData();
    }, []);

    const handDownload = (e, title) => {
         DownloadReportData();
    }

    return (
        <React.Fragment>
            <BreadCrumb item={IntegrationBreadCrumb} />
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item md={6} xs={12}>
                        <WidgetCard
                            title='Instructors lists'
                            count={reportsData?.instructorList.length}
                            handleDownload={handDownload}
                            icon={<DownloadIcon />}
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <WidgetCard
                            title='Student lists'
                            count={10}
                            handleDownload={handDownload}
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
});

const mapDispatchToProps = (dispatch) => {
    return {
        ReportsData: () => dispatch(ReportsData()),
        DownloadReportData: () => dispatch(DownloadReportData()),
    };
};


Reports.layout = Admin;

export default connect(mapStateToProps, mapDispatchToProps)(Reports);
