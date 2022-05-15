import React from 'react'
import SuperAdmin from './../../layouts/SuperAdmin'
import { BreadCrumb } from './../../components'

const IntegrationBreadCrumb = [{
    'name': 'Dashboard',
    'link': '/admin/dashboard',
    'active': false
}, {
    'name': 'Reports',
    'link': '',
    'active': true
}]

const Dashboard = () => {
    return (
        <React.Fragment>
            <BreadCrumb item={IntegrationBreadCrumb} />
        </React.Fragment>
    )
}

Dashboard.layout = SuperAdmin

export default Dashboard