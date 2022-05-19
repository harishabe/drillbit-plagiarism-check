import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import Admin from './../../layouts/Admin';
import { BreadCrumb, CardInfoView, MainHeading } from './../../components';

const IntegrationBreadCrumb = [
  {
    name: 'Dashboard',
    link: '/admin/dashboard',
    active: false,
  },
  {
    name: 'Integrations',
    link: '',
    active: true,
  },
];

const classes = [
  {
    name: 'Java',
    description: 'Our team is here round the clock to help',
    validity: '2 days left',
    color: '#38BE62',
  },
  {
    name: 'Machine Learning',
    description: 'Our team is here round the clock to help',
    validity: '2 days left',
    color: '#F1A045',
  },
  {
    name: 'Data Science',
    description: 'Our team is here round the clock to help',
    validity: '2 days left',
    color: '#8D34FF',
  },
  {
    name: 'Data Management',
    description: 'Our team is here round the clock to help',
    validity: '2 days left',
    color: '#B94D34',
  },
  {
    name: 'Data Management',
    description: 'Our team is here round the clock to help',
    validity: '2 days left',
    color: '#666AF6',
  },
  {
    name: 'Data Management',
    description: 'Our team is here round the clock to help',
    validity: '2 days left',
    color: '#E9596F',
  },
  {
    name: 'Mathematics',
    description: 'Our team is here round the clock to help',
    validity: '2 days left',
    color: '#8D34FF',
  },
];

const Integration = () => {
  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid item md={10} xs={10}>
            <BreadCrumb item={IntegrationBreadCrumb} />
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

      <MainHeading title='Integrations (6)' />
      <Grid container spacing={2}>
        {classes.map((item, index) => (
          <Grid key={index} item md={4} xs={12}>
            <CardInfoView item={item} />
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
};

Integration.layout = Admin;

export default Integration;
