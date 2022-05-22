import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';

import Instructor from '../../layouts/Instructor';
import { BreadCrumb, TabMenu } from '../../components';

import Submission from './submissions/submission';
import Grading from './submissions/grading';
import QNA from './submissions/q&a';

const InstructorBreadCrumb = [
  {
    name: 'Dashboard',
    link: '/instructor/dashboard',
    active: false,
  },
  {
    name: 'My classes',
    link: '/instructor/myclasses',
    active: false,
  },
  {
    name: 'Java',
    link: '/instructor/myclasstables',
    active: false,
  },
  {
    name: 'Submissions',
    link: '/instructor/mysubmissions',
    active: true,
  },
];

const tabMenu = [
  {
    label: 'Submission(5)',
  },
  {
    label: 'Grading',
  },
  {
    label: 'Question & Answer',
  },
];

const componentList = [<Submission />, <Grading />, <QNA />];

const MySubmissions = () => {
  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid item md={10} xs={10}>
            <BreadCrumb item={InstructorBreadCrumb} />
          </Grid>
          <Grid item md={2} xs={2}>
            <TextField
              placeholder='Search'
              inputProps={{
                style: {
                  padding: 5,
                  display: 'inline-flex',
                },
              }}
            />
          </Grid>
        </Grid>
      </Box>
      <TabMenu menuButton={tabMenu} components={componentList} />
    </React.Fragment>
  );
};

MySubmissions.layout = Instructor;

export default MySubmissions;
