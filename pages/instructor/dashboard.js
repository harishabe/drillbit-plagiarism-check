import React from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Instructor from '../../layouts/Instructor';
import { WidgetCard, ColumnChart, PieChart, CardView, Heading } from '../../components';
import {
    NoOfClassIcon,
    NoOfSubmission,
    NoOfAssignmntIcon
} from '../../assets/icon';
import TopStudents from './dashboard/TopStudents';
import RecentSubmissions from './dashboard/RecentSubmissions';

const Dashboard = () => {
    return (
        <React.Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item md={4} xs={12}>
                        <WidgetCard
                            title="No of classes"
                            count="6"
                            icon={<NoOfClassIcon />}
                        />
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <WidgetCard
                            title="No of classes"
                            count="6"
                            icon={<NoOfAssignmntIcon />}
                        />
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <WidgetCard
                            title="No of classes"
                            count="6"
                            icon={<NoOfSubmission />}
                        />
                    </Grid>
                </Grid>
            </Box>
            <Box mt={1} sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item md={4} xs={12}>
                        <TopStudents />
                    </Grid>
                    <Grid item md={8} xs={12}>
                        <RecentSubmissions />
                    </Grid>
                </Grid>
            </Box>
            <Box mt={1} sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item md={8} xs={12}>
                        <CardView>
                            <Heading title='Submission Overview' />
                            <ColumnChart />
                        </CardView>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <CardView>
                            <Heading title='Trend Analysis' />
                            <PieChart />
                        </CardView>
                    </Grid>
                </Grid>
            </Box>
        </React.Fragment>
    )
};

Dashboard.layout = Instructor;

export default Dashboard;