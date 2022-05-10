import React from "react";
import Admin from '../../layouts/Admin';
import { BreadCrumb } from './../../components';

const IntegrationBreadCrumb = [{
    'name': 'Dashboard',
    'link': '/admin/dashboard',
    'active': false
}, {
    'name': 'Students',
    'link': '',
    'active': true
}];

const Students = () => {
    return (
        <React.Fragment>
            <BreadCrumb item={IntegrationBreadCrumb} />
        </React.Fragment>
    )
};

Students.layout = Admin;

export default Students;