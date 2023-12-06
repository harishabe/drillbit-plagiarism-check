import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import Admin from './../../layouts/SuperAdmin';
import { Box, Grid, Skeleton } from '@mui/material';
import { connect } from 'react-redux';
import {
    WidgetCard,
    CardView,
    ColumnChart,
    ErrorBlock,
    Heading,
} from './../../components';
import {
    NoOfClassIcon,
    NoOfAssignmntIcon,
    NoOfSubmission,
    TimeIcon,
    TimeRegionalIcon,
    TimeNonEngIcon,
} from '../../assets/icon';
import { GetWidgetCount } from '../../redux/action/super/SuperAdminAction';
import {
    COLUMN_ADMIN_CHART_TYPE,
    COLUMN_ADMIN_CHART_COLOR,
    COLUMN_ADMIN_CHART_GRADIENT,
    COLUMN_ADMIN_CHART_BORDER_RADIUS,
    COLUMN_ADMIN_XAXIS_DATA,
    COLUMN_ADMIN_WIDTH,
} from './../../constant/data/ChartData';
import {
    DOCUMENT_PROCESSED_NOT_FOUND,
} from '../../constant/data/ErrorMessage'
import { BASE_URL_SUPER } from '../../utils/BaseUrl'
import END_POINTS from "../../utils/EndPoints";
import { success } from '../../utils/ToastrValidation';
import WidgetCardTitle from '../../components/card/WidgetCardTitle';

const chart = ['Institution wise submissions', 'Institutions type', 'State wise institutions', 'State wise submissions', 'State wise users'];
const submission = ['Year wise submissions', 'Month wise submissions'];

