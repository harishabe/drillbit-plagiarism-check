import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Skeleton } from '@mui/material';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Admin from '../../../layouts/Admin';
import {
    GetWidgetCount,
    GetTopStudent,
    GetTrendAnalysis,
    RenewValidity
} from '../../../redux/action/admin/AdminAction';
import {
    Documentchart
} from '../../../redux/action/common/Dashboard/DashboardAction';
import {
    WidgetCard,
    ColumnChart,
    PieChart,
    RadialBarChart,
    CardView,
    Heading,
    ListSkeleton,
    LineChart,
    CurveChart,
    ErrorBlock,
    WarningDialog,
    EllipsisText
} from '../../../components';
import {
    NoOfClassIcon,
    NoOfSubmission,
    NoStudentIcon,
} from '../../../assets/icon';
import TopStudents from '../instructor/dashboard/TopStudents';
import {
    COLUMN_ADMIN_CHART_TYPE,
    COLUMN_ADMIN_CHART_COLOR,
    COLUMN_ADMIN_XAXIS_DATA,
    COLUMN_ADMIN_DOCUMNENT_XAXIS_DATA,
    COLUMN_ADMIN_WIDTH,
    COLUMN_ADMIN_CHART_HEIGHT,
    COLUMN_ADMIN_CHART_GRADIENT,
    COLUMN_ADMIN_CHART_BORDER_RADIUS,
    PIE_CHART_COLOR,
    PIE_CHART_LABEL,
    RADIAL_CHART_TYPE,
    RADIAL_CHART_COLOR,
    RADIAL_CHART_LABEL,
    RADIAL_CHART_HEIGHT,
} from './../../../constant/data/ChartData';
import {
    DOCUMENT_PROCESSED_NOT_FOUND,
    STUDENT_NOT_FOUND,
    TREND_ANALYSIS_NOT_FOUND
} from '../../../constant/data/ErrorMessage';
import END_POINTS from '../../../utils/EndPoints';
import { BASE_URL_EXTREM } from '../../../utils/BaseUrl';

const TextAlignRight = styled.div`
    text-align: right;
    margin-top: 5px;
`;

const CurveChartContainer = styled.div`
    position:relative;
    bottom:19px;
    margin-right:-18px;
`;

const useStyles = makeStyles((theme) => ({
    BorderColor: {
        borderBottom: '2px solid #5a9de9',
    },
}));

