import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import Instructor from '../../layouts/Instructor';
import { BreadCrumb, MainHeading, Folder } from '../../components';

const InstructorBreadCrumb = [
  {
    name: 'Dashboard',
    link: '/instructor/dashboard',
    active: false,
  },
  {
    name: 'My folder',
    link: '',
    active: true,
  },
];

const MyFolder = () => {
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
      <MainHeading title='My Folder(6)' />
      <Grid container spacing={2}>
        <Grid item md={3} sm={4} xs={6}>
          <Folder path='/instructor/studentlist' />
        </Grid>
        <Grid item md={3} sm={4} xs={6}>
          <Folder />
        </Grid>
        <Grid item md={3} sm={4} xs={6}>
          <Folder />
        </Grid>
        <Grid item md={3} sm={4} xs={6}>
          <Folder />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

MyFolder.layout = Instructor;

export default MyFolder;
