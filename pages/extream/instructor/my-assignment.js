import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Instructor from '../../../layouts/Instructor';
import { BreadCrumb, TabMenu } from '../../../components';
import Assignments from './myAssignment/Assignments';
import Students from './myAssignment/Students';
import { GetStudent, GetAssignment } from '../../../redux/action/instructor/InstructorAction';

const MyClassesTables = ({
    pageDetailsStudent,
    pageDetailsAssignment,
    assignmentData,
    grammarSubscription,
    isLoadingAssignment,
    studentData,
    isLoadingStudent,
}) => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState(0);
    const [myclass, setMyclass] = useState('');

    useEffect(() => {
        if (router.isReady) {
            setMyclass(router.query.clasName);
        }
    }, [router.isReady]);

    const InstructorBreadCrumb = [
        {
            name: 'Dashboard',
            link: '/extream/instructor/dashboard',
            active: false,
        },
        {
            name: myclass,
            link: '/extream/instructor/myclasses',
            active: false,
        },
        {
            name: 'My assignments',
            link: '/extream/instructor/my-assignment',
            active: true,
        },
    ];

    const handleAPI = (value) => {
        setActiveTab(value);
    };

    const AssignmentComponent = activeTab === 0 && <Assignments
        pageDetailsAssignment={ pageDetailsAssignment }
        assignmentData={ assignmentData }
        isLoadingAssignment={ isLoadingAssignment }
        grammarSubscription={ grammarSubscription }
        activeTab={ activeTab }
    />;

    const StudentComponent = activeTab === 1 && <Students
        pageDetailsStudent={ pageDetailsStudent }
        studentData={ studentData }
        isLoadingStudent={ isLoadingStudent }
        activeTab={ activeTab }
    />;

    const componentList = [
        AssignmentComponent,
        StudentComponent
    ];

    const tabMenu = [
        {
            label: `Assignments(${pageDetailsAssignment?.totalElements !== undefined ? pageDetailsAssignment?.totalElements : 0})`,
        },
        {
            label: `Students(${pageDetailsStudent?.totalElements !== undefined ? pageDetailsStudent?.totalElements : 0})`,
        },
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

            <TabMenu
                menuButton={ tabMenu }
                components={ componentList }
                handleAPI={ handleAPI }
            />
        </React.Fragment>
    );
};

const mapStateToProps = (state) => ({
    pageDetailsStudent: state?.instructorClasses?.studentData?.page,
    pageDetailsAssignment: state?.instructorClasses?.assignmentData?.assignments?.page,
    assignmentData: state?.instructorClasses?.assignmentData?.assignments?.content,
    grammarSubscription: state?.instructorClasses?.assignmentData?.grammar_subscription,
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