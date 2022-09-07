import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { Skeleton } from '@mui/material';
import styled from 'styled-components';
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Student from '../../../layouts/Student'
import {
    WidgetCard,
    ColumnChart,
    PieChart,
    CardView,
    Heading,
    SubTitle,
    ErrorBlock
} from '../../../components'
import {
    GetDashboardData
} from '../../../redux/action/student/StudentAction';
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
} from './../../../constant/data/ChartData'
import {
    NoOfClassIcon,
    NoOfSubmission,
    NoOfAssignmntIcon,
} from '../../../assets/icon'
import MyRecentSubmissionTable from '../../../components/table/MyRecentSubmissionTable'
import {
    DASHBOARD_RECENT_SUBMISSION_NOT_FOUND,
    DASHBOARD_SUBMISSION_OVERVIEW_NOT_FOUND,
    TREND_ANALYSIS_NOT_FOUND
} from '../../../constant/data/ErrorMessage';

const TextAlignRight = styled.div`
    text-align: right;
    margin-top: 5px;
`;

const data = [
    {
        color: '#2B4CB0',
        name: 'Java',
        course: 'Assignment-1',
        marks: '78',
        percent: '65%',
        feedback: 'Good',
        status: 'Active',
    },
    {
        color: '#F5CB47',
        name: 'Data Science',
        course: 'Assignment-2',
        marks: '58',
        percent: '100%',
        feedback: 'Good',
        status: 'Completed',
    },
    {
        color: '#E9596F',
        name: 'Computer Science',
        course: 'Assignment-3',
        marks: '68',
        percent: '25%',
        feedback: 'Good',
        status: 'Pending',
    },
]


const Colors = ['#7B68C8', '#68C886', '#68C886', '#34C2FF', '#3491FF', '#8D34FF'];

const Dashboard = ({
    GetDashboardData,
    studentDashboardData,
    isLoadingDashboard,
}) => {
    const [submissionOverview, setSubmissionOverview] = useState([]);

    useEffect(() => {
        GetDashboardData();
    }, []);

    useEffect(() => {
        let submission = studentDashboardData?.monthlySubmissions?.map((item) => {
            return item.submissions;
        });
        setSubmissionOverview(submission);
        studentDashboardData?.recentSubmissions?.map((item, index) => {
            item['bgcolor'] = Colors[index];
        });
    }, [studentDashboardData]);

    return (
        <React.Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item md={4} xs={12}>
                        <WidgetCard
                            title='Classes'
                            isLoading={isLoadingDashboard}
                            count={studentDashboardData?.no_of_classes}
                            icon={<NoOfClassIcon />}
                        />
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <WidgetCard
                            title='Assignments'
                            isLoading={isLoadingDashboard}
                            count={studentDashboardData?.no_of_assignments}
                            icon={<NoOfAssignmntIcon />}
                        />
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <WidgetCard
                            title='Submissions'
                            isLoading={isLoadingDashboard}
                            count={studentDashboardData?.no_of_submissions}
                            icon={<NoOfSubmission />}
                        />
                    </Grid>
                </Grid>
            </Box>
            <Box mt={1} sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item md={12} xs={12}>
                        <CardView>
                            <Heading title='My Recent submissions' />
                            {isLoadingDashboard ? <Skeleton /> :
                                <>
                                    {studentDashboardData?.recentSubmissions.length > 0 ?
                                        <MyRecentSubmissionTable tableData={studentDashboardData?.recentSubmissions} />
                                        : <ErrorBlock message={DASHBOARD_RECENT_SUBMISSION_NOT_FOUND} />
                                    }

                                </>
                            }

                        </CardView>
                    </Grid>
                </Grid>
            </Box>
            <Box mt={1} sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item md={8} xs={12}>
                        <CardView>
                            <Heading title='Submissions Overview' />
                            {isLoadingDashboard ? <Skeleton /> :
                                submissionOverview?.length && studentDashboardData?.no_of_submissions > 0 ? <ColumnChart
                                    type={COLUMN_ADMIN_CHART_TYPE}
                                    color={COLUMN_ADMIN_CHART_COLOR}
                                    xaxisData={COLUMN_ADMIN_XAXIS_DATA}
                                    columnWidth={COLUMN_ADMIN_WIDTH}
                                    height={COLUMN_ADMIN_CHART_HEIGHT}
                                    seriesData={[
                                        {
                                            name: 'Submission Overview',
                                            data: submissionOverview
                                        }
                                    ]}
                                    gradient={COLUMN_ADMIN_CHART_GRADIENT}
                                    borderRadius={COLUMN_ADMIN_CHART_BORDER_RADIUS}
                                />
                                    : <ErrorBlock message={DASHBOARD_SUBMISSION_OVERVIEW_NOT_FOUND} />
                            }
                        </CardView>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <CardView>
                            <Grid container>
                                <Grid item md={12} xs={12}>
                                    <Heading title='Trend Analysis' />
                                </Grid>
                            </Grid>
                            {isLoadingDashboard ?
                                <Skeleton
                                    variant="circular"
                                    style={{ margin: '59px auto' }}
                                    height={250} width={250}
                                /> :
                                <>
                                    {studentDashboardData?.trendAnalysis?.documentsProcessed > 0 ?
                                        <>
                                            <TextAlignRight>
                                                <SubTitle
                                                    title={studentDashboardData?.trendAnalysis?.documentsProcessed + '(' + 'Submissions' + ')'}
                                                />
                                            </TextAlignRight>
                                            <PieChart
                                                type={PIE_CHART_TYPE}
                                                color={PIE_CHART_COLOR}
                                                width={PIE_CHART_WIDTH}
                                                label={PIE_CHART_LABEL}
                                                height={studentDashboardData?.trendAnalysis?.documentsProcessed === 0 ? '' : '318px'}
                                                series={
                                                    [
                                                        studentDashboardData?.trendAnalysis?.similarWork,
                                                        studentDashboardData?.trendAnalysis?.ownWork
                                                    ]
                                                }
                                            />
                                        </>
                                        : <ErrorBlock message={TREND_ANALYSIS_NOT_FOUND} />
                                    }
                                </>
                            }
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