const Dashboard = ({
    isLoadingTopStudent,
    isLoadingDashboard,
    isLoadingTrendAnalysis,
    isLoadingRenewAccount,
    GetWidgetCount,
    Documentchart,
    adminDashboardData,
    documentTypeData,
    GetTopStudent,
    GetTrendAnalysis,
    RenewValidity
}) => {

    const classes = useStyles();
    const [recentSubmission, setRecentSubmission] = useState([]);
    const [trendAnalysisSeries, setTrendAnalysisSeries] = useState([]);
    const [showRenewWarning, setShowRenewWarning] = useState(false);

    useEffect(() => {
        GetWidgetCount(BASE_URL_EXTREM + END_POINTS.ADMIN_DASHBOARD_WIDGET);
        Documentchart(BASE_URL_EXTREM + END_POINTS.ADMIN_DASHBOARD_DOCUMENT_CHART);
        GetTopStudent();
        GetTrendAnalysis(BASE_URL_EXTREM + END_POINTS.ADMIN_TREND_ANALYSIS);
        trendAnalysisSeries.push(adminDashboardData?.trendAnalysis?.similarWork, adminDashboardData?.trendAnalysis?.ownWork);
        setTrendAnalysisSeries([...trendAnalysisSeries]);
    }, []);

    useEffect(() => {
        let submission = adminDashboardData?.data?.monthlySubmissions?.map((item) => {
            return item.submissions;
        });
        setRecentSubmission(submission);
    }, [adminDashboardData]);

    const renewalClick = (e) => {
        e.preventDefault();
        setShowRenewWarning(true);
    };

    const handleCloseWarning = () => {
        setShowRenewWarning(false);
    };

    const handleYesWarning = () => {
        RenewValidity(BASE_URL_EXTREM + END_POINTS.ADMIN_RENEW_ACCOUNT);
        setShowRenewWarning(false);
        setTimeout(() => {
            setShowRenewWarning(false);
        }, [100]);
    };

    return (
        <React.Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item md={4} xs={12}>
                        <WidgetCard
                            title='Instructors'
                            isLoading={isLoadingDashboard}
                            count={isLoadingDashboard ? '' : (adminDashboardData?.data?.instructorAccountUsage?.usedAccounts) + ' / ' + (adminDashboardData?.data?.instructorAccountUsage)?.totalAccounts}
                            icon={<NoOfClassIcon />}
                        />
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <WidgetCard
                            title='Students'
                            isLoading={isLoadingDashboard}
                            count={isLoadingDashboard ? '' : (adminDashboardData?.data?.studentAccountUsage?.usedAccounts) + ' / ' + (adminDashboardData?.data?.studentAccountUsage)?.totalAccounts}
                            icon={<NoStudentIcon />}
                        />
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <WidgetCard
                            title='Submissions'
                            isLoading={isLoadingDashboard}
                            count={isLoadingDashboard ? '' : (adminDashboardData?.data?.submissionsUsage?.usedSubmissions) + ' / ' + (adminDashboardData?.data?.submissionsUsage?.totalSubmissions)}
                            icon={<NoOfSubmission />}
                        />
                    </Grid>
                </Grid>
            </Box>
            <Box mt={1} sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item md={7} xs={12}>
                        <CardView>
                            <Heading title='Submissions Overview' />
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
            {
                showRenewWarning &&
                <WarningDialog
                    message="Are you sure you want to renew ?"
                    handleYes={handleYesWarning}
                    handleNo={handleCloseWarning}
                    isOpen={true}
                />
            }
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
                                                    graphName="No. of Submissions"
                                                    graphData={[
                                                        adminDashboardData?.topStudent?.submissionsGraph?.zeroTen,
                                                        adminDashboardData?.topStudent?.submissionsGraph?.elevenFourty,
                                                        adminDashboardData?.topStudent?.submissionsGraph?.fourtyOneSixty,
                                                        adminDashboardData?.topStudent?.submissionsGraph?.sixtyOneHundred,
                                                        adminDashboardData?.topStudent?.submissionsGraph?.docError,
                                                    ]}
                                                    xaxisLabelShow={false}
                                                    yaxisLabelShow={false}
                                                    chartHeight={142}
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
                            <Grid container>
                                <Grid item md={6.6} xs={12}>
                                    <Heading title='Account Validity' />
                                </Grid>
                                <Grid item md={5.4} xs={12}>
                                    {
                                        isLoadingDashboard ?
                                            <Skeleton /> :
                                            <TextAlignRight>
                                                <EllipsisText value={adminDashboardData?.data?.accountTotalDays + '(' + 'Total days' + ')'} charLength={12} />
                                            </TextAlignRight>
                                    }
                                </Grid>
                            </Grid>
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
                                        label={ [RADIAL_CHART_LABEL] }
                                        labelData={ [adminDashboardData?.data?.accountValidityDays] }
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
                                <Grid item md={6.6} xs={12}>
                                    <Heading title='Trend Analysis' />
                                </Grid>
                                <Grid item md={5.4} xs={12}>
                                    {
                                        isLoadingDashboard ?
                                            <Skeleton /> :
                                            <TextAlignRight>
                                                <EllipsisText value={adminDashboardData?.trendAnalysis?.documentsProcessed + '(' + 'Submissions' + ')'} charLength={12} />
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
                                            height={322}
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
                <Box mt={ 1 } sx={ { flexGrow: 1 } }>
                    <Grid container spacing={ 1 }>
                        <Grid item md={ 12 } xs={ 12 }>
                            <CardView>
                                <Heading title='Document Type' />
                                { isLoadingDashboard ? <Skeleton /> :
                                    documentTypeData ? <ColumnChart
                                        type={ COLUMN_ADMIN_CHART_TYPE }
                                        color={ COLUMN_ADMIN_CHART_COLOR }
                                        xaxisData={ COLUMN_ADMIN_DOCUMNENT_XAXIS_DATA }
                                        columnWidth={ '30%' }
                                        height={ 355 }
                                        seriesData={ [
                                            {
                                                name: 'Document Processed',
                                                data: [
                                                    documentTypeData?.article,
                                                    documentTypeData?.analytical_or_business_report,
                                                    documentTypeData?.assignment,
                                                    documentTypeData?.blogs,
                                                    documentTypeData?.chapter_in_books,
                                                    documentTypeData?.dissertation,
                                                    documentTypeData?.eBook,
                                                    documentTypeData?.others,
                                                    documentTypeData?.project_work,
                                                    documentTypeData?.research_paper,
                                                    documentTypeData?.synopsis,
                                                    documentTypeData?.thesis,
                                                    documentTypeData?.web_page,
                                                ]
                                            }
                                        ] }
                                        gradient={ COLUMN_ADMIN_CHART_GRADIENT }
                                        borderRadius={ COLUMN_ADMIN_CHART_BORDER_RADIUS }
                                    />
                                        : <ErrorBlock message={ DOCUMENT_PROCESSED_NOT_FOUND } />
                                }
                            </CardView>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => ({
    isLoadingTopStudent: state?.adminDashboard?.isLoadingTopStudent,
    adminDashboardData: state?.adminDashboard,
    documentTypeData: state?.documentChart?.DocumentTypeData,
    isLoadingDashboard: state?.adminDashboard?.isLoadingDashboard,
    isLoadingTrendAnalysis: state?.adminDashboard?.isLoadingTrendAnalysis,
    isLoadingRenewAccount: state?.adminDashboard?.isLoadingRenewAccount,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetWidgetCount: (url) => dispatch(GetWidgetCount(url)),
        Documentchart: (url) => dispatch(Documentchart(url)),
        GetTopStudent: () => dispatch(GetTopStudent()),
        GetTrendAnalysis: (url) => dispatch(GetTrendAnalysis(url)),
        RenewValidity: (url) => dispatch(RenewValidity(url)),
    };
};

Dashboard.layout = Admin;

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
