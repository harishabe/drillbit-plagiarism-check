import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Admin from './../../../../../layouts/Admin';
import { GetGoogleLiveCourses } from './../../../../../redux/action/admin/AdminAction';

const LiveCourses = ({
    GetGoogleLiveCourses,
}) => {
    useEffect(() => {
        GetGoogleLiveCourses();
    }, []);

    return(
        <>Live Courses - google class room</>
    )
}


const mapDispatchToProps = (dispatch) => {
    return {
        GetGoogleLiveCourses: () => dispatch(GetGoogleLiveCourses()),
    };
};

LiveCourses.layout = Admin;

export default connect(null, mapDispatchToProps)(LiveCourses);