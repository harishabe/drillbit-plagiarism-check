import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Admin from '../../layouts/Admin';
import {
    GetWidgetCount,
    GetTopStudent,
    GetTrendAnalysis
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

const Dashboard = ({
    isLoading,
    isLoadingDashboard,
    isLoadingTrendAnalysis,
    GetWidgetCount,
    adminDashboardData,
    GetTopStudent,
    GetTrendAnalysis
}) => {
    const [usageGraphData, setUsageGraphData] = useState(USAGE_CHART_DATA);
    const [trendAnalysisSeries, setTrendAnalysisSeries] = useState([]);

    useEffect(() => {
        GetWidgetCount();
        GetTopStudent();
        GetTrendAnalysis();
        trendAnalysisSeries.push(adminDashboardData?.trendAnalysis?.similarWork, adminDashboardData?.trendAnalysis?.ownWork)
        setTrendAnalysisSeries([...trendAnalysisSeries]);
    }, []);

    useEffect(() => {
        let usageGraph = usageGraphData?.map((item) => {
            if (item?.x === 'Instructors') {
                item['y'] = adminDashboardData?.data?.instructorAccountUsage?.usedAccounts
            } else if (item?.x === 'Student') {
                item['y'] = adminDashboardData?.data?.studentAccountUsage?.usedAccounts
            } else if (item?.x === 'Admin') {
                item['y'] = adminDashboardData?.data?.adminAccountUsage?.usedAccounts
            }
            item?.goals?.map((goalsItem) => {
                if (item?.x === 'Instructors') {
                    goalsItem['value'] = adminDashboardData?.data?.instructorAccountUsage?.totalAccounts;
                    return goalsItem;
                } else if (item?.x === 'Student') {
                    goalsItem['value'] = adminDashboardData?.data?.studentAccountUsage?.totalAccounts;
                    return goalsItem;
                } else if (item?.x === 'Admin') {
                    goalsItem['value'] = adminDashboardData?.data?.adminAccountUsage?.totalAccounts;
                    return goalsItem;
                }
            });
            return item;
        });
        setUsageGraphData(usageGraph);
    }, [adminDashboardData])

    return (
        <React.Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item md={4} xs={12}>
                        <WidgetCard
                            title='No. of instructors'
                            count={adminDashboardData?.data?.instructorAccountUsage?.usedAccounts}
                            icon={<NoOfClassIcon />}
                        />
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <WidgetCard
                            title='No. of students'
                            count={adminDashboardData?.data?.studentAccountUsage?.usedAccounts}
                            icon={<NoStudentIcon />}
                        />
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <WidgetCard
                            title='No. of submissions'
                            count={adminDashboardData?.data?.no_of_submissions}
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
                            {isLoadingDashboard ? <Skeleton /> :
                                <ColumnChart
                                    type={COLUMN_ADMIN_CHART_TYPE}
                                    color={COLUMN_ADMIN_CHART_COLOR}
                                    xaxisData={COLUMN_ADMIN_XAXIS_DATA}
                                    columnWidth={COLUMN_ADMIN_WIDTH}
                                    height={COLUMN_ADMIN_CHART_HEIGHT}
                                    seriesData={[
                                        {
                                            name: 'Document Processed',
                                            data: adminDashboardData?.data?.monthlySubmissions
                                        }
                                    ]}
                                    gradient={COLUMN_ADMIN_CHART_GRADIENT}
                                    borderRadius={COLUMN_ADMIN_CHART_BORDER_RADIUS}
                                />}
                        </CardView>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <CardView>
                            <Heading
                                title='Account Usage Info'
                            />
                            {
                                isLoadingDashboard ?
                                    <Skeleton /> :
                                    <UsageChart SERIES_DATA={usageGraphData} />
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
                            {isLoading ?
                                <>
                                    <ListSkeleton />
                                    <ListSkeleton />
                                    <ListSkeleton />
                                    <ListSkeleton />
                                </> :
                                <TopStudents
                                    topStudentData={adminDashboardData?.topStudent}
                                />
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
                                    <SubTitle
                                        title='Renive your account'
                                        isLink={true}
                                    />
                                </>
                            }
                        </CardView>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <CardView>
                            <Grid container>
                                <Grid item md={9} xs={12}>
                                    <Heading title='Trend Analysis' />
                                </Grid>
                                <Grid item md={3} xs={12}>
                                    {
                                        isLoading ?
                                            <Skeleton /> :
                                            <TextAlignRight>
                                                <SubTitle
                                                    title={adminDashboardData?.trendAnalysis?.documentsProcessed}
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
                                <PieChart
                                    type="donut"
                                    color={PIE_CHART_COLOR}
                                    width={PIE_CHART_WIDTH}
                                    label={PIE_CHART_LABEL}
                                    series={
                                        [
                                            adminDashboardData?.trendAnalysis?.similarWork,
                                            adminDashboardData?.trendAnalysis?.ownWork
                                        ]
                                    }
                                />}
                        </CardView>
                    </Grid>
                </Grid>
            </Box>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => ({
    isLoading: state?.adminDashboard?.isLoading,
    adminDashboardData: state?.adminDashboard,
    isLoadingDashboard: state?.adminDashboard?.isLoadingDashboard,
    isLoadingTrendAnalysis: state?.adminDashboard?.isLoadingTrendAnalysis,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetWidgetCount: () => dispatch(GetWidgetCount()),
        GetTopStudent: () => dispatch(GetTopStudent()),
        GetTrendAnalysis: () => dispatch(GetTrendAnalysis()),
    };
};

Dashboard.layout = Admin;

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
