import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Skeleton } from '@mui/material';
import Typography from '@mui/material/Typography'
import { makeStyles } from '@mui/styles'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ProAdmin from './../../../layouts/ProAdmin';
import {
    GetWidgetCount,
    GetTrendAnalysis,
    RenewValidity
} from '../../../redux/action/admin/AdminAction';
import {
    WidgetCard,
    ColumnChart,
    PieChart,
    RadialBarChart,
    CardView,
    Heading,
    SubTitle,
    LineChart,
    ErrorBlock,
    WarningDialog
} from '../../../components';
import {
    NoOfSubmission,
    NoStudentIcon,
} from '../../../assets/icon';
import {
    COLUMN_ADMIN_CHART_TYPE,
    COLUMN_ADMIN_CHART_COLOR,
    COLUMN_ADMIN_XAXIS_DATA,
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
    TREND_ANALYSIS_NOT_FOUND
} from '../../../constant/data/ErrorMessage';
import END_POINTS_PRO from '../../../utils/EndPointPro';
import { BASE_URL_PRO } from '../../../utils/BaseUrl';

const TextAlignRight = styled.div`
    text-align: right;
    margin-top: 5px;
`;

const useStyles = makeStyles((theme) => ({
    BorderColor: {
        borderBottom: '2px solid #5a9de9',
    },
}))

