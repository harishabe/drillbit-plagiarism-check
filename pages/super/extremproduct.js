import React, { useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { Grid, TextField, Box } from '@mui/material';
import debouce from 'lodash.debounce';
import SuperAdmin from './../../layouts/SuperAdmin';
import {
    BreadCrumb,
    CreateDrawer,
    CardView,
    CommonTable,
    WarningDialog
} from './../../components';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import {
    DeleteWarningIcon
} from '../../assets/icon';
import {
    GetExtremeRefData,
    DeleteAccount
} from '../../redux/action/super/SuperAdminAction';
import ExtremeForm from './form/ExtremeForm';
import { PaginationContainer, AddButtonBottom, StyledButtonRedIcon, StyledButtonIcon } from '../../style/index';
import Pagination from '@mui/material/Pagination';
import { PaginationValue } from '../../utils/PaginationUrl';
import END_POINTS from '../../utils/EndPoints';

const columns = [
    { id: 'lid', label: 'LID', maxWidth: 85 },
    { id: 'name', label: 'Name', maxWidth: 115 },
    { id: 'email', label: 'Email', maxWidth: 130 },
    { id: 'college_name', label: 'Institution name', maxWidth: 128 },
    { id: 'country', label: 'Location', maxWidth: 80 },
    { id: 'instructors', label: 'Instructors', maxWidth: 80 },
    { id: 'students', label: 'Students', maxWidth: 80 },
    { id: 'documents', label: 'Documents', maxWidth: 80 },
    { id: 'used_documents', label: 'SUB', maxWidth: 80 },
    { id: 'action', label: 'Actions', minWidth: 80 }
];

function createData(lid, name, email, college_name, country, instructors, students, documents, used_documents, action, state, address, designation, phone, start_date, expiry_date, document_type, grammar, grammar_documents, license_type, institution_type, timeZone, folpath, department, acc_manager, reseller) {

    return { lid, name, email, college_name, country, instructors, students, documents, used_documents, action, state, address, designation, phone, start_date, expiry_date, document_type, grammar, grammar_documents, license_type, institution_type, timeZone, folpath, department, acc_manager, reseller };
}

const ExtremProduct = ({
    GetExtremeRefData,
    DeleteAccount,
    pageDetails,
    extremeData,
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

    const ExtremeBreadCrumb = [
        {
            name: 'Dashboard',
            link: '/super/dashboard',
            active: false,
        },
        {
            name: `Extreme (${pageDetails?.totalElements !== undefined ? pageDetails?.totalElements : ''})`,
            link: '',
            active: true,
        },
    ];

    useEffect(() => {
        GetExtremeRefData(END_POINTS.SUPER_ADMIN_EXTREME_LICENSE, paginationPayload);
    }, [, paginationPayload]);

    useEffect(() => {
        let row = '';
        let arr = [];
        extremeData?.map((data) => {
            row =
                createData(
                    data.lid.toString(),
                    data.name,
                    data.email,
                    data.college_name,
                    data.country,
                    data.instructors.toString(),
                    data.students.toString(),
                    data.documents.toString(),
                    data.used_documents.toString(),
                    [
                        {
                            'component': <StyledButtonIcon variant="outlined" size='small'><EditOutlinedIcon fontSize='small' /></StyledButtonIcon>, 'type': 'edit', 'title': 'Edit'
                        },
                        {
                            'component': <StyledButtonRedIcon variant="outlined" size='small'><DeleteOutlineOutlinedIcon fontSize='small' /></StyledButtonRedIcon>, 'type': 'delete', 'title': 'Delete'
                        },
                        {
                            'component': <StyledButtonIcon variant="outlined" size='small'><ArrowForwardOutlinedIcon fontSize='small' /></StyledButtonIcon>, 'type': 'nextPath', 'title': 'Next'
                        }
                    ],
                    data.state,
                    data.address,
                    data.designation,
                    data.phone,
                    data.start_date,
                    data.expiry_date,
                    data.document_type,
                    data.grammar,
                    data.grammar_documents,
                    data.license_type,
                    data.institution_type,
                    data.timeZone,
                    data.folpath,
                    data.department,
                    data.acc_manager,
                    data.reseller,
                );
            arr.push(row);
        });
        setRows([...arr]);
    }, [extremeData]);

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
                pathname: '/super/extremeInstructor',
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
        DeleteAccount(licenseIdData?.lid, END_POINTS.SUPER_ADMIN_EXTREME_LICENSE);
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
                <Grid item md={ 6 } xs={ 6 } style={ { textAlign: 'right' } }>
                    <BreadCrumb item={ ExtremeBreadCrumb } />
                </Grid>
                <Grid item md={ 6 } xs={ 6 } style={ { textAlign: 'right' } }>
                    <TextField
                        sx={ { width: '40%' } }
                        placeholder='Search'
                        onChange={ debouncedResults }
                        inputProps={ {
                            style: {
                                padding: 7,
                                display: 'inline-flex',
                                fontWeight: 500
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
                    <ExtremeForm
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
                    title="Add Extreme Account"
                    isShowAddIcon={ true }
                >
                    <ExtremeForm />
                </CreateDrawer>
            </AddButtonBottom>

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
    );
};

const mapStateToProps = (state) => ({
    pageDetails: state?.superAdmin?.ExtrRefData?.page,
    extremeData: state?.superAdmin?.ExtrRefData?._embedded?.licenseDTOList,
    isLoading: state?.superAdmin?.isLoadingExtrRef,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetExtremeRefData: (url, paginationPayload) => dispatch(GetExtremeRefData(url, paginationPayload)),
        DeleteAccount: (licenseId, role) => dispatch(DeleteAccount(licenseId, role)),
    };
};

ExtremProduct.layout = SuperAdmin;

export default connect(mapStateToProps, mapDispatchToProps)(ExtremProduct);