import React from "react";
import Admin from './../../layouts/Admin';

import { BreadCrumb } from './../../components';

const InstructorBreadCrumb = [{
    'name': 'Dashboard',
    'link': '/admin/dashboard',
    'active': false
}, {
    'name': 'Instructors',
    'link': '',
    'active': true
}];

const Instructor = () => {
    return (
        <React.Fragment>
            <BreadCrumb item={InstructorBreadCrumb} />
        </React.Fragment>
    )
};

Instructor.layout = Admin;

export default Instructor;