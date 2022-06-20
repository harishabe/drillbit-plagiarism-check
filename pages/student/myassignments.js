import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid'
import { connect } from 'react-redux';
import { GetAssignmentData } from '../../redux/action/student/StudentAction';
import { PaginationValue } from '../../utils/PaginationUrl';
import Pagination from '@mui/material/Pagination';
import { Skeleton } from '@mui/material';
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
        link: '/student/myclasses',
        active: false,
    },
    {
        name: 'My assignments',
        link: '',
        active: true,
    },
]

const classes = [
    {
        class_name: 'Assignment 1',
        description: 'The only condition to run that byte code',
        validity: '2 days left',
        color: '#38BE62',
    },
    {
        class_name: 'Assignment 2',
        description: 'Our team is here round the clock to help',
        validity: '2 days left',
        color: '#F1A045',
    },
    {
        class_name: 'Assignment 3',
        description: 'Our team is here round the clock to help',
        validity: '2 days left',
        color: '#8D34FF',
    },
]

function createData(validity) {
    return { validity }
};

const MyAssignments = ({
    GetAssignmentData,
    assignmentData,
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
        GetAssignmentData(paginationPayload);
    }, [, paginationPayload]);

    useEffect(() => {
        let row = '';
        let arr = [];
        let presentDate;
        let expiryDate;
        let differenceInTime;
        assignmentData?.map((item) => {
            row =
                createData(
                    presentDate = new Date(),
                    expiryDate = new Date(item.expiry_date),
                    differenceInTime = presentDate.getTime() - expiryDate.getTime(),
                    item.validity = `${Math.round(differenceInTime / (1000 * 3600 * 24))} Days left`,
                );
            arr.push(row)
        });
        setItem([...arr]);
    }, [assignmentData]);

    const handleChange = (event, value) => {
        event.preventDefault();
        setPaginationPayload({ ...paginationPayload, 'page': value - 1 });
    };

    const checkStatus = (validity) => {
        if (validity <= 15) {
            return '#FF0000';
        } else if (validity >= 15 && validity <= 100) {
            return '#FFFF00';
        } else {
            return '#CCCCCC';
        }
    }

    return (
        <React.Fragment>
            <BreadCrumb item={StudentBreadCrumb} />
            <MainHeading title='My Assignments' />
            { isLoading ?
                <Grid container spacing={ 2 }>
                    <Grid item md={ 4 } xs={ 12 }><Skeleton /></Grid>
                    <Grid item md={ 4 } xs={ 12 }><Skeleton /></Grid>
                    <Grid item md={ 4 } xs={ 12 }><Skeleton /></Grid>
                </Grid> :
                <>


                    <Grid container spacing={ 2 }>

                        { classes?.map((item, index) => (
                            <Grid item md={ 4 } xs={ 12 }>
                                <CardInfoView
                                    key={ index }
                                    item={ item }
                                    isAvatar={ true }
                                    isHeading={ true }
                                    isTimer={ true }
                                    isSubmit={ true }
                                    isDownload={ true }
                                    statusColor={ checkStatus(item.validity) }
                                    submitPath='/student/myassignment-details'
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
    pageDetails: state?.studentClasses?.assignmentData?.page,
    assignmentData: state?.studentClasses?.assignmentData?._embedded?.classDTOList,
    isLoading: state?.studentClasses?.isLoading,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetAssignmentData: (PaginationValue) => dispatch(GetAssignmentData(PaginationValue)),
    };
};

MyAssignments.layout = Student

export default connect(mapStateToProps, mapDispatchToProps)(MyAssignments);
