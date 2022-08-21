import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Typography from '@mui/material/Typography'
import { makeStyles } from '@mui/styles'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Admin from '../../layouts/Admin';
import {
    GetWidgetCount,
    GetTopStudent,
    GetTrendAnalysis,
    RenewValidity
} from '../../redux/action/admin/AdminAction';
import {
    WidgetCard,
    ColumnChart,
    PieChart,
    UsageChart,
    RadialBarChart,
    CardView,
    Heading,
    SubTitle,
    ListSkeleton,
    LineChart,
    CurveChart,
    ErrorBlock
} from '../../components';
import {
    NoOfClassIcon,
    NoOfSubmission,
    NoStudentIcon,
} from '../../assets/icon';
import TopStudents from '../instructor/dashboard/TopStudents';
import {
    COLUMN_ADMIN_CHART_TYPE,
    COLUMN_ADMIN_CHART_COLOR,
    COLUMN_ADMIN_XAXIS_DATA,
    COLUMN_ADMIN_WIDTH,
    COLUMN_ADMIN_CHART_HEIGHT,
    COLUMN_ADMIN_CHART_GRADIENT,
    COLUMN_ADMIN_CHART_BORDER_RADIUS,
    PIE_CHART_COLOR,
    PIE_CHART_WIDTH,
    PIE_CHART_LABEL,
    RADIAL_CHART_TYPE,
    RADIAL_CHART_COLOR,
    RADIAL_CHART_LABEL,
    RADIAL_CHART_HEIGHT,
    USAGE_CHART_DATA,
} from './../../constant/data/ChartData';
import { Skeleton } from '@mui/material';
import { setItemLocalStorage, getItemLocalStorage } from '../../utils/RegExp';
import {
    DOCUMENT_PROCESSED_NOT_FOUND,
    STUDENT_NOT_FOUND,
    TREND_ANALYSIS_NOT_FOUND
} from '../../constant/data/ErrorMessage';

const InLineText = styled.span`
    display: inline-flex;
`;

const SubTitleMargin = styled.div`
    margin-top: 4px;
    margin-left: 10px;
`;

const TextAlignRight = styled.div`
    text-align: right;
    margin-top: 5px;
`;

const CurveChartContainer = styled.div`
    position:relative;
    bottom:60px;
    margin-right:-27px;
`;

const useStyles = makeStyles((theme) => ({
    BorderColor: {
        borderBottom: '2px solid #5a9de9',
    },
}))

