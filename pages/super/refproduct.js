import React, { useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { Grid, TextField, Box } from '@mui/material';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import debouce from 'lodash.debounce';
import SuperAdmin from './../../layouts/SuperAdmin';
import styled from 'styled-components';
import {
    BreadCrumb,
    CreateDrawer,
    CardView,
    CommonTable,
    WarningDialog
} from './../../components';
import {
    EditIcon,
    DeleteWarningIcon,
    DeleteIcon
} from '../../assets/icon';
import {
    GetExtremeRefData,
    DeleteAccount
} from '../../redux/action/super/SuperAdminAction';
import RefForm from './form/RefForm';
import { PaginationContainer } from '../../style/index';
import Pagination from '@mui/material/Pagination';
import { PaginationValue } from '../../utils/PaginationUrl';
import END_POINTS from '../../utils/EndPoints';

const RefBreadCrumb = [
    {
        name: 'Dashboard',
        link: '/super/dashboard',
        active: false,
    },
    {
        name: 'Pro',
        link: '',
        active: true,
    },
];

const AddButtonBottom = styled.div`
    position:fixed;
    bottom: 30px;
    right:30px;
`;

const columns = [
    { id: 'lid', label: 'Sl.no' },
    { id: 'name', label: 'Admin username', minWidth: 150 },
    { id: 'email', label: 'Email' },
    { id: 'college_name', label: 'Institution name', minWidth: 150 },
    { id: 'country', label: 'Location' },
    { id: 'instructors', label: 'Users' },
    { id: 'documents', label: 'Documents' },
    { id: 'action', label: 'Action' }
];

function createData(lid, name, email, college_name, country, instructors, documents, action, state, address, designation, phone, created_date, expiry_date, document_type, grammar, grammar_documents, license_type, product_type, timeZone, folpath, department
) {
    return {
        lid, name, email, college_name, country, instructors, documents, action, state
        , address, designation, phone, created_date, expiry_date, document_type, grammar, grammar_documents, license_type, product_type, timeZone, folpath, department
    };
}

const RefProduct = ({
    GetExtremeRefData,
    DeleteAccount,
    pageDetails,
    refData,
    isLoading
}) => {
    const router = useRouter();
    const [rows, setRows] = useState([]);
    const [paginationPayload, setPaginationPayload] = useState({
        page: PaginationValue?.page,
        size: PaginationValue?.size,
        field: 'name',
        orderBy: PaginationValue?.orderBy,
    });
    const [editUser, setEditUser] = useState(false);
    const [editUserData, setEditUserData] = useState('');
    const [licenseId, setLicenseId] = useState(false);
    const [licenseIdData, setLicenseIdData] = useState('');

    useEffect(() => {
        GetExtremeRefData(END_POINTS.SUPER_ADMIN_REF, paginationPayload);
    }, [, paginationPayload]);

    useEffect(() => {
        let row = '';
        let arr = [];
        refData?.map((data) => {
            row =
                createData(
                    data.lid,
                    data.name,
                    data.email,
                    data.college_name,
                    data.country,
                    data.instructors,
                    data.documents,
                    [
                        { 'component': <EditIcon />, 'type': 'edit', 'title': 'Edit' },
                        { 'component': <DeleteIcon />, 'type': 'delete', 'title': 'Delete' },
                        { 'component': <ArrowForwardOutlinedIcon />, 'type': 'nextPath', 'title': 'Next' }
                    ],
                    data.state,
                    data.address,
                    data.designation,
                    data.phone,
                    data.created_date,
                    data.expiry_date,
                    data.document_type,
                    data.grammar,
                    data.grammar_documents,
                    data.license_type,
                    data.product_type,
                    data.timeZone,
                    data.folpath,
                    data.department,
                );
            arr.push(row);
        });
        setRows([...arr]);
    }, [refData]);

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

    const handleChange = (event, value) => {
        event.preventDefault();
        setPaginationPayload({ ...paginationPayload, 'page': value - 1 });
    };

    const handleAction = (event, icon, rowData) => {
        if (icon === 'edit') {
            setEditUser(true);
            setEditUserData(rowData);
        } else if (icon === 'delete') {
            setLicenseId(true);
            setLicenseIdData(rowData);
        } else if (icon === 'nextPath') {
            router.push({
                pathname: '/super/proUser',
                query: {
                    name: rowData?.name,
                    licenseId: rowData?.lid,
                }
            });
        }
    };

    const handleCloseDrawer = (drawerClose) => {
        setEditUser(drawerClose);
    };

    /** search implementation using debounce concepts */

    const handleSearch = (event) => {
        if (event.target.value !== '') {
            paginationPayload['search'] = event.target.value;
            setPaginationPayload({ ...paginationPayload, paginationPayload });
        } else {
            delete paginationPayload['search'];
            setPaginationPayload({ ...paginationPayload, paginationPayload });
        }
    };

    const debouncedResults = useMemo(() => {
        return debouce(handleSearch, 300);
    }, []);

    useEffect(() => {
        return () => {
            debouncedResults.cancel();
        };
    });

    /** end debounce concepts */

    const handleStatusWarning = () => {
        DeleteAccount(licenseIdData?.lid, 'pro');
        setTimeout(() => {
            setLicenseId(false);
        }, [100]);
    };

    const handleStatusCloseWarning = () => {
        setLicenseId(false);
    };
    return (
        <>
            <Grid container spacing={ 1 }>
                <Grid item md={ 6 } xs={ 12 } style={ { textAlign: 'right' } }>
                    <BreadCrumb item={ RefBreadCrumb } />
                </Grid>
                <Grid item md={ 6 } xs={ 12 } style={ { textAlign: 'right' } }>
                    <TextField
                        sx={ { width: '40%' } }
                        placeholder='Search'
                        onChange={ debouncedResults }
                        inputProps={ {
                            style: {
                                padding: 5,
                                display: 'inline-flex',
                            },
                        } }
                    />
                </Grid>
            </Grid>

            <Box sx={ { mt: 1, flexGrow: 1 } }>
                <CardView>
                    <CommonTable
                        isCheckbox={ false }
                        isSorting={ true }
                        tableHeader={ columns }
                        tableData={ rows }
                        isLoading={ isLoading }
                        charLength={ 10 }
                        handleAction={ handleAction }
                        handleTableSort={ handleTableSort }
                    />
                </CardView>
            </Box>

            {
                editUser &&
                <CreateDrawer
                    title="Edit User"
                    isShowAddIcon={ false }
                    showDrawer={ editUser }
                    handleDrawerClose={ handleCloseDrawer }
                >
                    <RefForm
                        editData={ editUserData }
                    />
                </CreateDrawer>
            }

            {
                licenseId &&
                <WarningDialog
                    warningIcon={ <DeleteWarningIcon /> }
                    message={ 'Are you sure, you want to delete account?' }
                    handleYes={ handleStatusWarning }
                    handleNo={ handleStatusCloseWarning }
                    isOpen={ true }
                />
            }

            <AddButtonBottom>
                <CreateDrawer
                    title="Add Ref Account"
                    isShowAddIcon={ true }
                >
                    <RefForm />
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
    );
};

const mapStateToProps = (state) => ({
    pageDetails: state?.superAdmin?.ExtrRefData?.page,
    refData: state?.superAdmin?.ExtrRefData?._embedded?.licenseDTOList,
    isLoading: state?.superAdmin?.isLoadingExtrRef,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetExtremeRefData: (url, paginationPayload) => dispatch(GetExtremeRefData(url, paginationPayload)),
        DeleteAccount: (licenseId, role) => dispatch(DeleteAccount(licenseId, role)),
    };
};

RefProduct.layout = SuperAdmin;

export default connect(mapStateToProps, mapDispatchToProps)(RefProduct);