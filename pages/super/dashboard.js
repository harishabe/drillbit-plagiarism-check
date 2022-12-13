import React, { useState, useEffect } from 'react';
import SuperAdmin from './../../layouts/SuperAdmin';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Skeleton } from '@mui/material';
import { connect } from 'react-redux';
import {
    WidgetCard,
    CardView,
    ColumnChart,
    ErrorBlock,
    Heading,
    PieChartVariant
} from './../../components';
import {
    NoOfClassIcon,
    NoOfAssignmntIcon,
    NoOfSubmission,
} from '../../assets/icon';
import { GetWidgetCount } from '../../redux/action/super/SuperAdminAction';
import {
    COLUMN_ADMIN_CHART_TYPE,
    COLUMN_ADMIN_CHART_COLOR,
    COLUMN_ADMIN_CHART_GRADIENT,
    COLUMN_ADMIN_CHART_BORDER_RADIUS,
    DOCUMENT_PROCESSED_NOT_FOUND,
    COLUMN_ADMIN_XAXIS_DATA
} from './../../constant/data/ChartData';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const chart = ['Country wise institutions', 'Country wise submissions', 'Country wise users', 'State wise institutions', 'State wise submissions', 'State wise users'];

const Dashboard = ({
    GetWidgetCount,
    superDashboardData,
    isLoading
}) => {

    const [year, setYear] = useState([])
    const [submissions, setSubmissions] = useState([])
    const [value, setValue] = useState(chart[0]);
    const [inputValue, setInputValue] = useState('');
    const [chartData, setChartData] = useState({});
    const [chartLoading, setChartLoading] = useState(false);

    useEffect(() => {
        GetWidgetCount();
    }, []);

    let a = 0; let b = 0; let c = 0; let d = 0; let e = 0; let f = 0;

    const COUNTRY_WISE_INSTITUTES = superDashboardData && Object.keys(superDashboardData?.countryWiseInstituttes).map((value) => {
        return value?.charAt(0).toUpperCase() + value?.slice(1).toLowerCase().substring(0, value?.length) + '(' + Object.values(superDashboardData?.countryWiseInstituttes)[a++] + ')'
    })

    const COUNTRY_WISE_SUBMISSIONS = superDashboardData && Object.keys(superDashboardData?.countryWiseSubmissions).map((value) => {
        return value?.charAt(0).toUpperCase() + value?.slice(1).toLowerCase().substring(0, value?.length) + '(' + Object.values(superDashboardData?.countryWiseSubmissions)[b++] + ')'
    })

    const COUNTRY_WISE_USERS = superDashboardData && Object.keys(superDashboardData?.countryWiseUsers
    ).map((value) => {
        return value?.charAt(0).toUpperCase() + value?.slice(1).toLowerCase().substring(0, value?.length) + '(' + Object.values(superDashboardData?.countryWiseUsers)[c++] + ')'
    })

    const STATE_WISE_INSTITUTES = superDashboardData && Object.keys(superDashboardData?.stateWiseInstituttes).map((value) => {
        return value?.charAt(0).toUpperCase() + value?.slice(1).toLowerCase().substring(0, value?.length) + '(' + Object.values(superDashboardData?.stateWiseInstituttes)[d++] + ')'
    })

    const STATE_WISE_SUBMISSIONS = superDashboardData && Object.keys(superDashboardData?.stateWiseSubmissions).map((value) => {
        return value?.charAt(0).toUpperCase() + value?.slice(1).toLowerCase().substring(0, value?.length) + '(' + Object.values(superDashboardData?.stateWiseSubmissions)[e++] + ')'
    })

    const STATE_WISE_USERS = superDashboardData && Object.keys(superDashboardData?.stateWiseUsers).map((value) => {
        return value?.charAt(0).toUpperCase() + value?.slice(1).toLowerCase().substring(0, value?.length) + '(' + Object.values(superDashboardData?.stateWiseUsers)[f++] + ')'
    })

    useEffect(() => {
        if (superDashboardData) {
            if (inputValue === 'Country wise institutions') {
                setChartLoading(true)
                setChartData({
                    'label': COUNTRY_WISE_INSTITUTES,
                    'series': Object.values(superDashboardData?.countryWiseInstituttes)
                })
            } else if (inputValue === 'Country wise submissions') {
                setChartLoading(true)
                setChartData({
                    'label': COUNTRY_WISE_SUBMISSIONS,
                    'series': Object.values(superDashboardData?.countryWiseSubmissions)
                })
            } else if (inputValue === 'Country wise users') {
                setChartLoading(true)
                setChartData({
                    'label': COUNTRY_WISE_USERS,
                    'series': Object.values(superDashboardData?.countryWiseUsers)
                })
            } else if (inputValue === 'State wise institutions') {
                setChartLoading(true)
                setChartData({
                    'label': STATE_WISE_INSTITUTES,
                    'series': Object.values(superDashboardData?.stateWiseInstituttes)
                })
            } else if (inputValue === 'State wise submissions') {
                setChartLoading(true)
                setChartData({
                    'label': STATE_WISE_SUBMISSIONS,
                    'series': Object.values(superDashboardData?.stateWiseSubmissions)
                })
            } else if (inputValue === 'State wise users') {
                setChartLoading(true)
                setChartData({
                    'label': STATE_WISE_USERS,
                    'series': Object.values(superDashboardData?.stateWiseUsers)
                })
            }
        }
    }, [superDashboardData, inputValue]);

    setTimeout(() => {
        setChartLoading(false)
    }, [50]);

    console.log('chartData', chartData)

    useEffect(() => {
        let yearList = superDashboardData?.yearWiseSubmissionStats?.map((item) => {
            return item.year;
        });
        let submission = superDashboardData?.yearWiseSubmissionStats?.map((item) => {
            return item.submissions;
        });
        setYear(yearList);
        setSubmissions(submission);
    }, [superDashboardData]);

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
            <Box sx={ { mt: 1, flexGrow: 1 } }>
                <CardView>
                    <Grid container spacing={ 1 }>
                        <Grid item md={ 8 } xs={ 12 }>
                            <Heading title={ value } />
                            { (isLoading || chartLoading) ? <Skeleton /> :
                                superDashboardData && chartData?.label?.length > 0 ?
                                    <PieChartVariant
                                        height={ 250 }
                                        label={ chartData?.label }
                                        series={ chartData?.series }
                                    />
                                    : <ErrorBlock message={ DOCUMENT_PROCESSED_NOT_FOUND } />
                            }
                        </Grid>
                        <Grid item md={ 4 } xs={ 12 }>
                            <Autocomplete
                                value={ value }
                                disableClearable={ true }
                                onChange={ (event, newValue) => {
                                    setValue(newValue);
                                } }
                                inputValue={ inputValue }
                                onInputChange={ (event, newInputValue) => {
                                    setInputValue(newInputValue);
                                } }
                                id="controllable-states-demo"
                                options={ chart }
                                sx={ { width: 300 } }
                                renderInput={ (params) => <TextField { ...params } label="Choose chart" /> }
                            />
                        </Grid>
                    </Grid>
                </CardView>
            </Box>

            <Box sx={ { mt: 1, flexGrow: 1 } }>
                <Grid container spacing={ 1 }>
                    <Grid item md={ 5 } xs={ 12 }>
                        <CardView>
                            <Heading title='Year wise submission stats' />
                            { isLoading ? <Skeleton /> :
                                submissions?.length > 0 ?
                                    <ColumnChart
                                        type={ COLUMN_ADMIN_CHART_TYPE }
                                        color={ COLUMN_ADMIN_CHART_COLOR }
                                        xaxisData={ year }
                                        columnWidth={ '20%' }
                                        height={ 355 }
                                        seriesData={ [
                                            {
                                                name: 'No. of submissions',
                                                data: submissions
                                            }
                                        ] }
                                        gradient={ COLUMN_ADMIN_CHART_GRADIENT }
                                        borderRadius={ COLUMN_ADMIN_CHART_BORDER_RADIUS }
                                    />
                                    : <ErrorBlock message={ DOCUMENT_PROCESSED_NOT_FOUND } />
                            }
                        </CardView>
                    </Grid>
                    <Grid item md={ 7 } xs={ 12 }>
                        <CardView>
                            <Heading title='Month wise submission stats' />
                            { isLoading ? <Skeleton /> :
                                superDashboardData?.monthWiseSubmissionStats ?
                                    <ColumnChart
                                        type={ COLUMN_ADMIN_CHART_TYPE }
                                        color={ COLUMN_ADMIN_CHART_COLOR }
                                        xaxisData={ COLUMN_ADMIN_XAXIS_DATA }
                                        columnWidth={ '40%' }
                                        height={ 355 }
                                        seriesData={ [
                                            {
                                                name: 'No. of submissions',
                                                data: [
                                                    superDashboardData?.monthWiseSubmissionStats?.[0]?.january,
                                                    superDashboardData?.monthWiseSubmissionStats?.[0]?.february,
                                                    superDashboardData?.monthWiseSubmissionStats?.[0]?.march,
                                                    superDashboardData?.monthWiseSubmissionStats?.[0]?.april,
                                                    superDashboardData?.monthWiseSubmissionStats?.[0]?.may,
                                                    superDashboardData?.monthWiseSubmissionStats?.[0]?.june,
                                                    superDashboardData?.monthWiseSubmissionStats?.[0]?.july,
                                                    superDashboardData?.monthWiseSubmissionStats?.[0]?.august,
                                                    superDashboardData?.monthWiseSubmissionStats?.[0]?.september,
                                                    superDashboardData?.monthWiseSubmissionStats?.[0]?.october,
                                                    superDashboardData?.monthWiseSubmissionStats?.[0]?.november,
                                                    superDashboardData?.monthWiseSubmissionStats?.[0]?.december,
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
        </React.Fragment>
    );
};
const mapStateToProps = (state) => ({
    superDashboardData: state?.superAdmin?.data,
    isLoading: state?.superAdmin?.isLoading,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetWidgetCount: () => dispatch(GetWidgetCount()),
    };
};

Dashboard.layout = SuperAdmin;

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
