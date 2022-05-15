import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Admin from '../../layouts/Admin';
import { WidgetCard, ColumnChart, PieChart, CardView, Heading } from '../../components';
import {
    NoOfClassIcon,
    NoOfSubmission,
    NoOfAssignmntIcon
} from '../../assets/icon';
import TopStudents from '../instructor/dashboard/TopStudents';
import {
    COLUMN_ADMIN_CHART_TYPE,
    COLUMN_ADMIN_CHART_COLOR,
    COLUMN_ADMIN_XAXIS_DATA,
    COLUMN_ADMIN_WIDTH,
    COLUMN_ADMIN_CHART_HEIGHT,
    COLUMN_ADMIN_CHART_SERIES_DATA,
    COLUMN_ADMIN_CHART_GRADIENT,
    COLUMN_ADMIN_ACC_USG_CHART_TYPE,
    COLUMN_ADMIN_ACC_USG_CHART_COLOR,
    COLUMN_ADMIN_ACC_USG_XAXIS_DATA,
    COLUMN_ADMIN_ACC_USG_WIDTH,
    COLUMN_ADMIN_ACC_USG_CHART_HEIGHT,
    COLUMN_ADMIN_ACC_USG_CHART_SERIES_DATA,
    COLUMN_ADMIN_ACC_USG_CHART_GRADIENT,
    COLUMN_ADMIN_CHART_BORDER_RADIUS,
    COLUMN_ADMIN_ACC_USG_CHART_BORDER_RADIUS,
    PIE_CHART_TYPE,
    PIE_CHART_COLOR,
    PIE_CHART_SERIES,
    PIE_CHART_WIDTH,
    PIE_CHART_LABEL
} from './../../constant/data/ChartData'

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
                    <Grid item md={8} xs={12}>
                        <CardView>
                            <Heading title='Document Processed' />
                            <ColumnChart
                                type={COLUMN_ADMIN_CHART_TYPE}
                                color={COLUMN_ADMIN_CHART_COLOR}
                                xaxisData={COLUMN_ADMIN_XAXIS_DATA}
                                columnWidth={COLUMN_ADMIN_WIDTH}
                                height={COLUMN_ADMIN_CHART_HEIGHT}
                                seriesData={COLUMN_ADMIN_CHART_SERIES_DATA}
                                gradient={COLUMN_ADMIN_CHART_GRADIENT}
                                borderRadius={COLUMN_ADMIN_CHART_BORDER_RADIUS}
                            />
                        </CardView>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <CardView>
                            <Heading title='Account Usage Info' />
                            <ColumnChart
                                type={COLUMN_ADMIN_ACC_USG_CHART_TYPE}
                                color={COLUMN_ADMIN_ACC_USG_CHART_COLOR}
                                xaxisData={COLUMN_ADMIN_ACC_USG_XAXIS_DATA}
                                columnWidth={COLUMN_ADMIN_ACC_USG_WIDTH}
                                height={COLUMN_ADMIN_ACC_USG_CHART_HEIGHT}
                                seriesData={COLUMN_ADMIN_ACC_USG_CHART_SERIES_DATA}
                                gradient={COLUMN_ADMIN_ACC_USG_CHART_GRADIENT}
                                borderRadius={COLUMN_ADMIN_ACC_USG_CHART_BORDER_RADIUS}
                            />
                        </CardView>
                    </Grid>
                </Grid>
            </Box>
            <Box mt={1} sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item md={4} xs={12}>
                        <TopStudents />
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <CardView>
                            <Heading title='Account Validity' />
                            <PieChart
                                type={PIE_CHART_TYPE}
                                color={PIE_CHART_COLOR}
                                width={PIE_CHART_WIDTH}
                                label={PIE_CHART_LABEL}
                                series={PIE_CHART_SERIES}
                            />
                        </CardView>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <CardView>
                            <Heading title='Trend Analysis' />
                            <PieChart
                                type={PIE_CHART_TYPE}
                                color={PIE_CHART_COLOR}
                                width={PIE_CHART_WIDTH}
                                label={PIE_CHART_LABEL}
                                series={PIE_CHART_SERIES}
                            />
                        </CardView>
                    </Grid>
                </Grid>
            </Box>
        </React.Fragment>
    )
}

Dashboard.layout = Admin

export default Dashboard