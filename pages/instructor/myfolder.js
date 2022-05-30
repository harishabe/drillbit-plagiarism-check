import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import Instructor from '../../layouts/Instructor';
import { BreadCrumb, MainHeading, Folder } from '../../components';
import { GetAllFolders } from '../../redux/action/instructor/InstructorAction';

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

const MyFolder = ({ GetAllFolders, myFolders }) => {
    useEffect(() => {
        GetAllFolders();
    }, []);
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
                {myFolders?.map((item, index) => (
                    <Grid key={index} item md={3} sm={4} xs={6}>
                        <Folder item={item} path='/instructor/studentlist' />
                    </Grid>
                ))}
            </Grid>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => ({
    myFolders: state?.instructorMyFolders?.myFolders?.foldersDTO,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetAllFolders: () => dispatch(GetAllFolders()),
    };
};

MyFolder.layout = Instructor;

export default connect(mapStateToProps, mapDispatchToProps)(MyFolder);