const Dashboard = ({
    isLoadingDashboard,
    isLoadingTrendAnalysis,
    isLoadingRenewAccount,
    GetWidgetCount,
    adminDashboardData,
    GetTrendAnalysis,
    RenewValidity
}) => {

    const classes = useStyles()
    const [recentSubmission, setRecentSubmission] = useState([]);
    const [trendAnalysisSeries, setTrendAnalysisSeries] = useState([]);
    const [showRenewWarning, setShowRenewWarning] = useState(false);

    useEffect(() => {
        GetWidgetCount(BASE_URL_PRO + END_POINTS_PRO.ADMIN_DASHBOARD_WIDGET);
        GetTrendAnalysis(BASE_URL_PRO + END_POINTS_PRO.ADMIN_TREND_ANALYSIS);
        trendAnalysisSeries.push(adminDashboardData?.trendAnalysis?.similarWork, adminDashboardData?.trendAnalysis?.ownWork)
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
        RenewValidity(BASE_URL_PRO + END_POINTS_PRO.ADMIN_RENEW_ACCOUNT);
        setShowRenewWarning(false);
        setTimeout(() => {
            setShowRenewWarning(false);
        }, [100]);
    };
    return (
        <React.Fragment>
            <Box sx={ { flexGrow: 1 } }>
                <Grid container spacing={ 1 }>
                    <Grid item md={ 6 } xs={ 12 }>
                        <WidgetCard
                            title='Users'
                            isLoading={ isLoadingDashboard }
                            count={ isLoadingDashboard ? '' : (adminDashboardData?.data?.userAccountUsage?.usedAccounts) + " / " + (adminDashboardData?.data?.userAccountUsage)?.totalAccounts }
                            icon={ <NoStudentIcon /> }
                        />
                    </Grid>
                    <Grid item md={ 6 } xs={ 12 }>
                        <WidgetCard
                            title='Submissions'
                            isLoading={ isLoadingDashboard }
                            count={ isLoadingDashboard ? '' : (adminDashboardData?.data?.submissionsUsage?.usedSubmissions) + " / " + (adminDashboardData?.data?.submissionsUsage?.totalSubmissions) }
                            icon={ <NoOfSubmission /> }
                        />
                    </Grid>
                </Grid>
            </Box>
            <Box mt={ 1 } sx={ { flexGrow: 1 } }>
                <Grid container spacing={ 1 }>
                    <Grid item md={ 7 } xs={ 12 }>
                        <CardView>
                            <Heading title='Submissions Overview' />
                            { isLoadingDashboard ? <Skeleton /> :
                                recentSubmission?.length && adminDashboardData?.data?.submissionsUsage?.usedSubmissions > 0 ? <ColumnChart
                                    type={ COLUMN_ADMIN_CHART_TYPE }
                                    color={ COLUMN_ADMIN_CHART_COLOR }
                                    xaxisData={ COLUMN_ADMIN_XAXIS_DATA }
                                    columnWidth={ COLUMN_ADMIN_WIDTH }
                                    height={ COLUMN_ADMIN_CHART_HEIGHT }
                                    seriesData={ [
                                        {
                                            name: 'Document Processed',
                                            data: recentSubmission
                                        }
                                    ] }
                                    gradient={ COLUMN_ADMIN_CHART_GRADIENT }
                                    borderRadius={ COLUMN_ADMIN_CHART_BORDER_RADIUS }
                                />
                                    : <ErrorBlock message={ DOCUMENT_PROCESSED_NOT_FOUND } />
                            }
                        </CardView>
                    </Grid>
                    <Grid item md={ 5 } xs={ 12 }>
                        <CardView>
                            <Heading
                                title='Similarity Ranges'
                            />
                            { isLoadingDashboard ?
                                <>
                                    <Skeleton />
                                </> :
                                <LineChart
                                    chartType="line"
                                    graphName="File Submission"
                                    graphData={ [
                                        0,
                                        adminDashboardData?.data?.submissionsGraph?.zeroTen,
                                        adminDashboardData?.data?.submissionsGraph?.elevenFourty,
                                        adminDashboardData?.data?.submissionsGraph?.fourtyOneSixty,
                                        adminDashboardData?.data?.submissionsGraph?.sixtyOneHundred,
                                        adminDashboardData?.data?.submissionsGraph?.docError,
                                    ] }
                                    strokeCurve="straight"
                                    xaxisLabelShow={ true }
                                    yaxisLabelShow={ true }
                                    chartHeight={ 350 }
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
                    handleYes={ handleYesWarning }
                    handleNo={ handleCloseWarning }
                    isOpen={ true }
                />
            }
            <Box mt={ 1 } sx={ { flexGrow: 1 } }>
                <Grid container spacing={ 1 }>
                    <Grid item md={ 6 } xs={ 12 }>
                        <CardView>
                            <Grid container>
                                <Grid item md={ 6.6 } xs={ 12 }>
                                    <Heading title='Account Validity' />
                                </Grid>
                                <Grid item md={ 5.4 } xs={ 12 }>
                                    {
                                        isLoadingDashboard ?
                                            <Skeleton /> :
                                            <TextAlignRight>
                                                <SubTitle
                                                    title={ adminDashboardData?.data?.accountValidityDays + '(' + 'Total days' + ')' }
                                                />
                                            </TextAlignRight>
                                    }
                                </Grid>
                            </Grid>
                            { isLoadingDashboard ?
                                <Skeleton
                                    variant="circular"
                                    style={ { margin: '58px auto' } }
                                    height={ 250 }
                                    width={ 250 }
                                /> :
                                <>
                                    <RadialBarChart
                                        type={ RADIAL_CHART_TYPE }
                                        color={ RADIAL_CHART_COLOR }
                                        height={ RADIAL_CHART_HEIGHT }
                                        label={ [RADIAL_CHART_LABEL + adminDashboardData?.data?.accountValidityDays] }
                                        series={ [adminDashboardData?.data?.accountValidityPercentage.toFixed(2)] }
                                    />
                                    { isLoadingRenewAccount ? <Skeleton /> :
                                        <Typography variant="h4" component="div" gutterBottom>
                                            <a className={ classes.BorderColor } href='' onClick={ renewalClick } >
                                                Renew your account
                                            </a>
                                        </Typography>
                                    }

                                </>
                            }
                        </CardView>
                    </Grid>
                    <Grid item md={ 6 } xs={ 12 }>
                        <CardView>
                            <Grid container>
                                <Grid item md={ 12 } xs={ 12 }>
                                    <Heading title='Trend Analysis' />
                                </Grid>
                            </Grid>
                            { isLoadingTrendAnalysis ?
                                <Skeleton
                                    variant="circular"
                                    style={ { margin: '59px auto' } }
                                    height={ 250 } width={ 250 }
                                /> :
                                <>
                                    { adminDashboardData?.trendAnalysis?.documentsProcessed > 0 ?
                                        <>
                                            <TextAlignRight>
                                                <SubTitle
                                                    title={ adminDashboardData?.trendAnalysis?.documentsProcessed + '(' + 'Submissions' + ')' }
                                                />
                                            </TextAlignRight>
                                            <PieChart
                                                type="donut"
                                                color={ PIE_CHART_COLOR }
                                                height={ 320 }
                                                label={ PIE_CHART_LABEL }
                                                series={
                                                    [
                                                        adminDashboardData?.trendAnalysis?.similarWork,
                                                        adminDashboardData?.trendAnalysis?.ownWork
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
        </React.Fragment>
    );
};

const mapStateToProps = (state) => ({
    adminDashboardData: state?.adminDashboard,
    isLoadingDashboard: state?.adminDashboard?.isLoadingDashboard,
    isLoadingTrendAnalysis: state?.adminDashboard?.isLoadingTrendAnalysis,
    isLoadingRenewAccount: state?.adminDashboard?.isLoadingRenewAccount,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetWidgetCount: (url) => dispatch(GetWidgetCount(url)),
        GetTrendAnalysis: (url) => dispatch(GetTrendAnalysis(url)),
        RenewValidity: (url) => dispatch(RenewValidity(url)),
    };
};

Dashboard.layout = ProAdmin;

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
