import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { useRouter } from "next/router";
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Instructor from '../../layouts/Instructor'
import { BreadCrumb, TabMenu } from '../../components'
import Assignments from './assignments'
import Students from './students'
import { GetStudent, GetAssignment } from '../../redux/action/instructor/InstructorAction';
import { PaginationValue } from '../../utils/PaginationUrl';

const MyClassesTables = ({
    GetStudent,
    GetAssignment,
    pageDetails,
    pageDetailsAssignment,
    studentData,
    isLoadingStudent,
}) => {

    const router = useRouter();
    const [clasId, setClasId] = useState(router.query.clasId);;

    console.log("routerrouterrouter", router)

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
            name: 'My assignments',
            link: '/instructor/myclasstables',
            active: true,
        },
    ]

    const [paginationPayload, setPaginationPayload] = useState({
        page: PaginationValue?.page,
        size: PaginationValue?.size,
        field: 'user_id',
        orderBy: PaginationValue?.orderBy,
    });

    const [paginationAssignment, setPaginationAssignment] = useState({
        page: PaginationValue?.page,
        size: PaginationValue?.size,
        field: 'ass_id',
        orderBy: PaginationValue?.orderBy,
    });

    const handlePagination = (event, value) => {
        event.preventDefault();
        setPaginationPayload({ ...paginationPayload, 'page': value - 1 });
    };

    useEffect(() => {
        GetStudent(clasId, paginationPayload);
    }, [clasId, paginationPayload]);

    useEffect(() => {
        GetAssignment(clasId, paginationAssignment);
    }, [clasId, paginationAssignment]);

    const componentList = [        
        <Assignments />,
        <Students
            studentData={ studentData }
            pageDetails={ pageDetails }
            isLoadingStudent={ isLoadingStudent }
            handlePagination={ handlePagination }
        />
    ];

    const tabMenu = [        
        {
            label: `Assignments(${pageDetailsAssignment?.totalElements !== undefined ? pageDetailsAssignment?.totalElements : 0})`,
        },
        {
            label: `Students(${pageDetails?.totalElements !== undefined ? pageDetails?.totalElements : 0})`,
        }
    ];

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
    pageDetails: state?.instructorClasses?.studentData?.page,
    pageDetailsAssignment: state?.instructorClasses?.assignmentData?.page,
    studentData: state?.instructorClasses?.studentData?._embedded?.studentDTOList,
    isLoadingStudent: state?.instructorClasses?.isLoadingStudent
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetStudent: (ClasId, PaginationValue) => dispatch(GetStudent(ClasId, PaginationValue)),
        GetAssignment: (ClasId, PaginationValue) => dispatch(GetAssignment(ClasId, PaginationValue)),
    };
};

MyClassesTables.layout = Instructor;

export default connect(mapStateToProps, mapDispatchToProps)(MyClassesTables);
