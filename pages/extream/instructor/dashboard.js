import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import styled from 'styled-components';
import { Skeleton } from '@mui/material';
import Instructor from '../../../layouts/Instructor';
import {
    GetWidgetCount,
    GetTopStudent
} from '../../../redux/action/instructor/InstructorAction';
import {
    Documentchart
} from '../../../redux/action/common/Dashboard/DashboardAction';
import {
    WidgetCard,
    ColumnChart,
    PieChart,
    CardView,
    Heading,
    ListSkeleton,
    ErrorBlock,
    CurveChart,
    EllipsisText
} from '../../../components';
import {
    NoOfClassIcon,
    NoOfSubmission,
    NoOfAssignmntIcon,
    NoStudentIcon
} from '../../../assets/icon';
import TopStudents from './dashboard/TopStudents';
import RecentSubmissions from './dashboard/RecentSubmissions';
import {
    COLUMN_ADMIN_CHART_TYPE,
    COLUMN_ADMIN_CHART_COLOR,
    COLUMN_ADMIN_XAXIS_DATA,
    COLUMN_ADMIN_DOCUMNENT_XAXIS_DATA,
    COLUMN_ADMIN_WIDTH,
    COLUMN_ADMIN_CHART_GRADIENT,
    COLUMN_ADMIN_CHART_BORDER_RADIUS,
    PIE_CHART_COLOR,
    PIE_CHART_WIDTH,
    PIE_CHART_LABEL,
} from './../../../constant/data/ChartData';
import {
    STUDENT_NOT_FOUND,
    DASHBOARD_RECENT_SUBMISSION_NOT_FOUND,
    DASHBOARD_SUBMISSION_OVERVIEW_NOT_FOUND,
    TREND_ANALYSIS_NOT_FOUND
} from '../../../constant/data/ErrorMessage';
import { BASE_URL_EXTREM } from '../../../utils/BaseUrl';
import END_POINTS from '../../../utils/EndPoints';


const TextAlignRight = styled.div`
    text-align: right;
    marginTop: 4px;
`;

const CurveChartContainer = styled.div`
    position:relative;
    bottom:19px;
    margin-right:-18px;
`;

