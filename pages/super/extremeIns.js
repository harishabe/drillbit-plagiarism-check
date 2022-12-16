import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import SuperAdmin from './../../layouts/SuperAdmin';
import { BreadCrumb, TabMenu } from '../../components';
import Instructor from './extreme/Instructor';
import Students from './extreme/Students';
import { GetExtremeInstructorList, GetExtremeStudentList } from '../../redux/action/super/SuperAdminAction';

const extremeIns = ({
    pageDetailsInstructor,
    pageDetailsStudent,
    // assignmentData,
    isLoadingExtInsList,
    // studentData,
    isLoadingExtStuList,
}) => {
    // const router = useRouter();
    const [activeTab, setActiveTab] = useState(0);
    // const [myclass, setMyclass] = useState('');

    // useEffect(() => {
    //     if (router.isReady) {
    //         setMyclass(router.query.clasName);
    //     }
    // }, [router.isReady]);

    const SuperAdminBreadCrumb = [
        {
            name: 'Dashboard',
            link: '/super/dashboard',
            active: false,
        },
        {
            name: 'Extreme',
            link: '/super/extremproduct',
            active: false,
        },
        {
            name: 'Instructor',
            link: '',
            active: true,
        },
    ];

    const handleAPI = (value) => {
        setActiveTab(value);
    };

    const InstrcutorComponent = activeTab === 0 && <Instructor
        pageDetailsInstructor={ pageDetailsInstructor }
        // assignmentData={ assignmentData }
        isLoadingExtInsList={ isLoadingExtInsList }
        activeTab={ activeTab }
    />;

    const StudentComponent = activeTab === 1 && <Students
        pageDetailsStudent={ pageDetailsStudent }
        // studentData={ studentData }
        isLoadingExtStuList={ isLoadingExtStuList }
        activeTab={ activeTab }
    />;

    const componentList = [
        InstrcutorComponent,
        StudentComponent
    ];

    const tabMenu = [
        {
            label: `Instructors(${pageDetailsInstructor?.totalElements !== undefined ? pageDetailsInstructor?.totalElements : 0})`,
        },
        {
            label: `Students${pageDetailsStudent?.totalElements !== undefined && pageDetailsStudent?.totalElements > 0 ? '(' + pageDetailsStudent?.totalElements + ')' : ''}`,
        }
    ];

    return (
        <React.Fragment>
            <Box sx={ { flexGrow: 1 } }>
                <Grid container spacing={ 1 }>
                    <Grid item md={ 10 } xs={ 12 }>
                        <BreadCrumb item={ SuperAdminBreadCrumb } />
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
    pageDetailsInstructor: state?.superAdmin?.extInsList?.page,
    pageDetailsStudent: state?.superAdmin?.extStuList?.page,
    // assignmentData: state?.instructorClasses?.assignmentData?._embedded?.assignmentDTOList,
    isLoadingExtInsList: state?.superAdmin?.isLoadingExtInsList,
    isLoadingExtStuList: state?.superAdmin?.isLoadingExtStuList,
    // studentData: state?.instructorClasses?.studentData?._embedded?.studentDTOList,
    // isLoadingStudent: state?.instructorClasses?.isLoadingStudent,
    // isLoadingTemplate: state?.instructorClasses?.isLoadingTemplate,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetExtremeInstructorList: (url, PaginationValue) => dispatch(GetExtremeInstructorList(url, PaginationValue)),
        GetExtremeStudentList: (url, PaginationValue) => dispatch(GetExtremeStudentList(url, PaginationValue)),
    };
};

extremeIns.layout = SuperAdmin;

export default connect(mapStateToProps, mapDispatchToProps)(extremeIns);