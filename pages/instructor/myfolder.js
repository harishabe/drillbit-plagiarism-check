import React, { useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import Grid from '@mui/material/Grid';
import debouce from "lodash.debounce";
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import styled from 'styled-components';
import { TextField, Skeleton } from '@mui/material';
import Instructor from '../../layouts/Instructor';
import { DeleteWarningIcon } from '../../assets/icon';
import {
    BreadCrumb,
    MainHeading,
    Folder,
    CreateDrawer,
    WarningDialog,
    ErrorBlock
} from '../../components';
import { GetAllFolders, DeleteFolder } from '../../redux/action/instructor/InstructorAction';
import { PaginationValue } from '../../utils/PaginationUrl';
import MyFoldersForm from './form/MyFolderForm';
import { FOLDERS_NOT_FOUND } from '../../constant/data/ErrorMessage';

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
    DeleteFolder,
    myFolders,
    clasId,
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
        GetAllFolders(paginationPayload);
    }, [, paginationPayload]);

    const handleChange = (event, value) => {
        event.preventDefault();
        setPaginationPayload({ ...paginationPayload, 'page': value - 1 })
    };

    const handleFolderEdit = (e, rowData) => {
        e.preventDefault();
        setEditFolder(true);
        setEditFolderData(rowData);
    };

    const handleFolderDelete = (e, data) => {
        e.preventDefault();
        setShowDeleteWarning(true);
        setSelectedFolder(data);
    };

    const handleYesWarning = () => {
        DeleteFolder(selectedFolder.folder_id);
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
                    { myFolders?.length > 0 ? 
                        <Grid container spacing={ 2 }>
                            { myFolders?.map((item, index) => (
                                <Grid key={ index } item md={ 3 } sm={ 4 } xs={ 6 }>
                                    <Folder
                                        item={ item }
                                        isAction={ true }
                                        handleClick={ handleFolderEdit }
                                        handleDelete={ handleFolderDelete }
                                        path={ { pathname: '/instructor/studentlist', query: { name: item.folder_name, clasId, folderId: item.folder_id } } }
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
                        clasId={ clasId }
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
                >
                    <MyFoldersForm
                        clasId={ clasId }
                        editData={ editFolderData }
                    />
                </CreateDrawer>
            }

            { pageDetails?.totalPages > 1 &&
                <div style={ { marginLeft: '45%', marginTop: '25px' } }>
                    <Pagination
                        count={ pageDetails?.totalPages }
                        onChange={ handleChange }
                        color="primary"
                        variant="outlined"
                        shape="rounded"
                    />
                </div>
            }

        </React.Fragment>
    );
};

const mapStateToProps = (state) => ({
    pageDetails: state?.instructorMyFolders?.myFolders?.page,
    myFolders: state?.instructorMyFolders?.myFolders?._embedded?.folderDTOList,
    clasId: state?.instructorMyFolders?.myFolders?._embedded?.folderDTOList?.[0]?.class_id,
    isLoading: state?.instructorMyFolders?.isLoading,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetAllFolders: (paginationPayload) => dispatch(GetAllFolders(paginationPayload)),
        DeleteFolder: (folderId) => dispatch(DeleteFolder(folderId)),
    };
};

MyFolder.layout = Instructor;

export default connect(mapStateToProps, mapDispatchToProps)(MyFolder);
