import React, { useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import Admin from "../../layouts/Admin";
import debouce from 'lodash.debounce';
import {
    Box, Pagination, Grid, TextField,
} from '@mui/material';
import {
    MainHeading,
    CardView,
    CommonTable,
} from '../../components';
import {
    GetExtremeRefData,
} from '../../redux/action/super/SuperAdminAction';
import { PaginationContainer } from '../../style/index';
import { PaginationValue } from '../../utils/PaginationUrl';
import END_POINTS from "../../utils/EndPoints";

const columns = [
    { id: 'college_name', label: 'Institution name' },
    { id: 'name', label: 'Username' },
    { id: 'email', label: 'Email' },
    { id: 'country', label: 'Location' },
    { id: 'start_date', label: 'Start date' },
    { id: 'expiry_date', label: 'Expiry date' }
];

function createData(college_name, name, email, country, start_date, expiry_date) {

    return { college_name, name, email, country, start_date, expiry_date };
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
                    <MainHeading title={ `Customers (${pageDetails?.totalElements === undefined ? 0 : pageDetails?.totalElements})` } />
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
                        charLength={ 11 }
                        handleTableSort={ handleTableSort }
                    />
                </CardView>
            </Box>

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
        GetExtremeRefData: (url, paginationValue) => dispatch(GetExtremeRefData(url, paginationValue)),
    };
};

Customers.layout = Admin;

export default connect(mapStateToProps, mapDispatchToProps)(Customers);
