import React from 'react';
// import React, { useMemo } from 'react';
// import debouce from "lodash.debounce";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { TextField } from '@mui/material';
import Student from '../../layouts/Student'
import { BreadCrumb, CardInfoView, MainHeading } from '../../components'

const StudentBreadCrumb = [
    {
        name: 'Dashboard',
        link: '/student/dashboard',
        active: false,
    },
    {
        name: 'My classes',
        link: '',
        active: true,
    },
]

const classes = [
    {
        class_name: 'Java(3)',
        description: 'Our team is here round the clock to help',
        validity: '2 days left',
        color: '#38BE62',
    },
    {
        class_name: 'Machine Learning(2)',
        description: 'Our team is here round the clock to help',
        validity: '2 days left',
        color: '#F1A045',
    },
    {
        class_name: 'Data Science(4)',
        description: 'Our team is here round the clock to help',
        validity: '2 days left',
        color: '#8D34FF',
    },
    {
        class_name: 'Data Management(1)',
        description: 'Our team is here round the clock to help',
        validity: '2 days left',
        color: '#B94D34',
    },
    {
        class_name: 'Data Management(3)',
        description: 'Our team is here round the clock to help',
        validity: '2 days left',
        color: '#666AF6',
    },
    {
        class_name: 'Data Management(2)',
        description: 'Our team is here round the clock to help',
        validity: '2 days left',
        color: '#E9596F',
    },
    {
        class_name: 'Mathematics(6)',
        description: 'Our team is here round the clock to help',
        validity: '2 days left',
        color: '#8D34FF',
    },
]

const debouncedResults = (data) => {
    return console.log("first", data)
};

/** search implementation using debounce concepts */

// const handleSearch = (event) => {
//     if (event.target.value !== '') {
//         paginationPayload['search'] = event.target.value;
//         setPaginationPayload({ ...paginationPayload, paginationPayload });
//     } else {
//         delete paginationPayload['search'];
//         setPaginationPayload({ ...paginationPayload, paginationPayload });
//     }
// }

// const debouncedResults = useMemo(() => {
//     return debouce(handleSearch, 300);
// }, []);

// useEffect(() => {
//     return () => {
//         debouncedResults.cancel();
//     };
// });

/** end debounce concepts */

const MyClasses = () => {
    return (
        <React.Fragment>
            <BreadCrumb item={StudentBreadCrumb} />
            <Box sx={ { flexGrow: 1 } }>
                <Grid container spacing={ 1 }>
                    <Grid item md={ 8 }>
                        <MainHeading title={ 'My Classes(6)' } />
                    </Grid>
                    <Grid item md={ 4 } xs container direction='row' justifyContent={ 'right' }>
                        <TextField
                            placeholder='Search'
                            onChange={ debouncedResults }
                            inputProps={ {
                                style: {
                                    padding: 5,
                                    display: 'inline-flex'
                                }
                            } }
                        />
                    </Grid>
                </Grid>
            </Box>
            <Grid container spacing={2}>
                {classes.map((item, index) => (
                    <Grid key={index} item md={4} xs={12}>
                        <CardInfoView
                            item={item}
                            isTimer={true}
                            isHeading={true}
                            isAvatar={true}
                            path="/student/myassignments"
                        />
                    </Grid>
                ))}
            </Grid>
        </React.Fragment>
    )
}

MyClasses.layout = Student

export default MyClasses
