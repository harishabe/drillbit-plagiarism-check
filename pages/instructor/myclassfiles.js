import React from 'react';
import Grid from '@mui/material/Grid';
import Instructor from '../../layouts/Instructor';
import { CardInfoView } from '../../components';

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

const MyClassFiles = () => {
  return (
    <React.Fragment>
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

MyClassFiles.layout = Instructor;

export default MyClassFiles;
