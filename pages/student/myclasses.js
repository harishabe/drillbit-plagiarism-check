import React, { useEffect, useState, useMemo } from 'react';
import debouce from "lodash.debounce";
import { connect } from 'react-redux';
import { GetClassesData } from '../../redux/action/student/StudentAction';
import { PaginationValue } from '../../utils/PaginationUrl';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import Grid from '@mui/material/Grid';
import { Skeleton, TextField } from '@mui/material';
import Student from '../../layouts/Student'
import { BreadCrumb, CardInfoView, MainHeading } from '../../components'

const StudentBreadCrumb = [
    {
        name: 'Dashboard',
        link: '/student/dashboard',
        active: false,
    },
    {
        name: 'My classes',
        link: '',
        active: true,
    },
]

function createData(validity) {
    return { validity }
};

const MyClasses = ({
    GetClassesData,
    classesData,
    pageDetails,
    isLoading
}) => {
    const [item, setItem] = useState([]);

    const [paginationPayload, setPaginationPayload] = useState({
        page: PaginationValue?.page,
        size: PaginationValue?.size,
        field: 'class_id',
        orderBy: PaginationValue?.orderBy,
    });

    useEffect(() => {
        GetClassesData(paginationPayload);
    }, [, paginationPayload]);

    useEffect(() => {
        let row = '';
        let arr = [];
        let presentDate;
        let expiryDate;
        let differenceInTime;
        classesData?.map((item) => {
            row =
                createData(
                    presentDate = new Date(),
                    expiryDate = new Date(item.expiry_date),
                    differenceInTime = presentDate.getTime() - expiryDate.getTime(),
                    item.validity =
                    (isNaN(item.validity)) ?
                        'Expired' : `${Math.round(differenceInTime / (1000 * 3600 * 24))} Days left`,
                );
            arr.push(row)
        });
        setItem([...arr]);
    }, [classesData]);

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
    }

    const debouncedResults = useMemo(() => {
        return debouce(handleSearch, 300);
    }, []);

    useEffect(() => {
        return () => {
            debouncedResults.cancel();
        };
    });

    /** end debounce concepts */

    const checkStatus = (validity) => {
        if (validity <= 15) {
            return '#FF0000';
        } else if (validity >= 15 && validity <= 100) {
            return '#FFFF00';
        } else if (validity >= 100) {
            return '#CCCCCC';
        } else if (validity === 'expired') {
            return '#FF0000';
        } else {
            return '#CCCCCC';
        }
    }

    return (
        <React.Fragment>
            <BreadCrumb item={StudentBreadCrumb} />
            <Box sx={ { flexGrow: 1 } }>
                <Grid container spacing={ 1 }>
                    <Grid item md={ 8 }>
                        <MainHeading title={ 'My Classes' + '(' + pageDetails?.totalElements + ')' } />
                    </Grid>
                    <Grid item md={ 4 } xs container direction='row' justifyContent={ 'right' }>
                        <TextField
                            placeholder='Search'
                            onChange={ debouncedResults }
                            inputProps={ {
                                style: {
                                    padding: 5,
                                    display: 'inline-flex'
                                }
                            } }
                        />
                    </Grid>
                </Grid>
            </Box>
            { isLoading ?
                <Grid container spacing={ 2 }>
                    <Grid item md={ 4 } xs={ 12 }><Skeleton /></Grid>
                    <Grid item md={ 4 } xs={ 12 }><Skeleton /></Grid>
                    <Grid item md={ 4 } xs={ 12 }><Skeleton /></Grid>
                </Grid> :
                <>


                    <Grid container spacing={ 2 }>

                        { classesData?.map((item, index) => (
                            <Grid item md={ 4 } xs={ 12 }>
                                <CardInfoView
                                    key={ index }
                                    item={ item }
                                    isAvatar={ true }
                                    isHeading={ true }
                                    isTimer={ true }
                                    statusColor={ checkStatus(item.validity) }
                                    // path={ '/student/' + item.class_id + '/myassignments' }
                                    path={ '/student/myassignments' }
                                />
                            </Grid>
                        )) }
                    </Grid>

                    <div style={ { marginLeft: '30%', marginTop: '25px' } }>
                        <Pagination
                            count={ pageDetails?.totalPages }
                            onChange={ handleChange }
                            color="primary"
                            variant="outlined"
                            shape="rounded"
                        />
                    </div>
                </>
            }
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({
    pageDetails: state?.studentClasses?.classesData?.page,
    classesData: state?.studentClasses?.classesData?._embedded?.studentClassesList,
    isLoading: state?.studentClasses?.isLoading,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetClassesData: (PaginationValue) => dispatch(GetClassesData(PaginationValue)),
    };
};

MyClasses.layout = Student

export default connect(mapStateToProps, mapDispatchToProps)(MyClasses);
