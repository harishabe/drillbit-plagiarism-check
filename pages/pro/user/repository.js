import React, { useState, useEffect, useMemo } from 'react';
import debouce from 'lodash.debounce';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import { Pagination } from '@mui/material';
import { useRouter } from 'next/router';
import { PaginationValue } from '../../../utils/PaginationUrl';
import {
    BreadCrumb,
    MainHeading,
    CommonTable,
    CreateDrawer,
    WarningDialog,
    Instructions,
    CardView
} from './../../../components';
import { DeleteIcon, DeleteWarningIcon } from '../../../assets/icon';
import ProUser from '../../../layouts/ProUser';
import {
    GetRepoList,
    RemoveRepositary,
    UploadFileDataClear,
    UploadZipFileDataClear,
} from '../../../redux/action/instructor/InstructorAction';
import { formatDate } from '../../../utils/RegExp';
import { PaginationContainer } from '../../../style/index';
import { BASE_URL_PRO } from '../../../utils/BaseUrl';
import END_POINTS_PRO from '../../../utils/EndPointPro';
import { INSTRUCTIONS_STEPS } from '../../../constant/data/InstructionMessage';

const InstructorBreadCrumb = [
    {
        name: 'Dashboard',
        link: '/pro/user/dashboard',
        active: false,
    },
    {
        name: 'Repository',
        link: '',
        active: true,
    },
];

const AddButtonBottom = styled.div`
    position: fixed;
    bottom: 30px;
    right: 30px;
    z-index: 9999;
`;

const columns = [
    { id: 'paper_id', label: 'Paper ID' },
    { id: 'name', label: 'Name' },
    { id: 'mail_id', label: 'Email ID' },
    { id: 'title', label: 'Title' },
    { id: 'repository_type', label: 'Type' },
    { id: 'lang1', label: 'Language' },
    { id: 'date_up', label: 'Added Date' },
    { id: 'action', label: 'Action' },
];

function createData(paper_id, name, mail_id, title, repository_type, lang1, date_up, action) {
    return {
        paper_id, name, mail_id, title, repository_type, lang1, date_up, action
    };
}

const Repository = ({
    GetRepoList,
    RemoveRepositary,
    repoData,
    pageDetails,
    isLoadingRepo,
    UploadFileDataClear,
    extractedFileData,
    uploadData,
    UploadZipFileDataClear
}) => {

    const router = useRouter();
    const [rows, setRows] = useState([]);
    const [showInstructions, setShowInstructions] = useState(false);
    const [deleteRowData, setDeleteRowData] = useState('');
    const [showDeleteWarning, setShowDeleteWarning] = useState(false);
    const [search, setSearch] = useState(false);
    const [paginationPayload, setPaginationPayload] = useState({
        page: PaginationValue?.page,
        size: PaginationValue?.size,
        field: 'paper_id',
        orderBy: PaginationValue?.orderBy,
    });

    useEffect(() => {
        GetRepoList(BASE_URL_PRO + END_POINTS_PRO.USER_REPOSITARY_DATA, paginationPayload);
    }, [, paginationPayload]);

    useEffect(() => {
        let row = '';
        let arr = [];
        repoData?.map((repo) => {
            row =
                createData(
                    repo.paper_id,
                    repo.name,
                    repo.mail_id,
                    repo.title,
                    repo.repository_type,
                    repo.language,
                    formatDate(repo.date_up),
                    [{ 'component': <DeleteIcon />, 'type': 'delete', 'title': 'Delete' }]
                );
            row['isSelected'] = false;
            arr.push(row);
        });
        setRows([...arr]);
    }, [repoData]);

    useEffect(() => {
        if (rows.length === 0 && !isLoadingRepo) {
            const timer = setTimeout(() => {
                setShowInstructions(true);
            }, 100);
            return () => clearTimeout(timer);
        } else {
            setShowInstructions(false);
        }
    }, [isLoadingRepo, rows]);

    const handlePagination = (event, value) => {
        event.preventDefault();
        setPaginationPayload({ ...paginationPayload, 'page': value - 1 });
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

    const handleAction = (event, icon, rowData) => {
        if (icon === 'delete') {
            setDeleteRowData(rowData?.paper_id);
            setShowDeleteWarning(true);
        }
    };

    const handleCloseWarning = () => {
        setShowDeleteWarning(false);
    };

    const handleYesWarning = () => {
        RemoveRepositary(BASE_URL_PRO + END_POINTS_PRO.USER_REPOSITARY_REMOVE + deleteRowData);
        setTimeout(() => {
            setShowDeleteWarning(false);
        }, [100]);
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

    /**
    * file upload single, multiple and zip file
    */
    const handleUploadFile = () => {
        if (extractedFileData) {
            UploadFileDataClear();
        }
        if (uploadData) {
            UploadZipFileDataClear();
        }
        router.push({ pathname: '/pro/user/uploadFileRepository' });
    };

    const tableComponent = (
        <CommonTable
            isCheckbox={ false }
            isSorting={ true }
            isRepository={ true }
            tableHeader={ columns }
            tableData={ rows }
            charLength={ 10 }
            handleAction={ handleAction }
            handleTableSort={ handleTableSort }
            isLoading={ isLoadingRepo }
            path=''
        />
    );

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
                <Grid item md={ 5 } xs={ 5 }>
                    <MainHeading title={ `Repository(${pageDetails?.totalElements !== undefined ? pageDetails?.totalElements : 0})` } />
                </Grid>
                <Grid item md={ 7 } xs={ 7 } style={ { textAlign: 'right' } }>
                    <TextField
                        sx={ { width: '40%', marginTop: '8px' } }
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
                    title="Upload File"
                    isShowAddIcon={ true }
                    navigateToMultiFile={ true }
                    handleNavigateMultiFile={ handleUploadFile }
                >
                </CreateDrawer>
            </AddButtonBottom>

            { isLoadingRepo ? tableComponent :
                <>
                    { search ? tableComponent :
                        <>
                            { rows && rows.length > 0 ? tableComponent :
                                showInstructions && (
                                    <CardView>
                                        <Instructions message={ Object.values(INSTRUCTIONS_STEPS.REPOSITORY) } />
                                    </CardView>
                                )
                            }
                        </>
                    }
                </>
            }
            { !showInstructions && <PaginationContainer>
                <Pagination
                    count={ pageDetails?.totalPages }
                    onChange={ handlePagination }
                    color="primary"
                    variant="outlined"
                    shape="rounded"
                />
            </PaginationContainer> }
        </React.Fragment>
    );
};

const mapStateToProps = (state) => ({
    repoData: state?.instructorClasses?.repoData?._embedded?.directRepositoryInboxList,
    pageDetails: state?.instructorClasses?.repoData?.page,
    isLoadingRepo: state?.instructorClasses?.isLoadingRepo,
    extractedFileData: state?.instructorMyFolders?.extractedFileData,
    uploadData: state?.instructorMyFolders?.uploadData,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetRepoList: (url, PaginationValue) => dispatch(GetRepoList(url, PaginationValue)),
        RemoveRepositary: (url) => dispatch(RemoveRepositary(url)),
        UploadFileDataClear: () => dispatch(UploadFileDataClear()),
        UploadZipFileDataClear: () => dispatch(UploadZipFileDataClear())
    };
};

Repository.layout = ProUser;

export default connect(mapStateToProps, mapDispatchToProps)(Repository);
