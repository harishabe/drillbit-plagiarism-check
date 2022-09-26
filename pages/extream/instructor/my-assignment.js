import React, { useState } from 'react';
import { connect } from 'react-redux';
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
    isLoadingAssignment,
    studentData,
    isLoadingStudent,
}) => {

    const [activeTab, setActiveTab] = useState(0);

    const InstructorBreadCrumb = [
        {
            name: 'Dashboard',
            link: '/extream/instructor/dashboard',
            active: false,
        },
        {
            name: 'My classes',
            link: '/extream/instructor/myclasses',
            active: false,
        },
        {
            name: 'My assignments',
            link: '/extream/instructor/myclasstables',
            active: true,
        },
    ]

    const handleAPI = (value) => {
        setActiveTab(value);
    }

    const AssignmentComponent = activeTab === 0 && <Assignments
        pageDetailsAssignment={pageDetailsAssignment}
        assignmentData={assignmentData}
        isLoadingAssignment={isLoadingAssignment}
    />

    const StudentComponent = activeTab === 1 && <Students
        pageDetailsStudent={pageDetailsStudent}
        studentData={studentData}
        isLoadingStudent={isLoadingStudent}
    />

    const componentList = [
        AssignmentComponent,
        StudentComponent
    ];

    const tabMenu = [
        {
            label: `Assignments(${pageDetailsAssignment?.totalElements !== undefined ? pageDetailsAssignment?.totalElements : 0})`,
        },
        {
            label: `Students${pageDetailsStudent?.totalElements !== undefined && pageDetailsStudent?.totalElements > 0 ? '(' + pageDetailsStudent?.totalElements + ')' : ''}`,
        }
    ];

    return (
        <React.Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item md={10} xs={12}>
                        <BreadCrumb item={InstructorBreadCrumb} />
                    </Grid>
                </Grid>
            </Box>

            <TabMenu
                menuButton={tabMenu}
                components={componentList}
                handleAPI={handleAPI}
            />
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
