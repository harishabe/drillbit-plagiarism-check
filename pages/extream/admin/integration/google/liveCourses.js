import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Admin from './../../../../../layouts/Admin';
import {
    GetGoogleLiveCourses,
    GetGoogleImportCourses,
    GetGoogleCourseHome,
} from './../../../../../redux/action/admin/AdminAction';
import ClassList from './classList'

const LiveCourses = ({
    GetGoogleLiveCourses,
    GetGoogleImportCourses,
    GetGoogleCourseHome,
}) => {
    useEffect(() => {
        GetGoogleLiveCourses();
        GetGoogleCourseHome();
        GetGoogleImportCourses('abc');
    }, []);

    return(
        <ClassList />
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        GetGoogleLiveCourses: () => dispatch(GetGoogleLiveCourses()),
        GetGoogleImportCourses: (data) => dispatch(GetGoogleImportCourses(data)),
        GetGoogleCourseHome: () => dispatch(GetGoogleCourseHome()),
    };
};

LiveCourses.layout = Admin;

export default connect(null, mapDispatchToProps)(LiveCourses);