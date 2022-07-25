import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import SuperAdmin from './../../layouts/SuperAdmin'
import styled from 'styled-components';
import Box from '@mui/material/Box';
import {
    BreadCrumb,
    CreateDrawer,
    CardView,
    CommonTable,
} from './../../components';
import {
    EditIcon,
} from '../../assets/icon';
import {
    GetExtremeRefData,
} from '../../redux/action/super/SuperAdminAction'
import ExtremeForm from './form/ExtremeForm';

const ExtremeBreadCrumb = [
    {
        name: 'Dashboard',
        link: '/admin/dashboard',
        active: false,
    },
    {
        name: 'Extreme',
        link: '',
        active: true,
    },
]

const AddButtonBottom = styled.div`
    position:fixed;
    bottom: 30px;
    right:30px;
`;

const columns = [
    { id: 'id', label: 'Sl.no' },
    { id: 'name', label: 'Name' },
    { id: 'email', label: 'Username (Email)' },
    { id: 'college', label: 'College Name' },
    { id: 'INlimit', label: 'Instructors Limit' },
    { id: 'STlimit', label: 'Students Limit' },
    { id: 'DOlimit', label: 'Documents Limit' },
    { id: 'action', label: 'Action' },
]

function createData(id, name, email, college, INlimit, STlimit, DOlimit, action) {
    return { id, name, email, college, INlimit, STlimit, DOlimit, action }
}

const data = [
    createData(
        1001,
        'Harisha B E',
        'harish@drillbit.com',
        'MIT',
        100,
        1000,
        1737,
        [{ 'component': <EditIcon />, 'type': 'edit' }]
    ),
    createData(
        1001,
        'Harisha B E',
        'harish@drillbit.com',
        'MIT',
        100,
        1000,
        1737,
        [{ 'component': <EditIcon />, 'type': 'edit' }]
    ),
    createData(
        1001,
        'Harisha B E',
        'harish@drillbit.com',
        'MIT',
        100,
        1000,
        1737,
        [{ 'component': <EditIcon />, 'type': 'edit' }]
    ),
]

const ExtremProduct = ({
    GetExtremeRefData,
    pageDetails,
    extremeData,
    isLoading
}) => {

    const [rows, setRows] = useState([]);

    useEffect(() => {
        GetExtremeRefData('extreme');
    }, []);

    useEffect(() => {
        let row = '';
        let arr = [];
        extremeData?.map((data) => {
            row =
                createData(
                    data.id,
                    data.name,
                    data.email,
                    data.college,
                    data.INlimit,
                    data.STlimit,
                    data.DOlimit,
                    [{ 'component': <EditIcon />, 'type': 'edit' }],
                );
            arr.push(row)
        });
        setRows([...arr]);
    }, [extremeData]);

    return (
        <>
            <BreadCrumb item={ ExtremeBreadCrumb } />

            <Box sx={ { mt: 1, flexGrow: 1 } }>
                <CardView>
                    <CommonTable
                        isCheckbox={ false }
                        tableHeader={ columns }
                        tableData={ data }
                        isLoading={ isLoading }
                    />
                </CardView>
            </Box>

            <AddButtonBottom>
                <CreateDrawer
                    title="Add Extreme Account"
                    isShowAddIcon={ true }
                >
                    <ExtremeForm />
                </CreateDrawer>
            </AddButtonBottom>
        </>
    )
};

const mapStateToProps = (state) => ({
    pageDetails: state?.superAdmin?.ExtrRefData?.list?.page,
    extremeData: state?.superAdmin?.ExtrRefData,
    isLoading: state?.superAdmin?.isLoadingExtrRef,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetExtremeRefData: (url) => dispatch(GetExtremeRefData(url)),
    };
};

ExtremProduct.layout = SuperAdmin;

export default connect(mapStateToProps, mapDispatchToProps)(ExtremProduct)