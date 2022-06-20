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
    GetInstructorStats,
} from '../../../redux/action/admin/AdminAction';
import { Skeleton } from '@mui/material';

const InstructorStats = ({
    instructorId,
    GetInstructorStats,
    instructorStats,
    isLoading,
}) => {

    useEffect(() => {
        GetInstructorStats(instructorId);
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
                                    data: instructorStats?.monthlyStats
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
                                    instructorStats?.trendAnalysis?.similarWork,
                                    instructorStats?.trendAnalysis?.ownWork
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
    isLoading: state?.detailsData?.isLoadingStats,
    instructorStats: state?.detailsData?.statsData,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetInstructorStats: (id) => dispatch(GetInstructorStats(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InstructorStats);
