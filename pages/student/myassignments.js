import React, { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import Grid from '@mui/material/Grid';
import { connect } from 'react-redux';
import { GetAssignmentData } from '../../redux/action/student/StudentAction';
import { PaginationValue } from '../../utils/PaginationUrl';
import Pagination from '@mui/material/Pagination';
import { Skeleton } from '@mui/material';
import Student from '../../layouts/Student';
import { BreadCrumb, CardInfoView, MainHeading } from '../../components';
import { renameKeys, findByExpiryDate, expiryDateBgColor } from '../../utils/RegExp';

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

const Colors = ['#7B68C8', '#68C886', '#68C886', '#34C2FF', '#3491FF', '#8D34FF'];

const MyAssignments = ({
    GetAssignmentData,
    assignmentData,
    pageDetails,
    isLoading
}) => {

    const router = useRouter();

    const [item, setItem] = useState([]);

    const [paginationPayload, setPaginationPayload] = useState({
        page: PaginationValue?.page,
        size: PaginationValue?.size,
        field: 'ass_id',
        orderBy: PaginationValue?.orderBy,
    });

    useEffect(() => {
        GetAssignmentData(router.query.clasId, paginationPayload);
    }, [router.query.clasId, paginationPayload]);

    useEffect(() => {
        let row = '';
        let arr = [];
        assignmentData?.map((item, index) => {
            item['color'] = Colors[index];
            item['validity'] = findByExpiryDate(item.creation_date);
            row = renameKeys(item, { folder_id: 'id', folder_name: 'name', color: 'color', creation_date: 'expiry_date' })
            arr.push(row)
        });
        setItem([...arr]);
    }, [assignmentData]);

    const handleChange = (event, value) => {
        event.preventDefault();
        setPaginationPayload({ ...paginationPayload, 'page': value - 1 });
    };

    return (
        <React.Fragment>
            <BreadCrumb item={StudentBreadCrumb} />
            <MainHeading title={ 'My Assignments' + '(' + pageDetails?.totalElements + ')' } />
            { isLoading ?
                <Grid container spacing={ 2 }>
                    <Grid item md={ 4 } xs={ 12 }><Skeleton /></Grid>
                    <Grid item md={ 4 } xs={ 12 }><Skeleton /></Grid>
                    <Grid item md={ 4 } xs={ 12 }><Skeleton /></Grid>
                </Grid> :
                <>
                    <Grid container spacing={ 2 }>
                        { item?.map((item, index) => (
                            <Grid item md={ 4 } xs={ 12 }>
                                <CardInfoView
                                    key={ index }
                                    item={ item }
                                    isAvatar={ true }
                                    isHeading={ true }
                                    isTimer={ true }
                                    isSubmit={ true }
                                    isDownload={ true }
                                    statusColor={ expiryDateBgColor(item.validity) }
                                    submitPath={ { pathname: '/student/myassignment-details', query: { assId: item.id, clasId: router.query.clasId } } }
                                />
                            </Grid>
                        )) }
                    </Grid>
                </>
            }

                    <div style={ { marginLeft: '30%', marginTop: '25px' } }>
                        <Pagination
                            count={ pageDetails?.totalPages }
                            onChange={ handleChange }
                            color="primary"
                            variant="outlined"
                            shape="rounded"
                        />
                    </div>

        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({
    pageDetails: state?.studentClasses?.assignmentData?.page,
    assignmentData: state?.studentClasses?.assignmentData?._embedded?.folderDTOList,
    isLoading: state?.studentClasses?.isLoading,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetAssignmentData: (id, PaginationValue) => dispatch(GetAssignmentData(id, PaginationValue)),
    };
};

MyAssignments.layout = Student

export default connect(mapStateToProps, mapDispatchToProps)(MyAssignments);
