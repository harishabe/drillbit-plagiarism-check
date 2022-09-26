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
import { PaginationContainer } from '../style/index';
import Pagination from '@mui/material/Pagination';
import { PaginationValue } from '../../utils/PaginationUrl';
import END_POINTS from '../../utils/EndPoints';

const ExtremeBreadCrumb = [
    {
        name: 'Dashboard',
        link: '/super/dashboard',
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
    { id: 'lid', label: 'License Id' },
    { id: 'name', label: 'Admin name' },
    { id: 'email', label: 'Email' },
    { id: 'college_name', label: 'Institution name' },
    { id: 'country', label: 'Location' },
    { id: 'instructors', label: 'Instructors', },
    { id: 'students', label: 'Students' },
    { id: 'documents', label: 'Documents' },
    { id: 'action', label: 'Action' }
]

function createData(lid, name, email, college_name, country, instructors, students, documents, action) {
    return { lid, name, email, college_name, country, instructors, students, documents, action }
}

const ExtremProduct = ({
    GetExtremeRefData,
    pageDetails,
    extremeData,
    isLoading
}) => {

    const [rows, setRows] = useState([]);
    const [paginationPayload, setPaginationPayload] = useState({
        page: PaginationValue?.page,
        size: PaginationValue?.size,
        field: 'name',
        orderBy: PaginationValue?.orderBy,
    });

    useEffect(() => {
        GetExtremeRefData(END_POINTS.SUPER_ADMIN_EXTREME, paginationPayload);
    }, [, paginationPayload]);

    useEffect(() => {
        let row = '';
        let arr = [];
        extremeData?.map((data) => {
            row =
                createData(
                    data.lid,
                    data.name,
                    data.email,
                    data.college_name,
                    data.country,
                    data.instructors,
                    data.students,
                    data.documents,
                    [{ 'component': <EditIcon />, 'type': 'edit', 'title': 'Edit' }],
                );
            arr.push(row)
        });
        setRows([...arr]);
    }, [extremeData]);

    const handleChange = (event, value) => {
        event.preventDefault();
        setPaginationPayload({ ...paginationPayload, 'page': value - 1 })
    };

    return (
        <>
            <BreadCrumb item={ ExtremeBreadCrumb } />

            <Box sx={ { mt: 1, flexGrow: 1 } }>
                <CardView>
                    <CommonTable
                        isCheckbox={ false }
                        isSorting={ true }
                        tableHeader={ columns }
                        tableData={ rows }
                        isLoading={ isLoading }
                        charLength={ 7 }
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

            <PaginationContainer>
                <Pagination
                    count={ pageDetails?.totalPages }
                    onChange={ handleChange }
                    color="primary"
                    variant="outlined"
                    shape="rounded"
                />
            </PaginationContainer>
        </>
    )
};

const mapStateToProps = (state) => ({
    pageDetails: state?.superAdmin?.ExtrRefData?.page,
    extremeData: state?.superAdmin?.ExtrRefData?._embedded?.licenseDTOList,
    isLoading: state?.superAdmin?.isLoadingExtrRef,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetExtremeRefData: (url, paginationPayload) => dispatch(GetExtremeRefData(url, paginationPayload)),
    };
};

ExtremProduct.layout = SuperAdmin;

export default connect(mapStateToProps, mapDispatchToProps)(ExtremProduct)