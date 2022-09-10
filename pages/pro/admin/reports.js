import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ProAdmin from './../../../layouts/ProAdmin';
import { BreadCrumb, CardView, WidgetCard, Heading } from '../../../components';
import { DownloadIcon } from '../../../assets/icon';
import { DownloadInstructorStudentData } from '../../../redux/action/admin/AdminAction';
import ReportForm from './form/ReportForm';
import END_POINTS_PRO from '../../../utils/EndPointPro';
import { BASE_URL_PRO } from '../../../utils/BaseUrl';

const IntegrationBreadCrumb = [
    {
        name: 'Dashboard',
        link: '/pro/admin/dashboard',
        active: false,
    },
    {
        name: 'Reports',
        link: '',
        active: true,
    },
];

const Reports = ({
    reportsData,
    DownloadInstructorStudentData,
    isLoadingDownload,
    isLoading,
}) => {

    const [usersType, setUsersType] = useState('');

    const handDownload = (e, title) => {
        if (title.slice(0, 10) === 'Users list') {
            DownloadInstructorStudentData(BASE_URL_PRO + END_POINTS_PRO.ADMIN_REPORTS_DOWNLOAD_USER_LIST, 'Users');
            setUsersType('users');
        }
    };

    return (
        <React.Fragment>
            <BreadCrumb item={ IntegrationBreadCrumb } />
            <Box sx={ { flexGrow: 1 } }>
                <Grid container spacing={ 1 }>
                    <Grid item md={ 6 } xs={ 12 }>
                        <WidgetCard
                            isClickAble={ true }
                            title={ `Users list (${(reportsData?.no_of_users !== undefined ? reportsData?.no_of_users : 0)})` }
                            toolTipTxt='Download Users'
                            handleDownload={ handDownload }
                            isLoading={ isLoading }
                            isLoadingIcon={ usersType === 'users' ? isLoadingDownload : false }
                            icon={ <DownloadIcon /> }
                        />
                    </Grid>
                </Grid>
            </Box>
            <Box sx={ { mt: 3, flexGrow: 1 } }>
                <CardView>
                    <Heading title='Reports' />
                    <ReportForm />
                </CardView>
            </Box>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => ({
    reportsData: state?.adminReport?.reportData,
    isLoading: state?.adminReport?.isLoading,
    isLoadingDownload: state?.adminReport?.isLoadingDownload,
});

const mapDispatchToProps = (dispatch) => {
    return {
        DownloadInstructorStudentData: (url, userType) => dispatch(DownloadInstructorStudentData(url, userType)),
    };
};


Reports.layout = ProAdmin;

export default connect(mapStateToProps, mapDispatchToProps)(Reports);

