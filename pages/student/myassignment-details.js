import React from 'react';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Student from '../../layouts/Student';
import { BreadCrumb, CardView, SubTitle1, SubTitle, MainHeading, TabMenu } from '../../components';

import SubmissionHistory from './submission-history';
import QA from './q&a';
import Feedback from './feedback';

const StudentBreadCrumb = [
    {
        name: 'Dashboard',
        link: '/student/dashboard',
        active: false,
    },
    {
        name: 'My classes',
        link: '/student/myclasses',
        active: false,
    },
    {
        name: 'My assignments',
        link: '/student/myassignments',
        active: false,
    },
    {
        name: 'My assignments details',
        link: '',
        active: true,
    },
];

const details = [
    {
        'label': 'Subject',
        'name': 'Java'
    },
    {
        'label': 'Subject',
        'name': 'Java'
    },
    {
        'label': 'Subject',
        'name': 'Java'
    },
    {
        'label': 'Subject',
        'name': 'Java'
    },
    {
        'label': 'Subject',
        'name': 'Java'
    },
    {
        'label': 'Subject',
        'name': 'Java'
    }
];

const tabMenu = [
    {
        'label': 'Submission History'
    },
    {
        'label': 'Q&A'
    },
    {
        'label': 'Feedback'
    }
];

const componentList = [
    <SubmissionHistory />,
    <QA />,
    <Feedback />
]

const MyAssignmentDetails = () => {
    return (
        <React.Fragment>
            <BreadCrumb item={StudentBreadCrumb} />
            {/* <MainHeading title='My Assignments Details' /> */}
            <CardView>
                <Grid container spacing={2}>
                    {
                        details.map((item, index) => (
                            <Grid item md={2} xs={12}>
                                <SubTitle title={item.label} />
                                <SubTitle1 title={item.name} />
                                <Divider orientation="vertical" flexItem />
                            </Grid>
                        ))
                    }

                </Grid>
            </CardView>
            <TabMenu
                menuButton={tabMenu}
                components={componentList}
            />
        </React.Fragment>
    )
}

MyAssignmentDetails.layout = Student

export default MyAssignmentDetails
