import React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Student from '../../layouts/Student'
import {
    WidgetCard,
    ColumnChart,
    PieChart,
    CardView,
    Heading,
} from '../../components'
import {
    COLUMN_CHART_TYPE,
    COLUMN_CHART_COLOR,
    COLUMN_XAXIS_DATA,
    COLUMN_WIDTH,
    COLUMN_CHART_HEIGHT,
    COLUMN_CHART_SERIES_DATA,
    COLUMN_CHART_BORDER_RADIUS,
    PIE_CHART_TYPE,
    PIE_CHART_COLOR,
    PIE_CHART_SERIES,
    PIE_CHART_WIDTH,
    PIE_CHART_LABEL
} from './../../constant/data/ChartData'
import {
    NoOfClassIcon,
    NoOfSubmission,
    NoOfAssignmntIcon,
} from '../../assets/icon'
import MyRecentSubmissions from './dashboard/MyRecentSubmissions'

const Dashboard = () => {
    return (
        <React.Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item md={4} xs={12}>
                        <WidgetCard
                            title='No of classes'
                            count='6'
                            icon={<NoOfClassIcon />}
                        />
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <WidgetCard
                            title='No of classes'
                            count='6'
                            icon={<NoOfAssignmntIcon />}
                        />
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <WidgetCard
                            title='No of classes'
                            count='6'
                            icon={<NoOfSubmission />}
                        />
                    </Grid>
                </Grid>
            </Box>
            <Box mt={1} sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item md={12} xs={12}>
                        <MyRecentSubmissions />
                    </Grid>
                </Grid>
            </Box>
            <Box mt={1} sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item md={8} xs={12}>
                        <CardView>
                            <Heading title='Submission Overview' />
                            <ColumnChart
                                type={COLUMN_CHART_TYPE}
                                color={COLUMN_CHART_COLOR}
                                xaxisData={COLUMN_XAXIS_DATA}
                                columnWidth={COLUMN_WIDTH}
                                height={COLUMN_CHART_HEIGHT}
                                seriesData={COLUMN_CHART_SERIES_DATA}
                                borderRadius={COLUMN_CHART_BORDER_RADIUS}
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

Dashboard.layout = Student

export default Dashboard
