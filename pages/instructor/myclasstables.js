import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { useRouter } from "next/router";
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Instructor from '../../layouts/Instructor'
import { BreadCrumb, TabMenu } from '../../components'
import Assignments from './assignments'
import Students from './students'
import { GetStudent } from '../../redux/action/instructor/InstructorAction';
import { PaginationValue } from '../../utils/PaginationUrl';

const MyClassesTables = ({
    GetStudent,
    pageDetails,
    studentData,
    isLoadingStudent,
}) => {

    const router = useRouter();
    const [clasId, setClasId] = useState(router.query.clasId);

    const InstructorBreadCrumb = [
        {
            name: 'Dashboard',
            link: '/instructor/dashboard',
            active: false,
        },
        {
            name: 'My classes',
            link: '/instructor/myclasses',
            active: false,
        },
        {
            name: router.query.name,
            link: '/instructor/myclasstables',
            active: true,
        },
    ]

    const componentList = [
        <Students
            studentData={ studentData }
            pageDetails={ pageDetails }
            isLoadingStudent={ isLoadingStudent }
            handlePagination={ handlePagination }
        />,
        <Assignments />
    ];

    const tabMenu = [
        {
            label: `Students(${pageDetails?.totalElements !== undefined ? pageDetails?.totalElements : 0})`,
        },
        {
            label: 'Assignments(27)',
        },
    ];

    const [paginationPayload, setPaginationPayload] = useState({
        page: PaginationValue?.page,
        size: PaginationValue?.size,
        field: 'user_id',
        orderBy: PaginationValue?.orderBy,
    });

    const handlePagination = (event, value) => {
        event.preventDefault();
        setPaginationPayload({ ...paginationPayload, 'page': value - 1 });
    };

    useEffect(() => {
        GetStudent(clasId, paginationPayload);
    }, [clasId, paginationPayload]);

    return (
        <React.Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item md={10} xs={10}>
                        <BreadCrumb item={InstructorBreadCrumb} />
                    </Grid>
                    {/* <Grid item md={2} xs={2}>
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
                    </Grid> */}
                </Grid>
            </Box>
            <TabMenu menuButton={tabMenu} components={componentList} />


        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({
    pageDetails: state?.instructorClasses?.studentAssignmentData?.page,
    studentData: state?.instructorClasses?.studentAssignmentData?._embedded?.studentDTOList,
    isLoadingStudent: state?.instructorClasses?.isLoadingStudent
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetStudent: (ClasId, PaginationValue) => dispatch(GetStudent(ClasId, PaginationValue)),
    };
};

MyClassesTables.layout = Instructor;

export default connect(mapStateToProps, mapDispatchToProps)(MyClassesTables);