const Dashboard = ({
    Documentchart,
    GetWidgetCount,
    GetTopStudent,
    instructorDashboardData,
    documentTypeData,
    isLoading,
    isLoadingTopStudent
}) => {

    const router = useRouter();

    const [recentSubmission, setRecentSubmission] = useState([]);

    useEffect(() => {
        GetWidgetCount(BASE_URL_EXTREM + END_POINTS.INSTRUCTOR_DASHBOARD_WIDGET);
        Documentchart(BASE_URL_EXTREM + END_POINTS.INSTRUCTOR_DASHBOARD_DOCUMENT_CHART);
        GetTopStudent();
    }, []);

    useEffect(() => {
        let submission = instructorDashboardData?.data?.monthlySubmissions?.map((item) => {
            return item.submissions;
        });
        setRecentSubmission(submission);
    }, [instructorDashboardData]);

    const handlePage = (e, item) => {
        router.push({ pathname: '/extream/instructor/mysubmissions', query: { isAssignment: true, clasId: item?.class_id, assId: item?.ass_id, clasName: item?.class_name, assName: item?.assignment_name } });
    };

    return (
        <React.Fragment>
            <Box sx={ { flexGrow: 1 } }>
                <Grid container spacing={ 1 }>
                    <Grid item md={ 3 } xs={ 12 }>
                        <WidgetCard
                            title='Classes'
                            isLoading={ isLoading }
                            count={ instructorDashboardData?.data?.no_of_classes }
                            icon={ <NoOfClassIcon /> }
                        />
                    </Grid>
                    <Grid item md={ 3 } xs={ 12 }>
                        <WidgetCard
                            title='Assignments'
                            isLoading={ isLoading }
                            count={ instructorDashboardData?.data?.no_of_assignments }
                            icon={ <NoOfAssignmntIcon /> }
                        />
                    </Grid>
                    <Grid item md={ 3 } xs={ 12 }>
                        <WidgetCard
                            title='Students'
                            isLoading={ isLoading }
                            count={ instructorDashboardData?.data?.studentAccountUsage?.usedAccounts !== undefined && instructorDashboardData?.data?.studentAccountUsage?.usedAccounts + ' / ' + instructorDashboardData?.data?.studentAccountUsage?.totalAccounts }
                            icon={ <NoStudentIcon /> }
                        />
                    </Grid>
                    <Grid item md={ 3 } xs={ 12 }>
                        <WidgetCard
                            title='Submissions'
                            isLoading={ isLoading }
                            count={ instructorDashboardData?.data?.submissionsUsage?.usedSubmissions !== undefined && instructorDashboardData?.data?.submissionsUsage?.usedSubmissions + ' / ' + instructorDashboardData?.data?.submissionsUsage?.totalSubmissions }
                            icon={ <NoOfSubmission /> }
                        />
                    </Grid>
                </Grid>
            </Box>
            <Box mt={ 1 } sx={ { flexGrow: 1 } }>
                <Grid container spacing={ 1 }>
                    <Grid item md={ 4 } xs={ 12 }>
                        <CardView
                            height={ instructorDashboardData?.topStudent?.students?.length > 0 && '440px' }
                        >
                            <Heading title='Top Students' />
                            { isLoadingTopStudent ?
                                <>
                                    <ListSkeleton />
                                    <ListSkeleton />
                                    <ListSkeleton />
                                    <ListSkeleton />
                                </> :
                                <>
                                    { instructorDashboardData?.topStudent?.students?.length > 0 ?
                                        <>
                                            <TopStudents topStudentData={ instructorDashboardData?.topStudent?.students }
                                            />
                                            <CurveChartContainer>
                                                <CurveChart
                                                    chartType="area"
                                                    strokeCurve="smooth"
                                                    graphName="No. students"
                                                    filename='Top Students'
                                                    graphData={ [
                                                        instructorDashboardData?.topStudent?.submissionsGraph?.zeroTen,
                                                        instructorDashboardData?.topStudent?.submissionsGraph?.elevenFourty,
                                                        instructorDashboardData?.topStudent?.submissionsGraph?.fourtyOneSixty,
                                                        instructorDashboardData?.topStudent?.submissionsGraph?.sixtyOneHundred,
                                                        instructorDashboardData?.topStudent?.submissionsGraph?.docError,
                                                    ] }
                                                    xaxisLabelShow={ false }
                                                    yaxisLabelShow={ false }
                                                    chartHeight={ 142 }
                                                />
                                            </CurveChartContainer>
                                        </>
                                        : <ErrorBlock message={ STUDENT_NOT_FOUND } /> }
                                </>
                            }
                        </CardView>
                    </Grid>
                    <Grid item md={ 8 } xs={ 12 }>
                        <CardView
                            height={ instructorDashboardData?.data?.recent_submissions?.length > 0 && '440px' }
                        >
                            <Grid container spacing={ 1 }>
                                <Grid item md={ 10 } xs={ 12 }>
                                    <Heading title='Recent Submissions' />
                                </Grid>
                            </Grid>

                            { isLoading ?
                                <>
                                    <ListSkeleton />
                                    <ListSkeleton />
                                    <ListSkeleton />
                                    <ListSkeleton />
                                </> :
                                <>
                                    { instructorDashboardData?.data?.recent_submissions?.length > 0 ?
                                        <RecentSubmissions
                                            recentSubmission={ instructorDashboardData?.data?.recent_submissions }
                                            handlePage={ handlePage }
                                        />
                                        : <ErrorBlock message={ DASHBOARD_RECENT_SUBMISSION_NOT_FOUND } />
                                    }

                                </>
                            }
                        </CardView>
                    </Grid>
                </Grid>
            </Box>
            <Box mt={ 1 } sx={ { flexGrow: 1 } }>
                <Grid container spacing={ 1 }>
                    <Grid item md={ 8 } xs={ 12 }>
                        <CardView
                            height={ instructorDashboardData?.data?.no_of_submissions > 0 && '443px' }
                        >
                            <Heading title='Submissions Overview' />
                            { isLoading ? <Skeleton /> :
                                recentSubmission?.length && instructorDashboardData?.data?.submissionsUsage?.usedSubmissions > 0 ? <ColumnChart
                                    type={ COLUMN_ADMIN_CHART_TYPE }
                                    color={ COLUMN_ADMIN_CHART_COLOR }
                                    xaxisData={ COLUMN_ADMIN_XAXIS_DATA }
                                    columnWidth={ COLUMN_ADMIN_WIDTH }
                                    height={ 380 }
                                    seriesData={ [
                                        {
                                            name: 'Submission Overview',
                                            data: recentSubmission
                                        }
                                    ] }
                                    gradient={ COLUMN_ADMIN_CHART_GRADIENT }
                                    borderRadius={ COLUMN_ADMIN_CHART_BORDER_RADIUS }
                                    filename='Submission Overview'
                                />
                                    :
                                    <ErrorBlock message={ DASHBOARD_SUBMISSION_OVERVIEW_NOT_FOUND } />
                            }
                        </CardView>
                    </Grid>
                    <Grid item md={ 4 } xs={ 12 }>
                        <CardView
                            height={ instructorDashboardData?.data?.no_of_submissions > 0 && '443px' }
                        >
                            <Grid container>
                                <Grid item md={ 6.6 } xs={ 12 }>
                                    <Heading title='Trend Analysis' />
                                </Grid>
                                <Grid item md={ 5.4 } xs={ 12 }>
                                    {
                                        isLoading ?
                                            <Skeleton /> :
                                            <TextAlignRight>
                                                <EllipsisText value={ instructorDashboardData?.data?.trendAnalysis?.documentsProcessed === undefined ? '0' : instructorDashboardData?.data?.trendAnalysis?.documentsProcessed + '(' + 'Submissions' + ')' } charLength={ 10 } />
                                            </TextAlignRight>
                                    }
                                </Grid>
                            </Grid>
                            { isLoading ?
                                <Skeleton
                                    variant="circular"
                                    style={ { margin: '58px auto' } }
                                    height={ 250 }
                                    width={ 250 }
                                />
                                : <>
                                    { instructorDashboardData?.data?.trendAnalysis?.documentsProcessed ?
                                        <>
                                            {/* <TextAlignRight>
                                                <SubTitle title={ instructorDashboardData?.data?.trendAnalysis?.documentsProcessed + '(' + 'Submissions' + ')' } />
                                            </TextAlignRight> */}
                                            <PieChart
                                                type="donut"
                                                filename='Trend Analysis'
                                                height={ instructorDashboardData?.data?.trendAnalysis?.documentsProcessed === 0 ? '' : '347px' }
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
                                        </>
                                        : <ErrorBlock message={ TREND_ANALYSIS_NOT_FOUND } />
                                    }
                                </>
                            }

                        </CardView>
                    </Grid>
                </Grid>
            </Box>
            <Box mt={ 1 } sx={ { flexGrow: 1 } }>
                <Grid container spacing={ 1 }>
                    <Grid item md={ 8 } xs={ 12 }>
                        <CardView>
                            <Heading title='Document Type' />
                            { isLoading ? <Skeleton /> :
                                documentTypeData ?
                                    <PieChart
                                        type="pie"
                                        filename='Document Type'
                                        height={ 325 }
                                        label={ COLUMN_ADMIN_DOCUMNENT_XAXIS_DATA }
                                        series={ Object.values(documentTypeData) }
                                    />
                                    : <ErrorBlock message={ DASHBOARD_SUBMISSION_OVERVIEW_NOT_FOUND } />
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
    documentTypeData: state?.documentChart?.DocumentTypeData,
    isLoading: state?.instructorDashboard?.isLoading,
    isLoadingTopStudent: state?.instructorDashboard?.isLoadingTopStudent,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetWidgetCount: (url) => dispatch(GetWidgetCount(url)),
        Documentchart: (url) => dispatch(Documentchart(url)),
        GetTopStudent: () => dispatch(GetTopStudent()),
    };
};

Dashboard.layout = Instructor;

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
