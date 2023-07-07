import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import Admin from '../../../../../layouts/Admin';
import { Box, Grid } from '@mui/material';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import { GoogleClassroomTable, StatusDot, BreadCrumb } from '../../../../../components';
import {
    GetGoogleCourseHome,
    ClearGoogleImportStatus
} from '../../../../../redux/action/admin/AdminAction';
import { formatDate } from '../../../../../utils/RegExp';

const IntegrationBreadCrumb = [
    {
        name: 'Dashboard',
        link: '/extream/admin/dashboard',
        active: false,
    },
    {
        name: 'Integrations',
        link: '/extream/admin/integration',
        active: false,
    },
    {
        name: 'Courses',
        link: '/extream/admin/integration/google/coursesDashboard',
        active: false,
    },
    {
        name: 'Classwork',
        link: '',
        active: true,
    },
];

const columns = [
    { id: 'course_id', label: 'Assignment ID', maxWidth: 100 },
    { id: 'name', label: 'Assignment Name', maxWidth: 100 },
    { id: 'creation_date', label: 'Start date', maxWidth: 100 },
    { id: 'status', label: 'Status', maxWidth: 100 },
    { id: 'action', label: 'Actions', maxWidth: 100 }
];

function createData(course_id, name, creation_date, status, action) {
    return { course_id, name, creation_date, status, action };
};

const Classwork = ({
    GetGoogleCourseHome,
    ClearGoogleImportStatus,
    googleCourseHomeData,
    isLoadingCourseHome
}) => {
    const router = useRouter();
    const [rows, setRows] = useState([]);

    useEffect(() => {
        ClearGoogleImportStatus()
        GetGoogleCourseHome();
    }, []);

    useEffect(() => {
        let row = '';
        let arr = [];
        googleCourseHomeData?.map((data) => {
            row =
                createData(
                    // <AvatarName avatarText="C" title={ data.course_id } color='#4795EE' />,
                    data.course_id,
                    data.name,
                    formatDate(data.creation_date),
                    <StatusDot color={ (data.status.toUpperCase() === 'ACTIVE') ? '#38BE62' : '#E9596F' } title={ data.status } />,
                    ([
                        { 'component': <SettingsIcon />, 'type': 'settings', 'title': 'Settings' },
                        { 'component': <ArrowForwardOutlinedIcon />, 'type': 'nextPath', 'title': 'Next' }
                    ]),
                );
            row['isSelected'] = false;
            arr.push(row);
        });
        setRows([...arr]);
    }, [googleCourseHomeData]);

    const handleAction = (event, icon, rowData) => {
        if (icon === 'settings') {
            // let activateDeactive = {
            //     'id': rowData?.user_id,
            //     'status': 'INACTIVE'
            // };
            // setStatusRowData(activateDeactive);
            // setStatusWarning(true);
            // setStatusMessage('inactive');
            console.log('settings')
        } else if (icon === 'nextPath') {
            // router.push({
            //     pathname: '/extream/admin/integration/google/assignments',
            //     query: {
            //         name: rowData.assignment_name?.props?.title, folderId: rowData.ass_id, grammar: grammarSubscription?.toUpperCase() === 'YES' ? rowData.grammarCheck : grammarSubscription
            //     }
            // });
            console.log('submission')
        }
    };

    return (
        <>
            <Box sx={ { flexGrow: 1 } }>
                <Grid container spacing={ 1 }>
                    <Grid item md={ 12 } xs={ 10 }>
                        <BreadCrumb item={ IntegrationBreadCrumb } />
                    </Grid>
                </Grid>
            </Box>

            <GoogleClassroomTable
                isCheckbox={ false }
                isSorting={ true }
                tableHeader={ columns }
                tableData={ rows }
                isLoading={ isLoadingCourseHome }
                handleAction={ handleAction }
            />
        </>
    )
}


const mapStateToProps = (state) => ({
    googleCourseHomeData: state?.adminIntegrationData?.googleCourseHomeData?._embedded?.googleCourseDTOList,
    isLoadingCourseHome: state?.adminIntegrationData?.isLoadingCourseHome,
});

const mapDispatchToProps = (dispatch) => {
    return {
        ClearGoogleImportStatus: () => dispatch(ClearGoogleImportStatus()),
        GetGoogleCourseHome: () => dispatch(GetGoogleCourseHome()),
    };
};

Classwork.layout = Admin;

export default connect(mapStateToProps, mapDispatchToProps)(Classwork);