import React, { useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import MuiToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Grid from '@mui/material/Grid';
import debouce from 'lodash.debounce';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import styled from 'styled-components';
import { TextField, Skeleton, Tooltip } from '@mui/material';
import ProUser from './../../../layouts/ProUser';
import { DeleteWarningIcon, DeleteIcon, EditIcon } from '../../../assets/icon';
import {
    BreadCrumb,
    MainHeading,
    Folder,
    CreateDrawer,
    WarningDialog,
    Instructions,
    ErrorBlock,
    CommonTable,
    FolderIconSmall,
    CardView
} from '../../../components';
import { GetAllFolders, DeleteFolder } from '../../../redux/action/instructor/InstructorAction';
import { PaginationValue } from '../../../utils/PaginationUrl';
import { setItemSessionStorage, getItemSessionStorage } from '../../../utils/RegExp';
import MyFoldersForms from './form/MyFolderForms';
import { INSTRUCTIONS_STEPS } from '../../../constant/data/InstructionMessage';
import { FOLDER_VIEW, TABLE_VIEW } from '../../../constant/data/Constant';
import { PaginationContainer } from '../../../style/index';
import { BASE_URL_PRO } from '../../../utils/BaseUrl';
import END_POINTS_PRO from '../../../utils/EndPointPro';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import ViewListRoundedIcon from '@mui/icons-material/ViewListRounded';
import FolderIcon from '@mui/icons-material/Folder';

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

const ToggleButton = styled(MuiToggleButton)({
    '&.Mui-selected, &.Mui-selected:hover': {
        color: '#fff !important',
        backgroundColor: '#3672FF !important'
    }
});

const AddButtonBottom = styled.div`
    position:fixed;
    bottom: 30px;
    right:30px;
    z-index: 999;
`;

const columns = [
    { id: 'ass_id', label: 'Folder ID' },
    { id: 'assignment_name', label: 'Folder name' },
    { id: 'created_date', label: 'Created date' },
    { id: 'folder_no_of_submissions', label: 'No. of Submissions' },
    { id: 'action', label: 'Action' },
];

function createData(ass_id, assignment_name, created_date, folder_no_of_submissions, action, ex_references, ex_quotes, small_sources, ex_phrases, db_studentpaper, db_publications, db_internet, institution_repository, phrases, grammar) {
    return {
        ass_id, assignment_name, created_date, folder_no_of_submissions, action, ex_references
        , ex_quotes, small_sources, ex_phrases, db_studentpaper, db_publications, db_internet, institution_repository, phrases, grammar
    };
}

const MyFolder = ({
    GetAllFolders,
    DeleteFolder,
    myFolders,
    grammarSubscription,
    pageDetails,
    isLoading,
    isLoadingFolder,
    isLoadingEdit
}) => {
    const router = useRouter();
    const [view, setView] = useState(getItemSessionStorage('view') ? getItemSessionStorage('view') : TABLE_VIEW);
    const [rows, setRows] = useState([]);
    const [editFolder, setEditFolder] = useState(false);
    const [search, setSearch] = useState(false);
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

    const handleChangeView = (e, value) => {
        e.preventDefault();
        if (value !== null) {
            setView(value);
            setItemSessionStorage('view', value);
        }
    };

    const handleChange = (event, value) => {
        event.preventDefault();
        setPaginationPayload({ ...paginationPayload, 'page': value - 1 });
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
        DeleteFolder(BASE_URL_PRO + END_POINTS_PRO.USER_FOLDER_EDIT_AND_DELETE_DATA + '/' + (selectedFolder.folder_id || selectedFolder.ass_id));
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
            setSearch(true)
            setPaginationPayload({ ...paginationPayload, paginationPayload });
        } else {
            delete paginationPayload['search'];
            setSearch(false)
            setPaginationPayload({ ...paginationPayload, paginationPayload });
        }
    };

    const debouncedResults = useMemo(() => {
        return debouce(handleSearch, 300);
    }, []);

    useEffect(() => {
        return () => {
            debouncedResults.cancel();
        };
    });

    /** end debounce concepts */

    /** Table implementation functions start*/

    useEffect(() => {
        let row = '';
        let arr = [];
        myFolders?.map((folder) => {
            row =
                createData(
                    folder.folder_id,
                    <FolderIconSmall component={ [<FolderIcon fontSize='small' htmlColor='#56B2EA' />] } title={ folder.folder_name } charLength={ 17 } />,
                    folder.created_date,
                    folder.no_of_submissions,
                    [
                        { 'component': <EditIcon />, 'type': 'edit', 'title': 'Edit' },
                        { 'component': <DeleteIcon />, 'type': 'delete', 'title': 'Delete' },
                        { 'component': <ArrowForwardOutlinedIcon />, 'type': 'nextPath', 'title': 'Next' }
                    ],
                    folder.ex_references,
                    folder.ex_quotes,
                    folder.small_sources,
                    folder.ex_phrases,
                    folder.db_studentpaper,
                    folder.db_publications,
                    folder.db_internet,
                    folder.institution_repository,
                    folder.phrases,
                    folder.grammar
                );
            row['isSelected'] = false;
            arr.push(row);
        });
        setRows([...arr]);
    }, [myFolders]);

    const handleAction = (e, icon, rowData) => {
        if (icon === 'edit') {
            setEditFolder(true);
            setEditFolderData(rowData);
        } else if (icon === 'delete') {
            setShowDeleteWarning(true);
            setSelectedFolder(rowData);
        } else if (icon === 'nextPath') {
            router.push({
                pathname: '/pro/user/folderSubmission',
                query: {
                    name: rowData.assignment_name?.props?.title, folderId: rowData.ass_id, grammar: grammarSubscription?.toUpperCase() === 'YES' ? rowData.grammar : grammarSubscription
                }
            });
        }
    };

    const handleTableSort = (e, column, sortToggle) => {
        if (sortToggle) {
            paginationPayload['field'] = column.id;
            paginationPayload['orderBy'] = 'asc';
        } else {
            paginationPayload['field'] = column.id;
            paginationPayload['orderBy'] = 'desc';
        }
        setPaginationPayload({ ...paginationPayload, paginationPayload });
    };

    /** Table implementation functions end*/

    const handleCloseDrawer = (drawerClose) => {
        setEditFolder(drawerClose);
    };

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
                <Grid item md={ 3 } xs={ 5 }>
                    <MainHeading title={ `My Folder(${pageDetails?.totalElements !== undefined ? pageDetails?.totalElements : 0})` } />
                </Grid>
                <Grid item md={ 6.5 } style={ { textAlign: 'right', marginTop: '8px' } }>
                    <ToggleButtonGroup
                        color="primary"
                        size='small'
                        value={ view }
                        exclusive
                        onChange={ handleChangeView }
                    >
                        <Tooltip title='Table view' arrow>
                            <ToggleButton value={ TABLE_VIEW } selected={ view === TABLE_VIEW }><ViewListRoundedIcon fontSize='small' /></ToggleButton>
                        </Tooltip>
                        <Tooltip title='Folder view' arrow>
                            <ToggleButton value={ FOLDER_VIEW } selected={ view === FOLDER_VIEW }><FolderIcon fontSize='small' /></ToggleButton>
                        </Tooltip>
                    </ToggleButtonGroup>
                </Grid>
                <Grid item md={ 2.5 } xs={ 7 } style={ { textAlign: 'right' } }>
                    <TextField
                        sx={ { width: '100%', marginTop: '8px' } }
                        placeholder='Search'
                        onChange={ debouncedResults }
                        inputProps={ {
                            style: {
                                padding: 7,
                                display: 'inline-flex',
                            },
                        } }
                    />
                </Grid>
            </Grid>

            {
                view === FOLDER_VIEW ? (
                    <>
                        { isLoading ?
                            <Grid container spacing={ 2 }>
                                <Grid item md={ 3 } xs={ 12 }> <Skeleton variant="rectangular" height={ 150 } /></Grid>
                                <Grid item md={ 3 } xs={ 12 }> <Skeleton variant="rectangular" height={ 150 } /></Grid>
                                <Grid item md={ 3 } xs={ 12 }> <Skeleton variant="rectangular" height={ 150 } /></Grid>
                                <Grid item md={ 3 } xs={ 12 }> <Skeleton variant="rectangular" height={ 150 } /></Grid>
                            </Grid> :
                            <>
                                { search ?
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
                                                            path={ { pathname: '/pro/user/folderSubmission', query: { name: item.folder_name, folderId: item.folder_id, grammar: grammarSubscription?.toUpperCase() === 'YES' ? item.grammar : grammarSubscription } } }
                                                        />
                                                    </Grid>
                                                )) }
                                            </Grid>
                                            :
                                            <CardView>
                                                <ErrorBlock message="No data found" />
                                            </CardView>
                                        }
                                    </>
                                    :
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
                                                            path={ { pathname: '/pro/user/folderSubmission', query: { name: item.folder_name, folderId: item.folder_id, grammar: grammarSubscription?.toUpperCase() === 'YES' ? item.grammar : grammarSubscription } } }
                                                        />
                                                    </Grid>
                                                )) }
                                            </Grid>
                                            :
                                            <CardView>
                                                <Instructions message={ Object.values(INSTRUCTIONS_STEPS.FOLDER) } />
                                            </CardView>
                                        }
                                    </>
                                }
                            </>
                        }
                    </>
                ) : (
                        <>
                            { search ?
                                <CommonTable
                                    isCheckbox={ false }
                                    isSorting={ true }
                                    tableHeader={ columns }
                                    tableData={ rows }
                                    charLength={ 17 }
                                    handleAction={ handleAction }
                                    handleTableSort={ handleTableSort }
                                    isLoading={ isLoading }
                                    path=''
                                />
                                :
                                <>
                                    { rows.length > 0 ?
                                        <CommonTable
                                            isCheckbox={ false }
                                            isSorting={ true }
                                            tableHeader={ columns }
                                            tableData={ rows }
                                            charLength={ 17 }
                                            handleAction={ handleAction }
                                            handleTableSort={ handleTableSort }
                                            isLoading={ isLoading }
                                            path=''
                                        /> :
                                        <CardView>
                                            <Instructions message={ Object.values(INSTRUCTIONS_STEPS.FOLDER) } />
                                        </CardView>
                                    }
                                </>
                            }
                        </>
                )
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
                    <MyFoldersForms
                        isLoadingFolder={ isLoadingFolder }
                        grammarSubscription={ grammarSubscription }
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
                    <MyFoldersForms
                            editData={ editFolderData }
                            grammarSubscription={ grammarSubscription }
                            isLoadingEdit={ isLoadingEdit }
                    />
                </CreateDrawer>
            }

            <PaginationContainer>
                <Pagination
                    count={ pageDetails?.totalPages }
                    page={ pageDetails?.number + 1 }
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
    pageDetails: state?.instructorMyFolders?.myFolders?.folders?.page,
    myFolders: state?.instructorMyFolders?.myFolders?.folders?.content,
    grammarSubscription: state?.instructorMyFolders?.myFolders?.grammar_subscription,
    isLoading: state?.instructorMyFolders?.isLoading,
    isLoadingFolder: state?.instructorMyFolders?.isLoadingFolder,
    isLoadingEdit: state?.instructorMyFolders?.isLoadingEdit,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetAllFolders: (url, paginationPayload) => dispatch(GetAllFolders(url, paginationPayload)),
        DeleteFolder: (url) => dispatch(DeleteFolder(url)),
    };
};

MyFolder.layout = ProUser;

export default connect(mapStateToProps, mapDispatchToProps)(MyFolder);