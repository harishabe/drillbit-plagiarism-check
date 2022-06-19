import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Grid from '@mui/material/Grid';
import {
    ColumnChart,
    PieChart,
    SubTitle,
} from '../../../components';

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
    PIE_CHART_LABEL
} from './../../../constant/data/ChartData';

import {
    GetWidgetCount,
    GetTrendAnalysis
} from '../../../redux/action/admin/AdminAction';
import { Skeleton } from '@mui/material';

const InstructorStats = ({
    isLoading,
    adminDashboardData,
    GetWidgetCount,
    GetTrendAnalysis
}) => {

    useEffect(() => {
        GetWidgetCount();
        GetTrendAnalysis();
    }, []);
    return (
        <Grid item md={4} xs={12}>
            <Grid container>
                <Grid item md={8} xs={12}>
                    <SubTitle title='Document Processed' />
                    {isLoading ?
                        <>
                            <Skeleton />
                            <Skeleton />
                            <Skeleton />
                            <Skeleton />
                        </> :
                        <ColumnChart
                            type={COLUMN_ADMIN_CHART_TYPE}
                            color={COLUMN_ADMIN_CHART_COLOR}
                            xaxisData={COLUMN_ADMIN_XAXIS_DATA}
                            columnWidth={COLUMN_ADMIN_WIDTH}
                            height={COLUMN_ADMIN_CHART_HEIGHT}
                            seriesData={[
                                {
                                    name: 'Document Processed',
                                    data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 111]
                                }
                            ]}
                            gradient={COLUMN_ADMIN_CHART_GRADIENT}
                            borderRadius={COLUMN_ADMIN_CHART_BORDER_RADIUS}
                        />
                    }
                </Grid>
                <Grid item md={4} xs={12}>
                    <div style={{ textAlign: 'center' }}>
                        <SubTitle title='Trend Analysis' />
                    </div>
                    {isLoading ?
                        <Skeleton
                            variant="circular"
                            style={{ margin: '8px auto' }}
                            height={250}
                            width={250}
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
                        />
                    }
                </Grid>
            </Grid>
        </Grid >
    )
};

const mapStateToProps = (state) => ({
    isLoading: state?.adminDashboard?.isLoadingDashboard,
    adminDashboardData: state?.adminDashboard
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetWidgetCount: () => dispatch(GetWidgetCount()),
        GetTrendAnalysis: () => dispatch(GetTrendAnalysis()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InstructorStats);
