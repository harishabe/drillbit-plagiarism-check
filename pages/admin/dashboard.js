import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Admin from '../../layouts/Admin';
import { GetWidgetCount } from '../../redux/action/admin/AdminAction';
import {
    WidgetCard,
    ColumnChart,
    PieChart,
    RadialBarChart,
    CardView,
    Heading,
    SubTitle,
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
    PIE_CHART_LABEL,
    RADIAL_CHART_TYPE,
    RADIAL_CHART_COLOR,
    RADIAL_CHART_LABEL,
    RADIAL_CHART_SERIES,
    RADIAL_CHART_HEIGHT,
} from './../../constant/data/ChartData';

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

const Dashboard = ({ GetWidgetCount, widgetData }) => {
    useEffect(() => {
        GetWidgetCount();
    }, []);

    return (
        <React.Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item md={4} xs={12}>
                        <WidgetCard
                            title='No. of instructors'
                            count={widgetData?.no_of_instructors}
                            icon={<NoOfClassIcon />}
                        />
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <WidgetCard
                            title='No. of students'
                            count={widgetData?.no_of_students}
                            icon={<NoStudentIcon />}
                        />
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <WidgetCard
                            title='No. of submissions'
                            count={widgetData?.no_of_submissions}
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
                                seriesData={
                                    COLUMN_ADMIN_ACC_USG_CHART_SERIES_DATA
                                }
                                gradient={COLUMN_ADMIN_ACC_USG_CHART_GRADIENT}
                                borderRadius={
                                    COLUMN_ADMIN_ACC_USG_CHART_BORDER_RADIUS
                                }
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
                            <InLineText>
                                <Heading title='Account Validity' />
                                <SubTitleMargin>
                                    <SubTitle title='(In days)' />
                                </SubTitleMargin>
                            </InLineText>
                            <RadialBarChart
                                type={RADIAL_CHART_TYPE}
                                color={RADIAL_CHART_COLOR}
                                height={RADIAL_CHART_HEIGHT}
                                label={RADIAL_CHART_LABEL}
                                series={RADIAL_CHART_SERIES}
                            />
                            <SubTitle
                                title='Renive your account'
                                isLink={true}
                            />
                        </CardView>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <CardView>
                            <Grid container>
                                <Grid item md={9} xs={12}>
                                    <Heading title='Trend Analysis' />
                                </Grid>
                                <Grid item md={3} xs={12}>
                                    <TextAlignRight>
                                        <SubTitle title='2666' />
                                    </TextAlignRight>
                                </Grid>
                            </Grid>
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
    );
};

const mapStateToProps = (state) => ({
    widgetData: state?.adminDashboard?.data,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetWidgetCount: () => dispatch(GetWidgetCount()),
    };
};

Dashboard.layout = Admin;

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
