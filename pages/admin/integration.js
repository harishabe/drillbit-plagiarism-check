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
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.  Arcu eget augue arcu gravida. Laoreet  eget aliquet consequat.',
    validity: '2 days left',
    color: '#38BE62',
    img: '/img/lms/quicklr.svg'
  },
  {
    name: 'Machine Learning',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.  Arcu eget augue arcu gravida. Laoreet  eget aliquet consequat.',
    validity: '2 days left',
    color: '#F1A045',
    img: '/img/lms/moodle.svg'
  },
  {
    name: 'Data Science',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.  Arcu eget augue arcu gravida. Laoreet  eget aliquet consequat.',
    validity: '2 days left',
    color: '#8D34FF',
    img: '/img/lms/blackboard.svg'
  },
  {
    name: 'Data Management',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.  Arcu eget augue arcu gravida. Laoreet  eget aliquet consequat.',
    validity: '2 days left',
    color: '#B94D34',
    img: '/img/lms/google-classroom.svg'
  },
  {
    name: 'Data Management',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.  Arcu eget augue arcu gravida. Laoreet  eget aliquet consequat.',
    validity: '2 days left',
    color: '#666AF6',
    img: '/img/lms/canvas.svg'
  },
  {
    name: 'Data Management',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.  Arcu eget augue arcu gravida. Laoreet  eget aliquet consequat.',
    validity: '2 days left',
    color: '#E9596F',
    img: '/img/lms/langquil.svg'
  },
]

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
            <CardInfoView
              item={item}
              isTimer={false}
              isKnowMore={true}
              isConfig={true}
              isAvatar={false}
              isImage={true}
              path=''
            />
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
};

Integration.layout = Admin;

export default Integration;
