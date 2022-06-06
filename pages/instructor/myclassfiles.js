import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Instructor from '../../layouts/Instructor';
import { CardInfoView } from '../../components';
import { GetClassesData } from '../../redux/action/instructor/InstructorAction';
import { PaginationValue } from '../../utils/PaginationUrl';
import { Skeleton } from '@mui/material';

const MyClassFiles = ({
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

    const handleChange = (event, value) => {
        event.preventDefault();
        setPaginationPayload({ ...paginationPayload, 'page': value - 1 });
    };

    return (
        <React.Fragment>
            {isLoading ?
                <Grid container spacing={2}>
                    <Grid item md={4} xs={12}><Skeleton /></Grid>
                    <Grid item md={4} xs={12}><Skeleton /></Grid>
                    <Grid item md={4} xs={12}><Skeleton /></Grid>
                </Grid> :
                <Grid container spacing={2}>
                    {classesData?.map((item, index) => (
                        <Grid item md={4} xs={12}>
                            <CardInfoView
                                key={index}
                                item={item}
                                isAvatar={true}
                                isHeading={true}
                                isTimer={true}
                                path='/instructor/myclasstables'
                            />
                        </Grid>
                    ))}
                </Grid>
            }
            <div style={{ marginLeft: '30%', marginTop: '25px' }}>
                <Pagination
                    count={pageDetails?.totalPages}
                    onChange={handleChange}
                    color="primary"
                    variant="outlined"
                    shape="rounded"
                />
            </div>
        </React.Fragment>
    );
};

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

MyClassFiles.layout = Instructor;

export default connect(mapStateToProps, mapDispatchToProps)(MyClassFiles);
