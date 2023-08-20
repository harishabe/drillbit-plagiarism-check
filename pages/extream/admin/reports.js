import React, { useState } from 'react';
import { connect } from 'react-redux';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Admin from './../../../layouts/Admin';
import { BreadCrumb, CardView, WidgetCard, Heading } from './../../../components';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { DownloadInstructorStudentData } from '../../../redux/action/admin/AdminAction';
import ReportForm from './form/ReportForm';
import END_POINTS from '../../../utils/EndPoints';
import { BASE_URL_EXTREM } from '../../../utils/BaseUrl';


const IntegrationBreadCrumb = [
    {
        name: 'Dashboard',
        link: '/extream/admin/dashboard',
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
        if (title.slice(0, 16) === 'Instructors list') {
            DownloadInstructorStudentData(BASE_URL_EXTREM + END_POINTS.ADMIN_REPORTS_DOWNLOAD_INSTRUCTOR_LIST + 'instructors/download', 'Instructors');
            setUsersType('instructors');
        } else if (title.slice(0, 13) === 'Students list') {
            DownloadInstructorStudentData(BASE_URL_EXTREM + END_POINTS.ADMIN_REPORTS_DOWNLOAD_INSTRUCTOR_LIST + 'students/download', 'Students');
            setUsersType('students');
        }
    };

    return (
        <React.Fragment>
            <BreadCrumb item={IntegrationBreadCrumb} />
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item md={6} xs={12}>
                        <WidgetCard
                            isClickAble={true}
                            title={ `Instructors list (${(reportsData?.no_of_instructors !== undefined ? reportsData?.no_of_instructors : 0)})` }
                            toolTipTxt='Download instructors'
                            handleDownload={handDownload}
                            isLoading={isLoading}
                            isLoadingIcon={usersType === 'instructors' ? isLoadingDownload : false}
                            icon={ <FileDownloadOutlinedIcon fontSize='small' /> }
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <WidgetCard
                            title={ `Students list (${(reportsData?.no_of_students !== undefined ? reportsData?.no_of_students : 0)})` }
                            toolTipTxt='Download students'
                            isClickAble={true}
                            handleDownload={handDownload}
                            isLoading={isLoading}
                            isLoadingIcon={usersType === 'students' ? isLoadingDownload : false}
                            icon={ <FileDownloadOutlinedIcon fontSize='small' /> }
                        />
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ mt: 3, flexGrow: 1 }}>
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


Reports.layout = Admin;

export default connect(mapStateToProps, mapDispatchToProps)(Reports);
