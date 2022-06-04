import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Instructor from '../../layouts/Instructor';
import { CardInfoView } from '../../components';
import { GetClassesData } from '../../redux/action/instructor/InstructorAction';
import { PaginationValue } from '../../utils/PaginationUrl';

const classes = [
    {
        name: 'Java',
        description: 'Our team is here round the clock to help',
        validity: '2 days left',
        color: '#38BE62',
    },
    {
        name: 'Machine Learning',
        description: 'Our team is here round the clock to help',
        validity: '2 days left',
        color: '#F1A045',
    },
    {
        name: 'Data Science',
        description: 'Our team is here round the clock to help',
        validity: '2 days left',
        color: '#8D34FF',
    },
    {
        name: 'Data Management',
        description: 'Our team is here round the clock to help',
        validity: '2 days left',
        color: '#B94D34',
    },
    {
        name: 'Data Management',
        description: 'Our team is here round the clock to help',
        validity: '2 days left',
        color: '#666AF6',
    },
    {
        name: 'Data Management',
        description: 'Our team is here round the clock to help',
        validity: '2 days left',
        color: '#E9596F',
    },
    {
        name: 'Mathematics',
        description: 'Our team is here round the clock to help',
        validity: '2 days left',
        color: '#8D34FF',
    },
];

const MyClassFiles = ({ GetClassesData, classesData, pageDetails }) => {

    console.log("first", classesData)

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
        setPaginationPayload({ ...paginationPayload, 'page': value - 1 })
    };

    return (
        <React.Fragment>
            <Grid container spacing={2}>
                {classesData?.map((item, index) => (
                    <Grid key={index} item md={4} xs={12}>
                        <CardInfoView
                            item={item}
                            isAvatar={true}
                            isHeading={true}
                            isTimer={true}
                            path='/instructor/myclasstables'
                        />
                       
                    </Grid>
                ))}               
            </Grid>

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
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetClassesData: (classesData) => dispatch(GetClassesData(classesData)),
    };
};

MyClassFiles.layout = Instructor;

export default connect(mapStateToProps, mapDispatchToProps)(MyClassFiles);
