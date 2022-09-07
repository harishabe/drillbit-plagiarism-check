import React, { useState, useEffect, useMemo } from 'react';
import debouce from "lodash.debounce";
import { connect } from 'react-redux';
import { useRouter } from "next/router";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Instructor from '../../../layouts/Instructor';
import { BreadCrumb, TabMenu } from '../../../components';
import Assignments from './myAssignment/Assignments';
import Students from './myAssignment/Students';
import { GetStudent, GetAssignment } from '../../../redux/action/instructor/InstructorAction';
import { PaginationValue } from '../../../utils/PaginationUrl';

const MyClassesTables = ({
    GetStudent,
    GetAssignment,
    pageDetailsStudent,
    pageDetailsAssignment,
    assignmentData,
    isLoadingAssignment,
    studentData,
    isLoadingStudent,
}) => {

    const router = useRouter();

    const InstructorBreadCrumb = [
        {
            name: 'Dashboard',
            link: '/instructor/dashboard',
            active: false,
        },
        {
            name: 'My classes',
            link: '/extream/instructor/myclasses',
            active: false,
        },
        {
            name: 'My assignments',
            link: '/instructor/myclasstables',
            active: true,
        },
    ]

    const [paginationStudent, setPaginationStudent] = useState({
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

    useEffect(() => {
        GetStudent(router.query.clasId, paginationStudent);
    }, [router.query.clasId, paginationStudent]);

    useEffect(() => {
        GetAssignment(router.query.clasId, paginationAssignment);
    }, [router.query.clasId, paginationAssignment]);

    /** search implementation using debounce concepts */

    const handleSearchAssignment = (event) => {
        if (event.target.value !== '') {
            paginationAssignment['search'] = event.target.value;
            setPaginationAssignment({ ...paginationAssignment, paginationAssignment });
        } else {
            delete paginationAssignment['search'];
            setPaginationAssignment({ ...paginationAssignment, paginationAssignment });
        }
    }

    const debouncedResultsAssignment = useMemo(() => {
        return debouce(handleSearchAssignment, 300);
    }, []);

    useEffect(() => {
        return () => {
            debouncedResultsAssignment.cancel();
        };
    });

    /** end debounce concepts */

    /** search implementation using debounce concepts */

    const handleSearchStudent = (event) => {
        if (event.target.value !== '') {
            paginationStudent['search'] = event.target.value;
            setPaginationStudent({ ...paginationStudent, paginationStudent });
        } else {
            delete paginationStudent['search'];
            setPaginationStudent({ ...paginationStudent, paginationStudent });
        }
    }

    const debouncedResultsStudent = useMemo(() => {
        return debouce(handleSearchStudent, 300);
    }, []);

    useEffect(() => {
        return () => {
            debouncedResultsStudent.cancel();
        };
    });

    /** end debounce concepts */

    const componentList = [
        <Assignments
            pageDetailsAssignment={ pageDetailsAssignment }
            assignmentData={ assignmentData }
            isLoadingAssignment={ isLoadingAssignment }
            paginationAssignment={ paginationAssignment }
            setPaginationAssignment={ setPaginationAssignment }
            debouncedResultsAssignment={ debouncedResultsAssignment }
        />,
        <Students
            pageDetailsStudent={ pageDetailsStudent }
            studentData={ studentData }
            isLoadingStudent={ isLoadingStudent }
            paginationStudent={ paginationStudent }
            setPaginationStudent={ setPaginationStudent }
            debouncedResultsStudent={ debouncedResultsStudent }
        />
    ];

    const tabMenu = [
        {
            label: `Assignments(${pageDetailsAssignment?.totalElements !== undefined ? pageDetailsAssignment?.totalElements : 0})`,
        },
        {
            label: `Students(${pageDetailsStudent?.totalElements !== undefined ? pageDetailsStudent?.totalElements : 0})`,
        }
    ];

    return (
        <React.Fragment>
            <Box sx={ { flexGrow: 1 } }>
                <Grid container spacing={ 1 }>
                    <Grid item md={ 10 } xs={ 12 }>
                        <BreadCrumb item={ InstructorBreadCrumb } />
                    </Grid>
                </Grid>
            </Box>

            <TabMenu menuButton={ tabMenu } components={ componentList } />
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({
    pageDetailsStudent: state?.instructorClasses?.studentData?.page,
    pageDetailsAssignment: state?.instructorClasses?.assignmentData?.page,
    assignmentData: state?.instructorClasses?.assignmentData?._embedded?.assignmentDTOList,
    isLoadingAssignment: state?.instructorClasses?.isLoadingAssignment,
    studentData: state?.instructorClasses?.studentData?._embedded?.studentDTOList,
    isLoadingStudent: state?.instructorClasses?.isLoadingStudent,
    isLoadingTemplate: state?.instructorClasses?.isLoadingTemplate,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetStudent: (ClasId, PaginationValue) => dispatch(GetStudent(ClasId, PaginationValue)),
        GetAssignment: (ClasId, PaginationValue) => dispatch(GetAssignment(ClasId, PaginationValue)),
    };
};

MyClassesTables.layout = Instructor;

export default connect(mapStateToProps, mapDispatchToProps)(MyClassesTables);
