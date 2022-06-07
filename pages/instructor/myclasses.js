import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { GetClassesData } from '../../redux/action/instructor/InstructorAction';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import { PaginationValue } from '../../utils/PaginationUrl';

import Instructor from '../../layouts/Instructor';
import { BreadCrumb, MainHeading, TabMenu } from '../../components';

import MyClassFiles from './myclassfiles';
import Archives from './archives';

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
]

const MyClasses = ({ GetClassesData, pageDetails }) => {

    const [paginationPayload, setPaginationPayload] = useState({
        page: PaginationValue?.page,
        size: PaginationValue?.size,
        field: 'class_id',
        orderBy: PaginationValue?.orderBy,
    });

    const componentList = [<MyClassFiles />, <Archives />]

    const tabMenu = [{
        label: `My Classes(${pageDetails?.totalElements})`,
    }, {
        label: 'Archives(1)',
    }];

    useEffect(() => {
        GetClassesData(paginationPayload);
    }, []);

    return (
        <React.Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item md={10} xs={10}>
                        <BreadCrumb item={InstructorBreadCrumb} />
                    </Grid>
                    <Grid item md={2} xs={2}>
                        {/* <TextField
                            placeholder='Search'
                            inputProps={{
                                style: {
                                    padding: 5,
                                    display: 'inline-flex',
                                },
                            }}
                        /> */}
                    </Grid>
                </Grid>
            </Box>
            <MainHeading title='My Classes(6)' />
            <TabMenu
                menuButton={tabMenu}
                components={componentList}
                isTabMenu={false}
            />
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({
    pageDetails: state?.instructorClasses?.classesData?.page,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetClassesData: (PaginationValue) => dispatch(GetClassesData(PaginationValue)),
    };
};

MyClasses.layout = Instructor

export default connect(mapStateToProps, mapDispatchToProps)(MyClasses);