const Dashboard = ({
    GetWidgetCount,
    superDashboardData,
    isLoading,
}) => {
    const router = useRouter();
    const [year, setYear] = useState([])
    const [submissions, setSubmissions] = useState([])
    const [monthWiseYearlyList, setMonthWiseYearlyList] = useState([])
    const [submissionData, setSubmissionData] = useState(submission[0])
    const [value, setValue] = useState(chart[0]);
    const [chartData, setChartData] = useState({});
    const [submissionChartData, setSubmissionChartData] = useState({});
    const [submissionChartYear, setSubmissionChartYear] = useState({
        'year': 2020,
        'index': 0
    });
    const [chartLoading, setChartLoading] = useState(false);
    const [submissionChartLoading, setSubmissionChartLoading] = useState(false);

    useEffect(() => {
        if (router?.query?.message) {
            success(router?.query?.message)
        }
        GetWidgetCount(BASE_URL_SUPER + END_POINTS.CONSORTIUM_DASHBOARD);
    }, []);

    const INSITUTIONS_TYPES = superDashboardData && Object.keys(superDashboardData?.institutionTypes).map((value) => {
        return value?.charAt(0).toUpperCase() + value?.slice(1).toLowerCase().substring(0, value?.length)
    })

    const STATE_WISE_INSTITUTES = superDashboardData && Object.keys(superDashboardData?.stateWiseInstituttes).map((value) => {
        return value?.charAt(0).toUpperCase() + value?.slice(1).toLowerCase().substring(0, value?.length)
    })

    const STATE_WISE_SUBMISSIONS = superDashboardData && Object.keys(superDashboardData?.stateWiseSubmissions).map((value) => {
        return value?.charAt(0).toUpperCase() + value?.slice(1).toLowerCase().substring(0, value?.length)
    })

    const STATE_WISE_USERS = superDashboardData && Object.keys(superDashboardData?.stateWiseUsers).map((value) => {
        return value?.charAt(0).toUpperCase() + value?.slice(1).toLowerCase().substring(0, value?.length)
    })

    const INSTITUTION_WISE_SUBMISSIONS = superDashboardData && Object.keys(superDashboardData.institutionsWiseSubmissions).map((value) => {
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase().substring(0, value.length);
    });

    const SelectedChart = (val) => {
        if (superDashboardData) {
            switch (val) {
                case 'Institution wise submissions':
                    return {
                        name: INSTITUTION_WISE_SUBMISSIONS,
                        value: Object.values(superDashboardData?.institutionsWiseSubmissions),
                        seriesDataName: 'No. of Submissions'
                    }
                case 'Institutions type':
                    return {
                        name: INSITUTIONS_TYPES,
                        value: Object.values(superDashboardData?.institutionTypes),
                        seriesDataName: 'No. of Institutes'
                    }
                case 'State wise institutions':
                    return {
                        name: STATE_WISE_INSTITUTES,
                        value: Object.values(superDashboardData?.stateWiseInstituttes),
                        seriesDataName: 'No. of Institutes'
                    }
                case 'State wise submissions':
                    return {
                        name: STATE_WISE_SUBMISSIONS,
                        value: Object.values(superDashboardData?.stateWiseSubmissions),
                        seriesDataName: 'No. of Submissions'
                    }
                case 'State wise users':
                    return {
                        name: STATE_WISE_USERS,
                        value: Object.values(superDashboardData?.stateWiseUsers),
                        seriesDataName: 'No. of Users'
                    }
            }
        }
    }

    const seriesData = superDashboardData && SelectedChart(value);
    const sortedData = superDashboardData && seriesData?.value?.map((value, index) => {
        return {
            label: seriesData?.name?.[index] || '',
            value: value || 0,
        };
    }).sort((a, b) => b.value - a.value);

    const sortedSeries = superDashboardData && sortedData.map((data) => data.value);
    const sortedLabels = superDashboardData && sortedData.map((data) => data.label);
    const seriesDataName = superDashboardData && seriesData?.seriesDataName

    const columnWidth = (label) => {
        if (label?.length <= 5) {
            return '10%';
        } else if (label?.length >= 6 && label?.length <= 10) {
            return '30%'
        } else if (label?.length >= 11) {
            return COLUMN_ADMIN_WIDTH
        }
    }

    useEffect(() => {
        if (superDashboardData) {
            setChartLoading(true)
            setChartData({
                'label': sortedLabels,
                'series': sortedSeries,
                'name': seriesDataName
            })
        }
        setTimeout(() => {
            setChartLoading(false)
        }, []);
    }, [superDashboardData, value]);

    useEffect(() => {
        if (superDashboardData) {
            setSubmissionChartLoading(true)
            if (submissionData === 'Year wise submissions') {
                setSubmissionChartData({
                    'xaxisData': year,
                    'data': submissions,
                    'columnWidth': '10%'
                })
            } else if (submissionData === 'Month wise submissions') {
                setSubmissionChartData({
                    'xaxisData': COLUMN_ADMIN_XAXIS_DATA,
                    'data': [
                        superDashboardData?.monthWiseSubmissionStats?.[submissionChartYear?.index]?.january,
                        superDashboardData?.monthWiseSubmissionStats?.[submissionChartYear?.index]?.february,
                        superDashboardData?.monthWiseSubmissionStats?.[submissionChartYear?.index]?.march,
                        superDashboardData?.monthWiseSubmissionStats?.[submissionChartYear?.index]?.april,
                        superDashboardData?.monthWiseSubmissionStats?.[submissionChartYear?.index]?.may,
                        superDashboardData?.monthWiseSubmissionStats?.[submissionChartYear?.index]?.june,
                        superDashboardData?.monthWiseSubmissionStats?.[submissionChartYear?.index]?.july,
                        superDashboardData?.monthWiseSubmissionStats?.[submissionChartYear?.index]?.august,
                        superDashboardData?.monthWiseSubmissionStats?.[submissionChartYear?.index]?.september,
                        superDashboardData?.monthWiseSubmissionStats?.[submissionChartYear?.index]?.october,
                        superDashboardData?.monthWiseSubmissionStats?.[submissionChartYear?.index]?.november,
                        superDashboardData?.monthWiseSubmissionStats?.[submissionChartYear?.index]?.december,
                    ],
                    'columnWidth': '30%'
                })
            }
        }
        setTimeout(() => {
            setSubmissionChartLoading(false)
        }, []);
    }, [superDashboardData, year, submissions, submissionData, submissionChartYear]);

    useEffect(() => {
        let yearList = superDashboardData?.yearWiseSubmissionStats?.map((item) => {
            return item.year;
        });
        let submission = superDashboardData?.yearWiseSubmissionStats?.map((item) => {
            return item.submissions;
        });
        let monthYearList = superDashboardData?.monthWiseSubmissionStats?.map((item, index) => {
            return { 'year': item?.year, index };
        });
        setYear(yearList);
        setSubmissions(submission);
        setMonthWiseYearlyList(monthYearList);
    }, [superDashboardData]);

    const handleChange = (val) => {
        monthWiseYearlyList?.map((item) => {
            if (val == item?.year) {
                setSubmissionChartYear(item)
            }
        });
    }

    const submissionDetail = submissionData && submissionChartData?.data?.reduce((acc, currentValue) => {
        return acc + currentValue;
    }, 0);

    return (
        <React.Fragment>
            <Box sx={ { flexGrow: 1 } }>
                <Grid container spacing={ 1 } >
                    <Grid item md={ 4 } xs={ 12 }>
                        <WidgetCard
                            title='Institutions'
                            isLoading={ isLoading }
                            count={ isLoading ? '' : superDashboardData?.totalInstitutes }
                            icon={ <NoOfClassIcon /> }
                        />
                    </Grid>
                    <Grid item md={ 4 } xs={ 12 }>
                        <WidgetCard
                            title='Users'
                            isLoading={ isLoading }
                            count={ isLoading ? '' : superDashboardData?.totalUsers }
                            icon={ <NoOfAssignmntIcon /> }
                        />
                    </Grid>
                    <Grid item md={ 4 } xs={ 12 }>
                        <WidgetCard
                            title='Submissions'
                            isLoading={ isLoading }
                            count={ isLoading ? '' : superDashboardData?.totalSubmissions }
                            icon={ <NoOfSubmission /> }
                        />
                    </Grid>
                </Grid>
            </Box>
            <Box sx={ { flexGrow: 1, marginTop:'0.5rem'  } }>
                <Grid container spacing={ 1 } >
                    <Grid item md={ 4 } xs={ 12 }>
                        <WidgetCardTitle
                            title='English'
                            isLoading={ isLoading }
                            label={superDashboardData?.consortiumTimeCalculations?.engTotalCount}
                            data={ isLoading ? '' : 
                            [{
                                label: 'Max time',
                                value:superDashboardData?.consortiumTimeCalculations?.engMaxProcessingTimePerDoc,
                            },
                            {
                                label: 'Avg time',
                                value:superDashboardData?.consortiumTimeCalculations?.engAvgProcessingTime,
                            },
                            {
                                label: 'Min time',
                                value:superDashboardData?.consortiumTimeCalculations?.engMinProcessingTimePerDoc,
                            }
                            ]}
                            icon={ <TimeIcon /> }
                        />
                    </Grid>
                    <Grid item md={ 4 } xs={ 12 }>
                        <WidgetCardTitle
                            title='Non English'
                            isLoading={ isLoading }
                            label={superDashboardData?.consortiumTimeCalculations?.nonEngTotalCount}
                            data={ isLoading ? '' : 
                            [{
                                label: 'Max time',
                                value:superDashboardData?.consortiumTimeCalculations?.nonEngMaxProcessingTimePerDoc,
                            },
                            {
                                label: 'Avg time',
                                value:superDashboardData?.consortiumTimeCalculations?.nonEngAvgProcessingTime,
                            },
                            {
                                label: 'Min time',
                                value:superDashboardData?.consortiumTimeCalculations?.nonEngMinProcessingTimePerDoc,
                            }
                            ]}
                            icon={ <TimeNonEngIcon /> }
                        />
                    </Grid>
                    <Grid item md={ 4 } xs={ 12 }>
                        <WidgetCardTitle
                            title='Regional'
                            isLoading={ isLoading }
                            label={superDashboardData?.consortiumTimeCalculations?.regTotalCount}
                            data={ isLoading ? '' : 
                            [
                                {
                                    label: 'Max time',
                                    value:superDashboardData?.consortiumTimeCalculations?.regMaxProcessingTimePerDoc,
                                },
                                {
                                    label: 'Avg time',
                                    value:superDashboardData?.consortiumTimeCalculations?.regAvgProcessingTime,
                                },
                                {
                                    label: 'Min time',
                                    value:superDashboardData?.consortiumTimeCalculations?.regAvgProcessingTime,
                                }
                            ]}
                            icon={ <TimeRegionalIcon /> }
                        />
                    </Grid>
                </Grid>
            </Box>
            <Box sx={ { mt: 1, flexGrow: 1 } }>
                <CardView>
                    <Grid container spacing={ 1 }>
                        <Grid item md={ 11.8 } xs={ 12 }>
                            <Grid container>
                                <Grid item md={ 10 } xs={ 12 }>
                                    <Heading title={ value } />
                                </Grid>
                                <Grid item md={ 2 } xs={ 12 }>
                                    <select onChange={ (e) => { setValue(e.target.value) } }>
                                        { chart?.map((item, index) => (
                                            <option key={ index }>{ item }</option>
                                        )) }
                                    </select>
                                </Grid>
                            </Grid>
                            { (isLoading || chartLoading) ?
                                <Skeleton />
                                :
                                <>
                                    { superDashboardData && chartData?.label?.length > 0 &&
                                        superDashboardData?.totalSubmissions > 0 ?
                                        <ColumnChart
                                            filename={ value }
                                            type={ COLUMN_ADMIN_CHART_TYPE }
                                            color={ COLUMN_ADMIN_CHART_COLOR }
                                            xaxisData={ chartData?.label }
                                            columnWidth={ columnWidth(chartData?.label) }
                                            height={ 355 }
                                            seriesData={ [
                                                {
                                                    name: chartData?.name,
                                                    data: chartData?.series
                                                }
                                            ] }
                                            gradient={ COLUMN_ADMIN_CHART_GRADIENT }
                                            borderRadius={ COLUMN_ADMIN_CHART_BORDER_RADIUS }
                                        />
                                        :
                                        <ErrorBlock message={ DOCUMENT_PROCESSED_NOT_FOUND } />
                                    }
                                </>
                            }
                        </Grid>
                    </Grid>
                </CardView>
            </Box>

            <Box sx={ { mt: 1, flexGrow: 1 } }>
                <CardView>
                    <Grid container spacing={ 1 }>
                        <Grid item md={ 11.8 } xs={ 12 }>
                            <Grid container>
                                <Grid item md={ submissionData === submission[0] ? 10 : 9.3 } xs={ 12 }>
                                    <Heading title={ submissionData } />
                                </Grid>
                                <Grid item md={ 2 } xs={ 12 }>
                                    <select onChange={ (e) => { setSubmissionData(e.target.value) } }>
                                        { submission?.map((item, index) => (
                                            <option key={ index }>{ item }</option>
                                        )) }
                                    </select>
                                </Grid>
                                { submissionData === submission[1] &&
                                    <Grid item md={ 0.7 } xs={ 12 }>
                                        <select value={ submissionChartYear?.year } onChange={ (e) => { handleChange(e.target.value) } }>
                                            { monthWiseYearlyList?.map((item, index) => (
                                                <option key={ index }>{ item?.year }</option>
                                            )) }
                                        </select>
                                    </Grid>
                                }
                            </Grid>
                            { (isLoading || submissionChartLoading) ? <Skeleton /> :
                                superDashboardData && submissionChartData?.xaxisData?.length > 0 && submissionDetail !== 0 ?
                                    <ColumnChart
                                        filename={ submissionData }
                                        type={ COLUMN_ADMIN_CHART_TYPE }
                                        color={ COLUMN_ADMIN_CHART_COLOR }
                                        xaxisData={ submissionChartData?.xaxisData }
                                        columnWidth={ submissionChartData?.columnWidth }
                                        height={ 355 }
                                        seriesData={ [
                                            {
                                                name: 'No. of submissions',
                                                data: submissionChartData?.data
                                            }
                                        ] }
                                        gradient={ COLUMN_ADMIN_CHART_GRADIENT }
                                        borderRadius={ COLUMN_ADMIN_CHART_BORDER_RADIUS }
                                    />
                                    : <ErrorBlock message={ DOCUMENT_PROCESSED_NOT_FOUND } />
                            }
                        </Grid>
                    </Grid>
                </CardView>
            </Box>
        </React.Fragment>
    );
};
const mapStateToProps = (state) => ({
    superDashboardData: state?.superAdmin?.data,
    isLoading: state?.superAdmin?.isLoading,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetWidgetCount: (url) => dispatch(GetWidgetCount(url)),
    };
};

Dashboard.layout = Admin;

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);