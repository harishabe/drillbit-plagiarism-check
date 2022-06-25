import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { Skeleton } from '@mui/material';
import styled from 'styled-components';
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Student from '../../layouts/Student'
import {
    WidgetCard,
    ColumnChart,
    PieChart,
    CardView,
    Heading,
    SubTitle,
} from '../../components'
import {
    GetDashboardData
} from '../../redux/action/student/StudentAction';
import {
    COLUMN_ADMIN_CHART_TYPE,
    COLUMN_ADMIN_CHART_COLOR,
    COLUMN_ADMIN_XAXIS_DATA,
    COLUMN_ADMIN_WIDTH,
    COLUMN_ADMIN_CHART_HEIGHT,
    COLUMN_ADMIN_CHART_GRADIENT,
    COLUMN_ADMIN_CHART_BORDER_RADIUS,
    PIE_CHART_TYPE,
    PIE_CHART_COLOR,
    PIE_CHART_SERIES,
    PIE_CHART_WIDTH,
    PIE_CHART_LABEL,
} from './../../constant/data/ChartData'
import {
    NoOfClassIcon,
    NoOfSubmission,
    NoOfAssignmntIcon,
} from '../../assets/icon'
import MyRecentSubmissions from './dashboard/MyRecentSubmissions'

const TextAlignRight = styled.div`
    text-align: right;
    margin-top: 5px;
`;

const Dashboard = ({
    GetDashboardData,
    studentDashboardData,
    isLoadingDashboard,
}) => {
    const [recentSubmission, setRecentSubmission] = useState([]);

    useEffect(() => {
        GetDashboardData();
    }, []);

    useEffect(() => {
        let submission = studentDashboardData?.monthlySubmissions?.map((item) => {
            console.log("firstfirstfirst", item.submissions)
            return item.submissions;
        });
        setRecentSubmission(submission);
    }, [studentDashboardData]);

    return (
        <React.Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item md={4} xs={12}>
                        <WidgetCard
                            title='No of classes'
                            isLoading={ isLoadingDashboard }
                            count={ studentDashboardData?.no_of_classes }
                            icon={<NoOfClassIcon />}
                        />
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <WidgetCard
                            title='No of assignments'
                            isLoading={ isLoadingDashboard }
                            count={ studentDashboardData?.no_of_assignments }
                            icon={<NoOfAssignmntIcon />}
                        />
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <WidgetCard
                            title='No of submissions'
                            isLoading={ isLoadingDashboard }
                            count={ studentDashboardData?.no_of_submissions }
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
                            { isLoadingDashboard ? <Skeleton /> :
                                studentDashboardData?.monthlySubmissions?.length > 0 && <ColumnChart
                                    type={ COLUMN_ADMIN_CHART_TYPE }
                                    color={ COLUMN_ADMIN_CHART_COLOR }
                                    xaxisData={ COLUMN_ADMIN_XAXIS_DATA }
                                    columnWidth={ COLUMN_ADMIN_WIDTH }
                                    height={ COLUMN_ADMIN_CHART_HEIGHT }
                                    seriesData={ [
                                        {
                                            name: 'Submission Overview',
                                            data: recentSubmission
                                        }
                                    ] }
                                    gradient={ COLUMN_ADMIN_CHART_GRADIENT }
                                    borderRadius={ COLUMN_ADMIN_CHART_BORDER_RADIUS }
                                /> }
                        </CardView>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <CardView>
                            <Grid container>
                                <Grid item md={ 9 } xs={ 12 }>
                                    <Heading title='Trend Analysis' />
                                </Grid>
                                <Grid item md={ 3 } xs={ 12 }>
                                    {
                                        isLoadingDashboard ?
                                            <Skeleton /> :
                                            <TextAlignRight>
                                                <SubTitle
                                                    title={ studentDashboardData?.trendAnalysis?.documentsProcessed }
                                                />
                                            </TextAlignRight>
                                    }
                                </Grid>
                            </Grid>
                            { isLoadingDashboard ?
                                <Skeleton
                                    variant="circular"
                                    style={ { margin: '59px auto' } }
                                    height={ 250 } width={ 250 }
                                /> :
                                <PieChart
                                    type={ PIE_CHART_TYPE }
                                    color={ PIE_CHART_COLOR }
                                    width={ PIE_CHART_WIDTH }
                                    label={ PIE_CHART_LABEL }
                                    series={
                                        [
                                            studentDashboardData?.trendAnalysis?.similarWork,
                                            studentDashboardData?.trendAnalysis?.ownWork
                                        ]
                                    }
                                /> }
                        </CardView>
                    </Grid>
                </Grid>
            </Box>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({
    isLoadingDashboard: state?.studentClasses?.isLoading,
    studentDashboardData: state?.studentClasses?.dashboardData,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetDashboardData: () => dispatch(GetDashboardData()),
    };
};

Dashboard.layout = Student

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
