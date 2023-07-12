import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import Admin from '../../../../../layouts/Admin';
import { makeStyles } from '@mui/styles';
import { Box, Switch, Grid, Button, Pagination } from '@mui/material';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { GoogleClassroomTable, StatusDot, BreadCrumb, WarningDialog } from '../../../../../components';
import {
    GetGoogleCourseHome,
    ClearGoogleImportStatus,
    GoogleCourseStatus
} from './../../../../../redux/action/admin/AdminAction';
import { formatDate } from '../../../../../utils/RegExp';
import { PaginationValue } from '../../../../../utils/PaginationUrl';
import { PaginationContainer } from '../../../../../style/index';

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

const useStyles = makeStyles(() => ({
    button: {
        marginBottom: '10px'
    }
}));

const columns = [
    { id: 'course_id', label: 'Course ID', maxWidth: 100 },
    { id: 'name', label: 'Course Name', maxWidth: 150 },
    { id: 'creation_date', label: 'Start date', maxWidth: 100 },
    { id: 'status', label: 'Status', maxWidth: 100 },
    { id: 'action', label: 'Actions', maxWidth: 100 }
];

function createData(course_id, name, creation_date, status, action, id) {
    return { course_id, name, creation_date, status, action, id };
};

const CoursesDashboard = ({
    GetGoogleCourseHome,
    GoogleCourseStatus,
    ClearGoogleImportStatus,
    googleCourseHomeData,
    pageDetails,
    isLoadingCourseHome,
    isLoadingCourseStatus
}) => {
    const classes = useStyles();
    const router = useRouter();
    const [rows, setRows] = useState([]);
    const [statusRowData, setStatusRowData] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    const [showStatusWarning, setStatusWarning] = useState(false);
    const [paginationPayload, setPaginationPayload] = useState({
        page: PaginationValue?.page,
        size: PaginationValue?.size,
        field: 'user_id',
        orderBy: PaginationValue?.orderBy,
    });

    useEffect(() => {
        ClearGoogleImportStatus()
        GetGoogleCourseHome(paginationPayload);
    }, [, paginationPayload]);

    useEffect(() => {
        let row = '';
        let arr = [];
        googleCourseHomeData?.map((data) => {
            row =
                createData(
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
                    data.id
                );
            row['isSelected'] = false;
            arr.push(row);
        });
        setRows([...arr]);
    }, [googleCourseHomeData]);

    const handleChange = (event, value) => {
        event.preventDefault();
        setPaginationPayload({ ...paginationPayload, 'page': value - 1 });
    };

    const handleTableSort = (e, column, sortToggle) => {
        if (sortToggle) {
            paginationPayload['field'] = column.id;
            paginationPayload['orderBy'] = 'asc';
        } else {
            paginationPayload['field'] = column.id;
            paginationPayload['orderBy'] = 'desc';
        }
        setPaginationPayload({ ...paginationPayload, paginationPayload });
    };

    const handleAction = (event, icon, rowData) => {
        if (icon === 'lock') {
            let activateDeactive = {
                'id': rowData?.id,
                'url': 'disable'
            };
            setStatusRowData(activateDeactive);
            setStatusWarning(true);
            setStatusMessage('inactive');
        } else if (icon === 'unlock') {
            let activateDeactive = {
                'id': rowData?.id,
                'url': 'enable'
            };
            setStatusRowData(activateDeactive);
            setStatusWarning(true);
            setStatusMessage('active');
        } else if (icon === 'nextPath') {
            router.push({
                pathname: '/extream/admin/integration/google/classWork',
                query: {
                    name: rowData.name, courseId: rowData.course_id,
                }
            });
        }
    };

    const handleClick = () => {
        router.push('/extream/admin/integration/google/liveCourses')
    }

    const handleStatusWarning = () => {
        GoogleCourseStatus(statusRowData.url, statusRowData.id);
        setTimeout(() => {
            setStatusWarning(false);
        }, [100]);
    };

    const handleStatusCloseWarning = () => {
        setStatusWarning(false);
    };

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
                            className={ classes.button }
                            size='small'
                        >
                            Import Courses
                        </Button>
                    </Grid>
                </Grid>
            </Box>

            {
                showStatusWarning &&
                <WarningDialog
                    message={ 'Are you sure, you want to ' + statusMessage + '?' }
                    handleYes={ handleStatusWarning }
                    handleNo={ handleStatusCloseWarning }
                    isOpen={ true }
                />
            }

            <GoogleClassroomTable
                isCheckbox={ false }
                isSorting={ true }
                tableHeader={ columns }
                tableData={ rows }
                isLoading={ isLoadingCourseHome || isLoadingCourseStatus }
                handleAction={ handleAction }
                handleTableSort={ handleTableSort }
            />

            <PaginationContainer>
                <Pagination
                    count={ pageDetails?.totalPages }
                    page={ pageDetails?.number + 1 }
                    onChange={ handleChange }
                    color="primary"
                    variant="outlined"
                    shape="rounded"
                />
            </PaginationContainer>
        </>
    )
}


const mapStateToProps = (state) => ({
    googleCourseHomeData: state?.adminIntegrationData?.googleCourseHomeData?._embedded?.googleCourseDTOList,
    pageDetails: state?.adminIntegrationData?.googleCourseHomeData?.page,
    isLoadingCourseHome: state?.adminIntegrationData?.isLoadingCourseHome,
    isLoadingCourseStatus: state?.adminIntegrationData?.isLoadingCourseStatus,
});

const mapDispatchToProps = (dispatch) => {
    return {
        ClearGoogleImportStatus: () => dispatch(ClearGoogleImportStatus()),
        GetGoogleCourseHome: (paginationPayload) => dispatch(GetGoogleCourseHome(paginationPayload)),
        GoogleCourseStatus: (apiUrl, id) => dispatch(GoogleCourseStatus(apiUrl, id)),
    };
};

CoursesDashboard.layout = Admin;

export default connect(mapStateToProps, mapDispatchToProps)(CoursesDashboard);