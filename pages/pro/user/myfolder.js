import React, { useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import Grid from '@mui/material/Grid';
import debouce from "lodash.debounce";
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import styled from 'styled-components';
import { TextField, Skeleton } from '@mui/material';
import ProUser from './../../../layouts/ProUser';
import { DeleteWarningIcon } from '../../../assets/icon';
import {
    BreadCrumb,
    MainHeading,
    Folder,
    CreateDrawer,
    WarningDialog,
    ErrorBlock
} from '../../../components';
import { GetAllFolders, DeleteFolder } from '../../../redux/action/instructor/InstructorAction';
import { PaginationValue } from '../../../utils/PaginationUrl';
import MyFoldersForm from './form/MyFolderForm';
import { FOLDERS_NOT_FOUND } from '../../../constant/data/ErrorMessage';
import { PaginationContainer } from '../../style/index';
import { BASE_URL_PRO } from '../../../utils/BaseUrl';
import END_POINTS_PRO from '../../../utils/EndPointPro';

const InstructorBreadCrumb = [
    {
        name: 'Dashboard',
        link: '/pro/user/dashboard',
        active: false,
    },
    {
        name: 'My folder',
        link: '',
        active: true,
    },
];

const AddButtonBottom = styled.div`
    position:fixed;
    bottom: 30px;
    right:30px;
`;

const MyFolder = ({
    GetAllFolders,
    DeleteFolder,
    myFolders,
    pageDetails,
    isLoading
}) => {

    const [editFolder, setEditFolder] = useState(false);
    const [editFolderData, setEditFolderData] = useState('');
    const [selectedFolder, setSelectedFolder] = useState('');
    const [showDeleteWarning, setShowDeleteWarning] = useState(false);
    const [paginationPayload, setPaginationPayload] = useState({
        page: PaginationValue?.page,
        size: PaginationValue?.size,
        field: 'ass_id',
        orderBy: PaginationValue?.orderBy,
    });

    useEffect(() => {
        GetAllFolders(BASE_URL_PRO + END_POINTS_PRO.USER_MY_FOLDERS, paginationPayload);
    }, [, paginationPayload]);

    const handleChange = (event, value) => {
        event.preventDefault();
        setPaginationPayload({ ...paginationPayload, 'page': value - 1 })
    };

    const handleFolderEdit = (e, rowData) => {
        e.preventDefault();
        setEditFolder(true)
        setEditFolderData(rowData);
    };

    const handleFolderDelete = (e, data) => {
        e.preventDefault();
        setShowDeleteWarning(true);
        setSelectedFolder(data);
    };

    const handleYesWarning = () => {
        DeleteFolder(BASE_URL_PRO + END_POINTS_PRO.USER_FOLDER_EDIT_AND_DELETE_DATA + '/' + selectedFolder.folder_id);
        setTimeout(() => {
            setShowDeleteWarning(false);
        }, [100]);
    };

    const handleCloseWarning = () => {
        setShowDeleteWarning(false);
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

    const handleCloseDrawer = (drawerClose) => {
        setEditFolder(drawerClose);
    }

    return (
        <React.Fragment>
            <Box sx={ { flexGrow: 1 } }>
                <Grid container spacing={ 1 }>
                    <Grid item md={ 10 } xs={ 10 }>
                        <BreadCrumb item={ InstructorBreadCrumb } />
                    </Grid>
                </Grid>
            </Box>
            <Grid container spacing={ 2 }>
                <Grid item md={ 8 } xs={ 12 }>
                    <MainHeading title={ `My Folder(${pageDetails?.totalElements !== undefined ? pageDetails?.totalElements : 0})` } />
                </Grid>
                <Grid item md={ 4 } xs={ 12 } align="right">
                    <TextField
                        placeholder='Search'
                        onChange={ debouncedResults }
                        inputProps={ {
                            style: {
                                padding: 5,
                                display: 'inline-flex',
                            },
                        } }
                    />
                </Grid>
            </Grid>

            { isLoading ?
                <Grid container spacing={ 2 }>
                    <Grid item md={ 4 } xs={ 12 }><Skeleton /></Grid>
                    <Grid item md={ 4 } xs={ 12 }><Skeleton /></Grid>
                    <Grid item md={ 4 } xs={ 12 }><Skeleton /></Grid>
                </Grid> :
                <>
                    { myFolders?.length > 0 ?
                        <Grid container spacing={ 2 } sx={ { overflowX: 'hidden' } }>
                            { myFolders?.map((item, index) => (
                                <Grid key={ index } item md={ 3 } sm={ 4 } xs={ 6 }>
                                    <Folder
                                        item={ item }
                                        isAction={ true }
                                        handleClick={ handleFolderEdit }
                                        handleDelete={ handleFolderDelete }
                                        path={ { pathname: '/pro/user/folderSubmission', query: { name: item.folder_name, folderId: item.folder_id } } }
                                    />
                                </Grid>
                            )) }
                        </Grid>
                        : <ErrorBlock message={ FOLDERS_NOT_FOUND } />
                    }
                </>
            }

            {
                showDeleteWarning &&
                <WarningDialog
                    warningIcon={ <DeleteWarningIcon /> }
                    message="Are you sure you want to delete ?"
                    handleYes={ handleYesWarning }
                    handleNo={ handleCloseWarning }
                    isOpen={ true }
                />
            }

            <AddButtonBottom>
                <CreateDrawer
                    title="Create Folder"
                    isShowAddIcon={ true }>
                    <MyFoldersForm
                        isLoading={ isLoading }
                    />
                </CreateDrawer>
            </AddButtonBottom>

            {
                editFolder &&
                <CreateDrawer
                    title="Edit Folder"
                    isShowAddIcon={ false }
                    showDrawer={ editFolder }
                    handleDrawerClose={ handleCloseDrawer }
                >
                    <MyFoldersForm
                        editData={ editFolderData }
                    />
                </CreateDrawer>
            }

            <PaginationContainer>
                <Pagination
                    count={ pageDetails?.totalPages }
                    onChange={ handleChange }
                    color="primary"
                    variant="outlined"
                    shape="rounded"
                />
            </PaginationContainer>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => ({
    pageDetails: state?.instructorMyFolders?.myFolders?.page,
    myFolders: state?.instructorMyFolders?.myFolders?._embedded?.foldersDTOList,
    isLoading: state?.instructorMyFolders?.isLoading,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetAllFolders: (url, paginationPayload) => dispatch(GetAllFolders(url, paginationPayload)),
        DeleteFolder: (url) => dispatch(DeleteFolder(url)),
    };
};

MyFolder.layout = ProUser;

export default connect(mapStateToProps, mapDispatchToProps)(MyFolder);
