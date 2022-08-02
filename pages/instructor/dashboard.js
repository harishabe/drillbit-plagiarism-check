import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import styled from 'styled-components';
import { Skeleton } from '@mui/material';
import Instructor from '../../layouts/Instructor';
import { GetWidgetCount } from '../../redux/action/instructor/InstructorAction';
import {
    WidgetCard,
    ColumnChart,
    PieChart,
    CardView,
    Heading,
    SubTitle,
    ListSkeleton,
    ErrorBlock,
    // RecentSubmissionTable
} from '../../components';
import {
    NoOfClassIcon,
    NoOfSubmission,
    NoOfAssignmntIcon,
} from '../../assets/icon';
import TopStudents from './dashboard/TopStudents';
import RecentSubmissions from './dashboard/RecentSubmissions';
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
} from './../../constant/data/ChartData';
import { setItemLocalStorage, getItemLocalStorage } from '../../utils/RegExp';

import {
    STUDENT_NOT_FOUND,
    DASHBOARD_RECENT_SUBMISSION_NOT_FOUND,
    DASHBOARD_SUBMISSION_OVERVIEW_NOT_FOUND,
    TREND_ANALYSIS_NOT_FOUND
} from '../../constant/data/ErrorMessage';


const TextAlignRight = styled.div`
    text-align: right;
    margin-top: 5px;
`;

const Dashboard = ({
    GetWidgetCount,
    instructorDashboardData,
    isLoading
}) => {

    const [recentSubmission, setRecentSubmission] = useState([]);

    useEffect(() => {
        GetWidgetCount();
    }, []);

    useEffect(() => {
        let submission = instructorDashboardData?.data?.monthlySubmissions?.map((item) => {
            return item.submissions;
        });
        setRecentSubmission(submission);
        setItemLocalStorage('name', instructorDashboardData?.data?.userProfileLite?.name);
    }, [instructorDashboardData]);

    return (
        <React.Fragment>
            <Box sx={ { flexGrow: 1 } }>
                <Grid container spacing={ 1 }>
                    <Grid item md={ 4 } xs={ 12 }>
                        <WidgetCard
                            title='No of classes'
                            isLoading={ isLoading }
                            count={ isLoading ? '' : instructorDashboardData?.data?.no_of_classes }
                            icon={ <NoOfClassIcon /> }
                        />
                    </Grid>
                    <Grid item md={ 4 } xs={ 12 }>
                        <WidgetCard
                            title='No of assignments'
                            isLoading={ isLoading }
                            count={ isLoading ? '' : instructorDashboardData?.data?.no_of_assignments }
                            icon={ <NoOfAssignmntIcon /> }
                        />
                    </Grid>
                    <Grid item md={ 4 } xs={ 12 }>
                        <WidgetCard
                            title='No of submissions'
                            isLoading={ isLoading }
                            count={ isLoading ? '' : instructorDashboardData?.data?.no_of_submissions }
                            icon={ <NoOfSubmission /> }
                        />
                    </Grid>
                </Grid>
            </Box>
            <Box mt={ 1 } sx={ { flexGrow: 1 } }>
                <Grid container spacing={ 1 }>
                    <Grid item md={ 4 } xs={ 12 }>
                        <CardView height={ instructorDashboardData?.data?.top_students?.students?.length === 0 ? '' : '443px' }>
                            <Heading title='Top Students' />
                            { isLoading ?
                                <>
                                    <ListSkeleton />
                                    <ListSkeleton />
                                    <ListSkeleton />
                                    <ListSkeleton />
                                </> :
                                <>
                                    { instructorDashboardData?.data?.top_students?.students?.length > 0 ?
                                        <TopStudents topStudentData={ instructorDashboardData?.data?.top_students?.students } />
                                        : <ErrorBlock message={ STUDENT_NOT_FOUND } /> }
                                </>
                            }
                        </CardView>
                    </Grid>
                    <Grid item md={ 8 } xs={ 12 }>
                        <CardView height={ instructorDashboardData?.data?.recent_submissions?.length === 0 ? '' : '443px' }>
                            <Heading title='Recent Submissions' />
                            { isLoading ?
                                <>
                                    <ListSkeleton />
                                    <ListSkeleton />
                                    <ListSkeleton />
                                    <ListSkeleton />
                                </> :
                                <>
                                    { instructorDashboardData?.data?.recent_submissions?.length > 0 ?
                                        <RecentSubmissions recentSubmission={ instructorDashboardData?.data?.recent_submissions } />
                                        : <ErrorBlock message={ DASHBOARD_RECENT_SUBMISSION_NOT_FOUND } /> }

                                </>
                            }
                        </CardView>
                    </Grid>
                </Grid>
            </Box>
            <Box mt={ 1 } sx={ { flexGrow: 1 } }>
                <Grid container spacing={ 1 }>
                    <Grid item md={ 8 } xs={ 12 }>
                        <CardView height={ instructorDashboardData?.data?.no_of_submissions === 0 ? '' : '443px' }>
                            <Heading title='Submission Overview' />
                            { isLoading ? <Skeleton /> :
                                instructorDashboardData?.data?.no_of_submissions > 0 ? <ColumnChart
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
                                />
                                    :
                                    <ErrorBlock message={ DASHBOARD_SUBMISSION_OVERVIEW_NOT_FOUND } />
                            }
                        </CardView>
                    </Grid>
                    <Grid item md={ 4 } xs={ 12 }>
                        <CardView>
                            <Grid container>
                                <Grid item md={ 9 } xs={ 12 }>
                                    <Heading title='Trend Analysis' />
                                </Grid>
                                <Grid item md={ 3 } xs={ 12 }>
                                    <TextAlignRight>
                                        <Heading title={ instructorDashboardData?.data?.trendAnalysis?.documentsProcessed } />
                                    </TextAlignRight>
                                </Grid>
                            </Grid>
                            { isLoading ? <Skeleton />
                                : <>
                                    { instructorDashboardData?.data?.trendAnalysis?.documentsProcessed ?
                                        <PieChart
                                            type="donut"
                                            height={ instructorDashboardData?.data?.trendAnalysis?.documentsProcessed === 0 ? '' : '443px' }
                                            color={ PIE_CHART_COLOR }
                                            width={ PIE_CHART_WIDTH }
                                            label={ PIE_CHART_LABEL }
                                            series={
                                                [
                                                    instructorDashboardData?.data?.trendAnalysis?.similarWork,
                                                    instructorDashboardData?.data?.trendAnalysis?.ownWork
                                                ]
                                            }
                                        />
                                        : <ErrorBlock message={ TREND_ANALYSIS_NOT_FOUND } />
                                    }
                                </>
                            }

                        </CardView>
                    </Grid>
                </Grid>
            </Box>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => ({
    instructorDashboardData: state?.instructorDashboard,
    isLoading: state?.instructorDashboard?.isLoading,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetWidgetCount: () => dispatch(GetWidgetCount()),
    };
};

Dashboard.layout = Instructor;

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
