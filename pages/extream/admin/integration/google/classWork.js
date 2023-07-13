import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import Admin from '../../../../../layouts/Admin';
import { StatusColor } from '../../../../../style/index';
import { Box, Grid, Pagination, Tooltip } from '@mui/material';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import { GoogleClassroomTable, BreadCrumb } from '../../../../../components';
import {
    GetGoogleClassWork
} from '../../../../../redux/action/admin/AdminAction';
import { formatDate } from '../../../../../utils/RegExp';
import { PaginationValue } from '../../../../../utils/PaginationUrl';
import { PaginationContainer } from '../../../../../style/index';

const columns = [
    { id: 'coursework_id', label: 'Assignment ID', maxWidth: 150 },
    { id: 'title', label: 'Assignment Name', maxWidth: 160 },
    { id: 'creation_time', label: 'Start date', maxWidth: 150 },
    { id: 'drive_link', label: 'Drive link', maxWidth: 150 },
    { id: 'action', label: 'Actions', maxWidth: 150 }
];

function createData(coursework_id, title, creation_time, drive_link, action) {
    return { coursework_id, title, creation_time, drive_link, action };
};

const Classwork = ({
    GetGoogleClassWork,
    googleClassWorkData,
    pageDetails,
    isLoadingClassWork
}) => {
    const router = useRouter();
    const [rows, setRows] = useState([]);
    const [paginationPayload, setPaginationPayload] = useState({
        page: PaginationValue?.page,
        size: PaginationValue?.size,
        field: 'user_id',
        orderBy: PaginationValue?.orderBy,
    });

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
            name: router?.query?.courseName,
            link: '',
            active: true,
        },
    ];

    useEffect(() => {
        if (router.isReady) {
            GetGoogleClassWork(router?.query?.courseId, paginationPayload);
        }
    }, [router.isReady, paginationPayload]);

    useEffect(() => {
        let row = '';
        let arr = [];
        googleClassWorkData?.map((data) => {
            row =
                createData(
                    data.coursework_id,
                    data.title,
                    formatDate(data.creation_time),
                    <a style={ { cursor: 'pointer' } } href={ data.drive_folder_alternate_link } target='_blank' >
                        <Tooltip title='Google drive link' arrow>
                            <StatusColor color='#E5E5E5'>
                                <OpenInNewOutlinedIcon fontSize='small' />
                            </StatusColor>
                        </Tooltip>
                    </a>,
                    ([
                        { 'component': <SettingsIcon />, 'type': 'settings', 'title': 'Settings' },
                        { 'component': <ArrowForwardOutlinedIcon />, 'type': 'nextPath', 'title': 'Next' }
                    ]),
                );
            row['isSelected'] = false;
            arr.push(row);
        });
        setRows([...arr]);
    }, [googleClassWorkData]);

    const handleAction = (event, icon, rowData) => {
        if (icon === 'settings') {
            console.log('settings')
        } else if (icon === 'nextPath') {
            router.push({
                pathname: '/extream/admin/integration/google/submissions',
                query: {
                    courseName: router?.query?.courseName, courseId: router?.query?.courseId, assName: rowData.title, assId: rowData.coursework_id,
                }
            });
        }
    };

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
                isLoading={ isLoadingClassWork }
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
    googleClassWorkData: state?.adminIntegrationData?.googleClassWorkData?._embedded?.google_CourseworkList,
    pageDetails: state?.adminIntegrationData?.googleClassWorkData?.page,
    isLoadingClassWork: state?.adminIntegrationData?.isLoadingClassWork,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetGoogleClassWork: (id, paginationPayload) => dispatch(GetGoogleClassWork(id, paginationPayload)),
    };
};

Classwork.layout = Admin;

export default connect(mapStateToProps, mapDispatchToProps)(Classwork);