import React, { useState, useEffect } from 'react';
import SuperAdmin from './../../layouts/SuperAdmin';
import { useForm } from 'react-hook-form';
import { Box, Grid, Skeleton, IconButton, Tooltip, TextField, Button } from '@mui/material';
import styled from 'styled-components';
import BeatLoader from 'react-spinners/BeatLoader';
import { makeStyles } from '@mui/styles';
import { connect } from 'react-redux';
import {
    WidgetCard,
    CardView,
    ColumnChart,
    ErrorBlock,
    Heading,
    PieChart,
    DialogModal
} from './../../components';
import {
    NoOfClassIcon,
    NoOfAssignmntIcon,
    NoOfSubmission,
} from '../../assets/icon';
import FeedIcon from '@mui/icons-material/Feed';
import { GetWidgetCount } from '../../redux/action/super/SuperAdminAction';
import { SubmissionReprocess } from '../../redux/action/common/Submission/SubmissionAction';
import {
    COLUMN_ADMIN_CHART_TYPE,
    COLUMN_ADMIN_CHART_COLOR,
    COLUMN_ADMIN_CHART_GRADIENT,
    COLUMN_ADMIN_CHART_BORDER_RADIUS,
    COLUMN_ADMIN_XAXIS_DATA
} from './../../constant/data/ChartData';
import {
    DOCUMENT_PROCESSED_NOT_FOUND,
    REPROCESS_PAPER_ID
} from '../../constant/data/ErrorMessage'

const chart = ['Country wise institutions', 'Country wise submissions', 'Country wise users', 'State wise institutions', 'State wise submissions', 'State wise users'];
const submission = ['Year wise submissions', 'Month wise submissions'];

const useStyles = makeStyles(() => ({
    helperText: {
        marginLeft: 0
    }
}));

const ReprocessButton = styled.div`
    position:fixed;
    top: 12px;
    right:230px;
    z-index:999;
`;

const Dashboard = ({
    GetWidgetCount,
    SubmissionReprocess,
    superDashboardData,
    isLoading,
    isLoadingReprocess
}) => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const classes = useStyles();

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
    const [reprocess, setReprocess] = useState(false);

    useEffect(() => {
        GetWidgetCount();
    }, []);

    const handleShow = () => {
        setReprocess(true);
    }

    const closeSearchDialog = () => {
        setReprocess(false);
    };

    const onSearch = (data) => {
        SubmissionReprocess(data?.paperId);
    };

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
            setChartLoading(true)
            if (value === 'Country wise institutions') {
                setChartData({
                    'label': COUNTRY_WISE_INSTITUTES,
                    'series': Object.values(superDashboardData?.countryWiseInstituttes)
                })
            } else if (value === 'Country wise submissions') {
                setChartData({
                    'label': COUNTRY_WISE_SUBMISSIONS,
                    'series': Object.values(superDashboardData?.countryWiseSubmissions)
                })
            } else if (value === 'Country wise users') {
                setChartData({
                    'label': COUNTRY_WISE_USERS,
                    'series': Object.values(superDashboardData?.countryWiseUsers)
                })
            } else if (value === 'State wise institutions') {
                setChartData({
                    'label': STATE_WISE_INSTITUTES,
                    'series': Object.values(superDashboardData?.stateWiseInstituttes)
                })
            } else if (value === 'State wise submissions') {
                setChartData({
                    'label': STATE_WISE_SUBMISSIONS,
                    'series': Object.values(superDashboardData?.stateWiseSubmissions)
                })
            } else if (value === 'State wise users') {
                setChartData({
                    'label': STATE_WISE_USERS,
                    'series': Object.values(superDashboardData?.stateWiseUsers)
                })
            }
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

    return (
        <React.Fragment>
            <ReprocessButton>
                <Tooltip title="Reprocess paper" arrow>
                    <IconButton
                        onClick={ handleShow }>
                        <FeedIcon />
                    </IconButton>
                </Tooltip>
            </ReprocessButton>
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
                                <><Skeleton
                                    variant="circular"
                                    style={ { margin: "auto" } }
                                    height={ 250 }
                                    width={ 250 }
                                />
                                    <Skeleton style={ { marginTop: "30px" } } /></> :
                                superDashboardData && chartData?.label?.length > 0 ?
                                    <PieChart
                                        type="pie"
                                        filename={ value }
                                        pieChartPadding="0px 2px"
                                        height={ 370 }
                                        label={ chartData?.label }
                                        series={ chartData?.series }
                                    />
                                    : <ErrorBlock message={ DOCUMENT_PROCESSED_NOT_FOUND } />
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
                                superDashboardData && submissionChartData?.xaxisData?.length > 0 ?
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
            { reprocess &&
                <DialogModal
                    headingTitle={ 'Paper Id' }
                    isOpen={ true }
                    fullWidth="sm"
                    maxWidth="sm"
                    handleClose={ closeSearchDialog }
                >
                    <form onSubmit={ handleSubmit(onSearch) }>
                        <TextField
                            sx={ { marginTop: '0px' } }
                            fullWidth
                            name='paperId'
                            type="number"
                            variant="outlined"
                            { ...register('paperId', { required: true }) }
                            error={ errors['paperId'] }
                            helperText={ errors['paperId'] && REPROCESS_PAPER_ID }
                            FormHelperTextProps={ {
                                className: classes.helperText
                            } }
                        />
                        <div style={ { textAlign: 'center', marginTop: '10px' } }>
                            <Button color='primary' disabled={ isLoadingReprocess } type="submit" variant="contained" size="large" fullWidth>
                                { isLoadingReprocess ? <BeatLoader color="#fff" /> : 'Submit' }
                            </Button>
                        </div>
                    </form>
                </DialogModal>
            }
        </React.Fragment>
    );
};
const mapStateToProps = (state) => ({
    superDashboardData: state?.superAdmin?.data,
    isLoading: state?.superAdmin?.isLoading,
    isLoadingReprocess: state?.submission?.isLoadingReprocess
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetWidgetCount: () => dispatch(GetWidgetCount()),
        SubmissionReprocess: (paperId) => dispatch(SubmissionReprocess(paperId)),
    };
};

Dashboard.layout = SuperAdmin;

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);