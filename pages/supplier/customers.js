import React, { useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import Admin from "../../layouts/Admin";
import debouce from 'lodash.debounce';
import {
    Box, Pagination, Grid, TextField,
} from '@mui/material';
import {
    CardView,
    CommonTable,
    BreadCrumb
} from '../../components';
import {
    GetExtremeRefData,
} from '../../redux/action/super/SuperAdminAction';
import { PaginationContainer } from '../../style/index';
import { PaginationValue } from '../../utils/PaginationUrl';
import END_POINTS from "../../utils/EndPoints";

const columns = [
    { id: 'college_name', label: 'Institution name', maxWidth: 120 },
    { id: 'name', label: 'Username', maxWidth: 120 },
    { id: 'email', label: 'Email', maxWidth: 120 },
    { id: 'country', label: 'Location', maxWidth: 115 },
    { id: 'start_date', label: 'Start date', maxWidth: 120 },
    { id: 'expiry_date', label: 'Expiry date', maxWidth: 125 },
    { id: 'acc_manager', label: 'Account manager', maxWidth: 120 },
    { id: 'used_documents', label: 'Submissions', maxWidth: 90 },
];

function createData(college_name, name, email, country, start_date, expiry_date, acc_manager, used_documents) {

    return { college_name, name, email, country, start_date, expiry_date, acc_manager, used_documents };
}

const Customers = ({
    GetExtremeRefData,
    pageDetails,
    extremeData,
    isLoading,
}) => {

    const [rows, setRows] = useState([]);
    const [paginationPayload, setPaginationPayload] = useState({
        page: PaginationValue?.page,
        size: PaginationValue?.size,
        field: 'name',
        orderBy: PaginationValue?.orderBy,
    });

    const ResellerBreadCrumb = [
        {
            name: 'Dashboard',
            link: '/supplier/dashboard',
            active: false,
        },
        {
            name: `Customers(${pageDetails?.totalElements === undefined ? 0 : pageDetails?.totalElements})`,
            link: '',
            active: true,
        },
    ];

    useEffect(() => {
        GetExtremeRefData(END_POINTS.RESELLER_CUSTOMERS, paginationPayload);
    }, [, paginationPayload]);

    useEffect(() => {
        let row = '';
        let arr = [];
        extremeData?.map((data) => {
            row =
                createData(
                    data.college_name,
                    data.name,
                    data.email,
                    data.country,
                    data.start_date,
                    data.expiry_date,
                    data.acc_manager,
                    data.used_documents.toString(),
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

    return (
        <>
            <Grid container spacing={ 2 }>
                <Grid item md={ 5 } xs={ 5 }>
                    <BreadCrumb item={ ResellerBreadCrumb } />
                </Grid>
                <Grid item md={ 7 } xs={ 7 } style={ { textAlign: 'right' } }>
                    <TextField
                        sx={ { width: '40%', marginTop: '8px' } }
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
                        handleTableSort={ handleTableSort }
                    />
                </CardView>
            </Box>

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
};

const mapStateToProps = (state) => ({
    pageDetails: state?.superAdmin?.ExtrRefData?.page,
    extremeData: state?.superAdmin?.ExtrRefData?._embedded?.licenseDTOList,
    isLoading: state?.superAdmin?.isLoadingExtrRef,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetExtremeRefData: (url, paginationValue) => dispatch(GetExtremeRefData(url, paginationValue)),
    };
};

Customers.layout = Admin;

export default connect(mapStateToProps, mapDispatchToProps)(Customers);
