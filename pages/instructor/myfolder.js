import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import { TextField } from '@mui/material';
import Instructor from '../../layouts/Instructor';
import { BreadCrumb, MainHeading, Folder } from '../../components';
import { GetAllFolders } from '../../redux/action/instructor/InstructorAction';
import { PaginationValue } from '../../utils/PaginationUrl';

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

const MyFolder = ({ GetAllFolders, myFolders, pageDetails}) => {

     const [paginationPayload, setPaginationPayload] = useState({
        page: PaginationValue?.page,
        size: PaginationValue?.size,
        field: 'ass_id',
        orderBy: PaginationValue?.orderBy,
    });

    useEffect(() => {
        GetAllFolders(paginationPayload);
    }, [, paginationPayload]);

     const handleChange = (event, value) => {
        event.preventDefault();
        setPaginationPayload({ ...paginationPayload, 'page': value - 1})
    };

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

            <div style={{ marginLeft: '30%', marginTop: '25px' }}>
                    <Pagination
                        count={pageDetails?.totalPages}
                        onChange={handleChange}
                        color="primary"
                        variant="outlined"
                        shape="rounded"
                    />
                </div>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => ({
    pageDetails: state?.instructorMyFolders?.myFolders?.page,
    myFolders: state?.instructorMyFolders?.myFolders?._embedded?.folderDTOList,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetAllFolders: (paginationPayload) => dispatch(GetAllFolders(paginationPayload)),
    };
};

MyFolder.layout = Instructor;

export default connect(mapStateToProps, mapDispatchToProps)(MyFolder);
