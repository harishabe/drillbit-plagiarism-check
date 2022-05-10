import React from "react";
import Admin from './../../layouts/Admin';
import { BreadCrumb } from './../../components';

const IntegrationBreadCrumb = [{
    'name': 'Dashboard',
    'link': '/admin/dashboard',
    'active': false
}, {
    'name': 'Reports',
    'link': '',
    'active': true
}];

const Reports = () => {
    return (
        <React.Fragment>
            <BreadCrumb item={IntegrationBreadCrumb} />
        </React.Fragment>
    )
};

Reports.layout = Admin;

export default Reports;