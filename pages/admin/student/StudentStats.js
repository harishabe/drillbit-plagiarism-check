import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Grid, IconButton, Tooltip } from '@mui/material';
import { DownloadIcon } from '../../../assets/icon';
import {
    ColumnChart,
    PieChart,
    SubTitle,
    SubTitle1
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
} from '../../../constant/data/ChartData';

import {
    GetStats,
    GetExportToCSV,
} from '../../../redux/action/admin/AdminAction';
import { Skeleton } from '@mui/material';

const StudentStats = ({
    studentId,
    GetStats,
    GetExportToCSV,
    studentStats,
    isLoading,
    isLoadingCsvExport,
}) => {

    const [submissionData, setSubmissionData] = useState([]);

    useEffect(() => {
        GetStats(studentId);
    }, []);

    useEffect(() => {
        let submission = '';
        submission = studentStats?.monthlyStats?.map((item) => {
            return item.submissions;
        });
        setSubmissionData(submission);
    }, [studentStats]);

    const handleExportCsv = () => {
        GetExportToCSV(studentStats?.username);
    };

    return (
        <>
            <Grid item container>
                { isLoading ? <Skeleton width={ 210 } /> :
                    <>
                        <Grid item md={ 2 } xs={ 2 }> <SubTitle1 title="Student name" /></Grid>
                        <Grid item md={ 1 } xs={ 1 }> <SubTitle1 title=":" /></Grid>
                        <Grid item md={ 7 } xs={ 7 }>
                            <SubTitle1 title={ studentStats?.name } />
                        </Grid>
                        { isLoadingCsvExport ? <Skeleton width={ 150 } style={ { marginLeft: 'auto' } } /> :
                            <Tooltip title="Export to csv">
                                <IconButton onClick={ handleExportCsv } style={ { marginLeft: 'auto' } }>
                                    <DownloadIcon />
                                </IconButton>
                            </Tooltip> }
                    </>
                }
            </Grid>

            <Grid item md={ 12 } xs={ 12 }>
                <Grid container>
                    <Grid item md={ 8 } xs={ 12 }>
                        <SubTitle title='Document Processed' />
                        { isLoading ?
                            <>
                                <Skeleton />
                                <Skeleton />
                                <Skeleton />
                                <Skeleton />
                            </> :
                            submissionData?.length > 0 && <ColumnChart
                                type={ COLUMN_ADMIN_CHART_TYPE }
                                color={ COLUMN_ADMIN_CHART_COLOR }
                                xaxisData={ COLUMN_ADMIN_XAXIS_DATA }
                                columnWidth={ COLUMN_ADMIN_WIDTH }
                                height={ COLUMN_ADMIN_CHART_HEIGHT }
                                seriesData={ [
                                    {
                                        name: 'Document Processed',
                                        data: submissionData
                                    }
                                ] }
                                gradient={ COLUMN_ADMIN_CHART_GRADIENT }
                                borderRadius={ COLUMN_ADMIN_CHART_BORDER_RADIUS }
                            />
                        }
                    </Grid>
                    <Grid item md={ 4 } xs={ 12 }>
                        <div style={ { textAlign: 'center' } }>
                            <SubTitle title='Trend Analysis' />
                        </div>
                        { isLoading ?
                            <Skeleton
                                variant="circular"
                                style={ { margin: '8px auto' } }
                                height={ 250 }
                                width={ 250 }
                            /> :
                            <PieChart
                                type="donut"
                                color={ PIE_CHART_COLOR }
                                width={ PIE_CHART_WIDTH }
                                label={ PIE_CHART_LABEL }
                                series={
                                    [
                                        studentStats?.trendAnalysis?.similarWork,
                                        studentStats?.trendAnalysis?.ownWork
                                    ]
                                }
                            />
                        }
                    </Grid>
                </Grid>
            </Grid >
        </>
    )
};

const mapStateToProps = (state) => ({
    isLoading: state?.detailsData?.isLoadingStats,
    studentStats: state?.detailsData?.StatsData,
    isLoadingCsvExport: state?.detailsData?.isLoadingCSV,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetStats: (id) => dispatch(GetStats(id)),
        GetExportToCSV: (emailId) => dispatch(GetExportToCSV(emailId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentStats);
