import React, { useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import Grid from '@mui/material/Grid';
import debouce from "lodash.debounce";
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import styled from 'styled-components';
import { TextField, Skeleton } from '@mui/material';
import Instructor from '../../layouts/Instructor';
import { BreadCrumb, MainHeading, Folder, CreateDrawer } from '../../components';
import { GetAllFolders } from '../../redux/action/instructor/InstructorAction';
import { PaginationValue } from '../../utils/PaginationUrl';
import MyFoldersForm from './form/MyFolderForm';

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

const AddButtonBottom = styled.div`
    position:absolute;
    bottom: 30px;
    right:30px;
`;

const MyFolder = ({
    GetAllFolders,
    myFolders,
    pageDetails,
    isLoading
}) => {

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
        setPaginationPayload({ ...paginationPayload, 'page': value - 1 })
    };

    /** search implementation using debounce concepts */

    const handleSearch = (event) => {
        if (event.target.value !== '') {
            paginationPayload['search'] = event.target.value;
            setPaginationPayload({ ...paginationPayload, paginationPayload });
        } else {
            delete paginationPayload['search'];
            setPaginationPayload({ ...paginationPayload, paginationPayload });
        }
    }

    const debouncedResults = useMemo(() => {
        return debouce(handleSearch, 300);
    }, []);

    useEffect(() => {
        return () => {
            debouncedResults.cancel();
        };
    });

    /** end debounce concepts */

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
                            onChange={ debouncedResults }
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
            <MainHeading title={ `My Folder(${pageDetails?.totalElements !== undefined ? pageDetails?.totalElements : 0})` } />

            { isLoading ?
                <Grid container spacing={ 2 }>
                    <Grid item md={ 4 } xs={ 12 }><Skeleton /></Grid>
                    <Grid item md={ 4 } xs={ 12 }><Skeleton /></Grid>
                    <Grid item md={ 4 } xs={ 12 }><Skeleton /></Grid>
                </Grid> :
                <>
                    <Grid container spacing={ 2 }>
                        { myFolders?.map((item, index) => (
                            <Grid key={ index } item md={ 3 } sm={ 4 } xs={ 6 }>
                                <Folder item={ item }
                                    // path='/instructor/studentlist' 
                                    path={ { pathname: '/instructor/studentlist', query: { name: item.folder_name, id: item.folder_id } } }
                                />
                            </Grid>
                        )) }
                    </Grid>
                </>
            }
            <AddButtonBottom>
                <CreateDrawer
                    title="Create Folder"
                    isShowAddIcon={ true }>
                    <MyFoldersForm />
                </CreateDrawer>
            </AddButtonBottom>

            { pageDetails?.totalPages > '1' ?
                <div style={ { marginLeft: '45%', marginTop: '25px' } }>
                    <Pagination
                        count={ pageDetails?.totalPages }
                        onChange={ handleChange }
                        color="primary"
                        variant="outlined"
                        shape="rounded"
                    />
                </div> : ''
            }

        </React.Fragment>
    );
};

const mapStateToProps = (state) => ({
    pageDetails: state?.instructorMyFolders?.myFolders?.page,
    myFolders: state?.instructorMyFolders?.myFolders?._embedded?.folderDTOList,
    isLoading: state?.instructorMyFolders?.isLoading,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetAllFolders: (paginationPayload) => dispatch(GetAllFolders(paginationPayload)),
    };
};

MyFolder.layout = Instructor;

export default connect(mapStateToProps, mapDispatchToProps)(MyFolder);
