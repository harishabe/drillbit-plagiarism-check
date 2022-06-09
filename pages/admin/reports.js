import React from 'react';
import Admin from './../../layouts/Admin';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { BreadCrumb, CardView, WidgetCard, Heading } from './../../components';
import { DownloadIcon } from '../../assets/icon';
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

const handDownload = (e, title) => {
}

const Reports = () => {
    return (
        <React.Fragment>
            <BreadCrumb item={IntegrationBreadCrumb} />
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item md={6} xs={12}>
                        <WidgetCard
                            title='Instructors lists'
                            count={10}
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

Reports.layout = Admin;

export default Reports;
