import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import Admin from '../../../../../layouts/Admin';
import { Box, Switch, Grid, Button } from '@mui/material';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { GoogleClassroomTable, StatusDot, BreadCrumb } from '../../../../../components';
import {
    GetGoogleCourseHome,
    ClearGoogleImportStatus
} from './../../../../../redux/action/admin/AdminAction';
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
        link: '',
        active: true,
    },
];

const columns = [
    { id: 'course_id', label: 'Course ID' },
    { id: 'name', label: 'Course Name' },
    { id: 'creation_date', label: 'Start date' },
    { id: 'status', label: 'Status' },
    { id: 'action', label: 'Actions' }
];

function createData(course_id, name, creation_date, status, action) {
    return { course_id, name, creation_date, status, action };
};

const CoursesDashboard = ({
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
                    // <AvatarName avatarText="I" title={data.id} color='#4795EE' />,
                    data.course_id,
                    data.name,
                    formatDate(data.creation_date),
                    <StatusDot color={ (data.status.toUpperCase() === 'ACTIVE') ? '#38BE62' : '#E9596F' } title={ data.status } />,
                    ([
                        {
                            'component': <Switch checked={ data.status === 'active' ? true : false } size="small" />,
                            'type': data.status === 'active' ? 'lock' : 'unlock',
                            'title': data.status === 'active' ? 'Activate' : 'De-activate'
                        },
                        { 'component': <ArrowForwardOutlinedIcon />, 'type': 'nextPath', 'title': 'Next' }
                    ]),
                );
            row['isSelected'] = false;
            arr.push(row);
        });
        setRows([...arr]);
    }, [googleCourseHomeData]);

    const handleAction = (event, icon, rowData) => {
        if (icon === 'lock') {
            let activateDeactive = {
                'id': rowData?.user_id,
                'status': 'INACTIVE'
            };
            setStatusRowData(activateDeactive);
            setStatusWarning(true);
            setStatusMessage('inactive');
        } else if (icon === 'unlock') {
            let activateDeactive = {
                'id': rowData?.user_id,
                'status': 'ACTIVE'
            };
            setStatusRowData(activateDeactive);
            setStatusWarning(true);
            setStatusMessage('active');
        } else if (icon === 'nextPath') {
            router.push({
                pathname: '/extream/instructor/folderSubmission',
                query: {
                    name: rowData.assignment_name?.props?.title, folderId: rowData.ass_id, grammar: grammarSubscription?.toUpperCase() === 'YES' ? rowData.grammarCheck : grammarSubscription
                }
            });
        }
    };

    const handleClick = () => {
        router.push('/extream/admin/integration/google/liveCourses')
    }

    return (
        <>
            <Box sx={ { flexGrow: 1 } }>
                <Grid container spacing={ 1 }>
                    <Grid item md={ 10 } xs={ 10 }>
                        <BreadCrumb item={ IntegrationBreadCrumb } />
                    </Grid>
                    <Grid item md={ 2 } xs={ 10 }>
                        <Button
                            variant="contained"
                            onClick={ handleClick }
                        >
                            Import Courses
                        </Button>
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

CoursesDashboard.layout = Admin;

export default connect(mapStateToProps, mapDispatchToProps)(CoursesDashboard);