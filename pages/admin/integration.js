import React from "react";
import Admin from './../../layouts/Admin';
import { BreadCrumb } from './../../components';

const IntegrationBreadCrumb = [{
    'name': 'Dashboard',
    'link': '/admin/dashboard',
    'active': false
}, {
    'name': 'Integrations',
    'link': '',
    'active': true
}];

const Integration = () => {
    return (
        <React.Fragment>
            <BreadCrumb item={IntegrationBreadCrumb} />
        </React.Fragment>
    )
};

Integration.layout = Admin;

export default Integration;