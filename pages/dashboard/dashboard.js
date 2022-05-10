import React from "react";
import Admin from '../../layouts/Admin';
import { WidgetCard } from '../../components';

const Dashboard = () => {
    return (
        <React.Fragment>
            <WidgetCard />
        </React.Fragment>
    )
};

Dashboard.layout = Admin;

export default Dashboard;