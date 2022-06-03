import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Skeleton, TextField } from '@mui/material';
import Admin from './../../layouts/Admin';
import { BreadCrumb } from './../../components';
import { CardView, CommonTable, MainHeading, SubTitle, StatusDot, AvatarName } from '../../components';
import { DeleteIcon, LockIcon, InfoIcon, StatsIcon } from '../../assets/icon';
import { GetInstructorData } from '../../redux/action/admin/AdminAction';

const columns = [
    { id: 'id', label: 'ID', minWidth: 100 },
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'email', label: 'Email', minWidth: 170 },
    { id: 'creationDate', label: 'Creation Date', minWidth: 170 },
    { id: 'status', label: 'Status', minWidth: 170 },
    { id: 'stats', label: 'Stats', minWidth: 100 },
    { id: 'action', label: 'Action', minWidth: 100 }
]

function createData(id, name, email, creationDate, status, stats, action) {
    return { id, name, email, creationDate, status, stats, action }
};

const rows = [
    createData(<AvatarName title='S101' color='#4795EE' />, 'Harisha B E', 'harish@drillbit.com', '2022-01-06', <StatusDot color="#38BE62" title="Active" />, <StatsIcon />, [<DeleteIcon />, <LockIcon />]),
    createData(<AvatarName title='S102' color='#5E47EE' />, 'Harisha B E', 'harish@drillbit.com', '2022-01-06', <StatusDot color="#38BE62" title="Active" />, <StatsIcon />, [<DeleteIcon />, <LockIcon />]),
    createData(<AvatarName title='S103' color='#EE4747' />, 'Harisha B E', 'harish@drillbit.com', '2022-01-06', <StatusDot color="#E9596F" title="In Active" />, <StatsIcon />, [<DeleteIcon />, <LockIcon />]),
]

const actionIcon = [<DeleteIcon />, <LockIcon />]

const InstructorBreadCrumb = [
    {
        name: 'Dashboard',
        link: '/admin/dashboard',
        active: false,
    },
    {
        name: 'Instructors',
        link: '',
        active: true,
    },
]

const Instructor = ({
    GetInstructorData,
    instructorData,
    isLoading
}) => {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        GetInstructorData();
    }, []);

    useEffect(() => {
        let row = ''
        instructorData?.map((instructor) => {
            row =
                createData(
                    <AvatarName title={'s' + instructor.id} color='#4795EE' />,
                    instructor.name,
                    instructor.username,
                    instructor.creation_date,
                    <StatusDot color={instructor.status === 'active' ? '#38BE62' : '#E9596F'} title={instructor.status} />,
                    <StatsIcon />,
                    [<DeleteIcon />, <LockIcon />]
                );
            rows.push(row)
        });
        setRows([...rows]);
    }, [instructorData]);

    console.log('isLoading', isLoading);
    return (
        <React.Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item md={10} xs={10}>
                        <BreadCrumb item={InstructorBreadCrumb} />
                    </Grid>
                    {/* <Grid item md={2} xs={2}>
                        <TextField
                            placeholder='Search'
                            inputProps={{
                                style: {
                                    padding: 5,
                                    display: 'inline-flex'
                                }
                            }}
                        />
                    </Grid> */}
                </Grid>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item md={10}>
                        <MainHeading title='Instructors(3)' />
                    </Grid>
                    {/* <Grid item md={2} xs container direction='row' justifyContent={'right'}>
                        <SubTitle title='6/10 users' />
                        <InfoIcon />
                    </Grid> */}
                </Grid>
            </Box>
            <CardView>
                {isLoading ? <Skeleton /> :
                    <CommonTable
                        isCheckbox={true}
                        tableHeader={columns}
                        tableData={rows}
                        actionIcon={actionIcon}
                        isActionIcon={true}
                        charLength={20}
                    />}
            </CardView>
        </React.Fragment>
    )
}


const mapStateToProps = (state) => ({
    instructorData: state?.detailsData?.instructorData?._embedded?.instructorDTOList,
    isLoading: state?.detailsData?.isLoading,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetInstructorData: () => dispatch(GetInstructorData())
    };
};

Instructor.layout = Admin

export default connect(mapStateToProps, mapDispatchToProps)(Instructor);