import React, { useEffect, useState, useMemo } from 'react';
import Grid from '@mui/material/Grid';
import debouce from "lodash.debounce";
import { Skeleton } from '@mui/material';
import Box from '@mui/material/Box';
import { connect } from 'react-redux';
import { GetClassesData } from '../../redux/action/instructor/InstructorAction';
import { TextField } from '@mui/material';
import { PaginationValue } from '../../utils/PaginationUrl';
import Instructor from '../../layouts/Instructor';
import { BreadCrumb, MainHeading } from '../../components';
import MyClassFiles from './myclassfiles';

const InstructorBreadCrumb = [
    {
        name: 'Dashboard',
        link: '/instructor/dashboard',
        active: false,
    },
    {
        name: 'My classes',
        link: '/instructor/myclasses',
        active: true,
    },
];

const MyClasses = ({
    GetClassesData,
    classesData,
    pageDetails,
    isLoading
}) => {

    const [paginationPayload, setPaginationPayload] = useState({
        page: PaginationValue?.page,
        size: PaginationValue?.size,
        field: 'class_id',
        orderBy: PaginationValue?.orderBy,
    });

    useEffect(() => {
        GetClassesData(paginationPayload);
    }, [, paginationPayload]);

    const handlePagination = (event, value) => {
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

    return (
        <React.Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item md={10} xs={10}>
                        <BreadCrumb item={InstructorBreadCrumb} />
                    </Grid>
                </Grid>
            </Box>
            <Grid container spacing={2}>
                <Grid item md={8} xs={12}>
                    <MainHeading title={`My Classes(${pageDetails?.totalElements !== undefined ? pageDetails?.totalElements : 0})`} />
                </Grid>
                <Grid item md={4} xs={12} align="right">
                    <TextField
                        placeholder='Search'
                        onChange={debouncedResults}
                        inputProps={{
                            style: {
                                padding: 5,
                                display: 'inline-flex',
                            },
                        }}
                    />
                </Grid>
            </Grid>

            {isLoading ?
                <Grid container spacing={2}>
                    <Grid item md={4} xs={12}><Skeleton /></Grid>
                    <Grid item md={4} xs={12}><Skeleton /></Grid>
                    <Grid item md={4} xs={12}><Skeleton /></Grid>
                </Grid> :
                <MyClassFiles
                    pageDetails={pageDetails}
                    classesData={classesData}
                    isLoading={isLoading}
                    handlePagination={handlePagination}
                />
            }
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({
    pageDetails: state?.instructorClasses?.classesData?.page,
    classesData: state?.instructorClasses?.classesData?._embedded?.classDTOList,
    isLoading: state?.instructorClasses?.isLoading,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetClassesData: (PaginationValue) => dispatch(GetClassesData(PaginationValue)),
    };
};

MyClasses.layout = Instructor

export default connect(mapStateToProps, mapDispatchToProps)(MyClasses);


