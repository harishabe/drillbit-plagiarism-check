import React, { useState, useEffect } from 'react';
import SuperAdmin from './../../layouts/SuperAdmin';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { connect } from 'react-redux';
import {
    WidgetCard,
    CardView,
    CommonTable,
} from './../../components';
import {
    EditIcon,
    DeleteIcon,
    NoOfClassIcon,
    NoOfAssignmntIcon,
    NoOfSubmission,
} from '../../assets/icon';
import { GetWidgetCount } from '../../redux/action/super/SuperAdminAction';

const columns = [
    { id: 'id', label: 'Sl.no' },
    { id: 'name', label: 'Name' },
    { id: 'email', label: 'Username' },
    { id: 'college', label: 'College Name', minWidth: 148 },
    { id: 'INlimit', label: 'Instructors Limit', minWidth: 145 },
    { id: 'STlimit', label: 'Students Limit', minWidth: 147 },
    { id: 'DOlimit', label: 'Documents Limit', minWidth: 163 },
    { id: 'action', label: 'Action' }
]

function createData(id, name, email, college, INlimit, STlimit, DOlimit, action) {
    return { id, name, email, college, INlimit, STlimit, DOlimit, action }
}


// const rows = [
//     createData(
//         1001,
//         'Harisha B E',
//         'harish@drillbit.com',
//         'MIT',
//         100,
//         1000,
//         1737,
//         [{ 'component': <EditIcon />, 'type': 'edit' }]
//     ),
//     createData(
//         1001,
//         'Harisha B E',
//         'harish@drillbit.com',
//         'MIT',
//         100,
//         1000,
//         1737,
//         [{ 'component': <EditIcon />, 'type': 'edit' }]
//     ),
//     createData(
//         1001,
//         'Harisha B E',
//         'harish@drillbit.com',
//         'MIT',
//         100,
//         1000,
//         1737,
//         [{ 'component': <EditIcon />, 'type': 'edit' }]
//     ),
// ]

const Dashboard = ({
    GetWidgetCount,
    superDashboardData,
    isLoading
}) => {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        GetWidgetCount();
    }, []);

    // useEffect(() => {
    //     let row = '';
    //     let arr = [];
    //     superDashboardData?.map((data) => {
    //         row =
    //             createData(
    //                 data.id,
    //                 data.name,
    //                 data.email,
    //                 data.college,
    //                 data.INlimit,
    //                 data.STlimit,
    //                 data.DOlimit,
    //                 [{ 'component': <EditIcon />, 'type': 'edit' }]
    //             );
    //         arr.push(row)
    //     });
    //     setRows([...arr]);
    // }, [superDashboardData]);

    return (
        <React.Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={ 1 } >
                    <Grid item md={4} xs={12}>
                        <WidgetCard
                            title='Institutions'
                            isLoading={ isLoading }
                            count={ isLoading ? '' : superDashboardData?.data?.totalInstitutes }
                            icon={<NoOfClassIcon />}
                        />
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <WidgetCard
                            title='Users'
                            isLoading={ isLoading }
                            count={ isLoading ? '' : superDashboardData?.data?.totalUsers }
                            icon={<NoOfAssignmntIcon />}
                        />
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <WidgetCard
                            title='Submissions'
                            isLoading={ isLoading }
                            count={ isLoading ? '' : superDashboardData?.data?.totalSubmissions }
                            icon={<NoOfSubmission />}
                        />
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ mt: 1, flexGrow: 1 }}>
                <CardView>
                    <CommonTable
                        isCheckbox={false}
                        isSorting={ true }
                        tableHeader={columns}
                        tableData={ rows }
                        isActionIcon={true}
                        isLoading={ isLoading }
                        charLength={ 10 }
                    />
                </CardView>
            </Box>
        </React.Fragment>
    )
}
const mapStateToProps = (state) => ({
    superDashboardData: state?.superAdmin,
    isLoading: state?.superAdmin?.isLoading,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetWidgetCount: () => dispatch(GetWidgetCount()),
    };
};

Dashboard.layout = SuperAdmin

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
