import React from 'react';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Student from '../../layouts/Student';
import {
  BreadCrumb,
  CardView,
  SubTitle1,
  SubTitle,
  TabMenu,
  StatusDot,
} from '../../components';
import { DownloadFileIcon } from '../../assets/icon';

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
    label: 'Subject',
    name: 'Java',
  },
  {
    label: 'Assignment Name',
    name: 'Java1',
  },
  {
    label: 'Instructor Name',
    name: 'Akshay',
  },
  {
    label: 'Status',
    name: <StatusDot color='#38BE62' title='Active' />,
  },
  {
    label: 'Create Date',
    name: '01/01/2022',
  },
  {
    label: 'End Date',
    name: '02/02/2022',
  },
  {
    label: <DownloadFileIcon />,
  },
];

const tabMenu = [
  {
    label: 'Submission History',
  },
  {
    label: 'Q&A',
  },
  {
    label: 'Feedback',
  },
];

const componentList = [<SubmissionHistory />, <QA />, <Feedback />];

const MyAssignmentDetails = () => {
  return (
    <React.Fragment>
      <BreadCrumb item={StudentBreadCrumb} />
      {/* <MainHeading title='My Assignments Details' /> */}
      <CardView>
        <Grid container spacing={1}>
          {details.map((item, index) => (
            <Grid item md={2} xs={12}>
              <SubTitle title={item.label} />
              <SubTitle1 title={item.name} />
              <Divider orientation='vertical' flexItem />
            </Grid>
          ))}
        </Grid>
      </CardView>
      <TabMenu menuButton={tabMenu} components={componentList} />
    </React.Fragment>
  );
};

MyAssignmentDetails.layout = Student;

export default MyAssignmentDetails;