const Dashboard = ({
    isLoadingTopStudent,
    isLoadingDashboard,
    isLoadingTrendAnalysis,
    isLoadingRenewAccount,
    GetWidgetCount,
    adminDashboardData,
    GetTopStudent,
    GetTrendAnalysis,
    RenewValidity
}) => {

    const classes = useStyles()
    const [recentSubmission, setRecentSubmission] = useState([]);
    const [trendAnalysisSeries, setTrendAnalysisSeries] = useState([]);

    useEffect(() => {
        GetWidgetCount();
        GetTopStudent();
        GetTrendAnalysis();
        trendAnalysisSeries.push(adminDashboardData?.trendAnalysis?.similarWork, adminDashboardData?.trendAnalysis?.ownWork)
        setTrendAnalysisSeries([...trendAnalysisSeries]);
    }, []);

    useEffect(() => {
        let submission = adminDashboardData?.data?.monthlySubmissions?.map((item) => {
            return item.submissions;
        });
        setRecentSubmission(submission);
        setItemLocalStorage('name', adminDashboardData?.data?.userProfileLite?.name);
    }, [adminDashboardData]);

    const renewalClick = (e) => {
        e.preventDefault();
        RenewValidity();
    };

    return (
        <React.Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item md={4} xs={12}>
                        <WidgetCard
                            title='Instructors'
                            isLoading={isLoadingDashboard}
                            count={isLoadingDashboard ? '' : (adminDashboardData?.data?.instructorAccountUsage?.usedAccounts) + " / " + (adminDashboardData?.data?.instructorAccountUsage)?.totalAccounts}
                            icon={<NoOfClassIcon />}
                        />
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <WidgetCard
                            title='Students'
                            isLoading={isLoadingDashboard}
                            count={isLoadingDashboard ? '' : (adminDashboardData?.data?.studentAccountUsage?.usedAccounts) + " / " + (adminDashboardData?.data?.studentAccountUsage)?.totalAccounts}
                            icon={<NoStudentIcon />}
                        />
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <WidgetCard
                            title='Submissions'
                            isLoading={isLoadingDashboard}
                            count={isLoadingDashboard ? '' : (adminDashboardData?.data?.submissionsUsage?.usedSubmissions) + " / " + (adminDashboardData?.data?.submissionsUsage?.totalSubmissions)}
                            icon={<NoOfSubmission />}
                        />
                    </Grid>
                </Grid>
            </Box>
            <Box mt={1} sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item md={7} xs={12}>
                        <CardView>
                            <Heading title='Submissions' />
                            {isLoadingDashboard ? <Skeleton /> :
                                recentSubmission?.length && adminDashboardData?.data?.submissionsUsage?.usedSubmissions > 0 ? <ColumnChart
                                    type={COLUMN_ADMIN_CHART_TYPE}
                                    color={COLUMN_ADMIN_CHART_COLOR}
                                    xaxisData={COLUMN_ADMIN_XAXIS_DATA}
                                    columnWidth={COLUMN_ADMIN_WIDTH}
                                    height={COLUMN_ADMIN_CHART_HEIGHT}
                                    seriesData={[
                                        {
                                            name: 'Document Processed',
                                            data: recentSubmission
                                        }
                                    ]}
                                    gradient={COLUMN_ADMIN_CHART_GRADIENT}
                                    borderRadius={COLUMN_ADMIN_CHART_BORDER_RADIUS}
                                />
                                    : <ErrorBlock message={DOCUMENT_PROCESSED_NOT_FOUND} />
                            }
                        </CardView>
                    </Grid>
                    <Grid item md={5} xs={12}>
                        <CardView>
                            <Heading
                                title='Similarity Ranges'
                            />
                            {isLoadingDashboard ?
                                <>
                                    <Skeleton />
                                </> :
                                <LineChart
                                    chartType="line"
                                    graphName="File Submission"
                                    graphData={[
                                        0,
                                        adminDashboardData?.data?.submissionsGraph?.zeroTen,
                                        adminDashboardData?.data?.submissionsGraph?.elevenFourty,
                                        adminDashboardData?.data?.submissionsGraph?.fourtyOneSixty,
                                        adminDashboardData?.data?.submissionsGraph?.sixtyOneHundred,
                                        adminDashboardData?.data?.submissionsGraph?.docError,
                                    ]}
                                    strokeCurve="straight"
                                    xaxisLabelShow={true}
                                    yaxisLabelShow={true}
                                    chartHeight={350}
                                />
                            }
                        </CardView>
                    </Grid>
                </Grid>
            </Box>
            <Box mt={1} sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item md={4} xs={12}>
                        <CardView height="443px">
                            <Heading title='Top Students' />
                            {isLoadingTopStudent ?
                                <>
                                    <ListSkeleton />
                                    <ListSkeleton />
                                    <ListSkeleton />
                                    <ListSkeleton />
                                </> :
                                <>
                                    {adminDashboardData?.topStudent?.students?.length > 0 ?
                                        <>
                                            <TopStudents
                                                topStudentData={adminDashboardData?.topStudent?.students}
                                            />
                                            <CurveChartContainer>
                                                <CurveChart
                                                    chartType="area"
                                                    strokeCurve="smooth"
                                                    graphName="No. students"
                                                    graphData={[
                                                        0,
                                                        adminDashboardData?.topStudent?.submissionsGraph?.zeroTen,
                                                        adminDashboardData?.topStudent?.submissionsGraph?.elevenFourty,
                                                        adminDashboardData?.topStudent?.submissionsGraph?.fourtyOneSixty,
                                                        adminDashboardData?.topStudent?.submissionsGraph?.sixtyOneHundred,
                                                        adminDashboardData?.topStudent?.submissionsGraph?.docError,
                                                    ]}
                                                    xaxisLabelShow={false}
                                                    yaxisLabelShow={false}
                                                    chartHeight={190}
                                                />
                                            </CurveChartContainer>
                                        </>
                                        : <ErrorBlock message={STUDENT_NOT_FOUND} />
                                    }
                                </>
                            }
                        </CardView>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <CardView>
                            <InLineText>
                                <Heading title='Account Validity' />
                                <SubTitleMargin>
                                    <SubTitle title='(In days)' />
                                </SubTitleMargin>
                            </InLineText>
                            {isLoadingDashboard ?
                                <Skeleton
                                    variant="circular"
                                    style={{ margin: '58px auto' }}
                                    height={250}
                                    width={250}
                                /> :
                                <>
                                    <RadialBarChart
                                        type={RADIAL_CHART_TYPE}
                                        color={RADIAL_CHART_COLOR}
                                        height={RADIAL_CHART_HEIGHT}
                                        label={[RADIAL_CHART_LABEL + adminDashboardData?.data?.accountValidityDays]}
                                        series={[adminDashboardData?.data?.accountValidityPercentage.toFixed(2)]}
                                    />
                                    {isLoadingRenewAccount ? <Skeleton /> :
                                        <Typography variant="h4" component="div" gutterBottom>
                                            <a className={classes.BorderColor} href='' onClick={renewalClick} >
                                                Renew your account
                                            </a>
                                        </Typography>
                                    }
                                </>
                            }
                        </CardView>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <CardView>
                            <Grid container>
                                <Grid item md={7} xs={12}>
                                    <Heading title='Trend Analysis' />
                                </Grid>
                                <Grid item md={5} xs={12}>
                                    {
                                        isLoadingTrendAnalysis ?
                                            <Skeleton /> :
                                            <TextAlignRight>
                                                <SubTitle
                                                    title={adminDashboardData?.trendAnalysis?.documentsProcessed + '(' + 'Submissions' + ')'}
                                                />
                                            </TextAlignRight>
                                    }
                                </Grid>
                            </Grid>
                            {isLoadingTrendAnalysis ?
                                <Skeleton
                                    variant="circular"
                                    style={{ margin: '59px auto' }}
                                    height={250} width={250}
                                /> :
                                <>
                                    {adminDashboardData?.trendAnalysis?.documentsProcessed > 0 ?
                                        <PieChart
                                            type="donut"
                                            color={PIE_CHART_COLOR}
                                            height={320}
                                            label={PIE_CHART_LABEL}
                                            series={
                                                [
                                                    adminDashboardData?.trendAnalysis?.similarWork,
                                                    adminDashboardData?.trendAnalysis?.ownWork
                                                ]
                                            }
                                        />
                                        : <ErrorBlock message={TREND_ANALYSIS_NOT_FOUND} />
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
    isLoadingTopStudent: state?.adminDashboard?.isLoadingTopStudent,
    adminDashboardData: state?.adminDashboard,
    isLoadingDashboard: state?.adminDashboard?.isLoadingDashboard,
    isLoadingTrendAnalysis: state?.adminDashboard?.isLoadingTrendAnalysis,
    isLoadingRenewAccount: state?.adminDashboard?.isLoadingRenewAccount,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetWidgetCount: () => dispatch(GetWidgetCount()),
        GetTopStudent: () => dispatch(GetTopStudent()),
        GetTrendAnalysis: () => dispatch(GetTrendAnalysis()),
        RenewValidity: () => dispatch(RenewValidity()),
    };
};

Dashboard.layout = Admin;

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
