import React, { useState, useEffect, useMemo } from 'react';
import debouce from "lodash.debounce";
import { connect } from 'react-redux';
import styled from 'styled-components';
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { TextField } from '@mui/material'
import { Pagination } from '@mui/material';
import { useRouter } from "next/router";
import { PaginationValue } from '../../../utils/PaginationUrl';
import {
    BreadCrumb,
    MainHeading,
    CardView,
    CommonTable,
    CreateDrawer,
    WarningDialog
} from './../../../components';
import { DeleteIcon, DeleteWarningIcon } from '../../../assets/icon';
import Admin from '../../../layouts/Admin';
import { GetRepoList, RemoveRepositary } from '../../../redux/action/admin/AdminAction';
import {
    UploadFileDataClear,
    UploadZipFileDataClear,
} from '../../../redux/action/instructor/InstructorAction';
import { formatDate } from '../../../utils/RegExp';
import END_POINTS from '../../../utils/EndPoints';
import { BASE_URL_EXTREM } from '../../../utils/BaseUrl';

const AdminBreadCrumb = [
    {
        name: 'Dashboard',
        link: '/extream/admin/dashboard',
        active: false,
    },
    {
        name: 'Repository',
        link: '',
        active: true,
    },
]

const AddButtonBottom = styled.div`
    position: fixed;
    bottom: 30px;
    right: 30px;
`

const columns = [
    { id: 'id', label: 'Paper ID' },
    { id: 'name', label: 'Name' },
    { id: 'email', label: 'Email ID' },
    { id: 'title', label: 'Title' },
    { id: 'type', label: 'Type' },
    { id: 'date', label: 'Added Date' },
    { id: 'action', label: 'Action' },
]

function createData(id, name, email, title, type, date, action) {
    return {
        id, name, email, title, type, date, action
    }
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
    const [deleteRowData, setDeleteRowData] = useState('');
    const [showDeleteWarning, setShowDeleteWarning] = useState(false);
    const [paginationPayload, setPaginationPayload] = useState({
        page: PaginationValue?.page,
        size: PaginationValue?.size,
        field: 'paper_id',
        orderBy: PaginationValue?.orderBy,
    });

    useEffect(() => {
        GetRepoList(BASE_URL_EXTREM + END_POINTS.ADMIN_REPOSITARY_DATA, paginationPayload);
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
                    repo.date_up,
                    [{ 'component': <DeleteIcon />, 'type': 'delete', 'title': 'Delete' }]
                );
            row['isSelected'] = false;
            arr.push(row)
        });
        setRows([...arr]);
    }, [repoData]);

    const handleAction = (event, icon, rowData) => {
        if (icon === 'delete') {
            setDeleteRowData(rowData?.id);
            setShowDeleteWarning(true);
        }
    }

    const handleCloseWarning = () => {
        setShowDeleteWarning(false);
    };

    const handleYesWarning = () => {
        RemoveRepositary(BASE_URL_EXTREM + END_POINTS.ADMIN_REPOSITARY_REMOVE + deleteRowData);
        setTimeout(() => {
            setShowDeleteWarning(false);
        }, [100]);
    };

    const handlePagination = (event, value) => {
        event.preventDefault();
        setPaginationPayload({ ...paginationPayload, 'page': value - 1 });
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
        router.push({ pathname: '/extream/admin/uploadFileRepository' })
    }

    return (
        <React.Fragment>
            <Box sx={ { flexGrow: 1 } }>
                <Grid container spacing={ 1 }>
                    <Grid item md={ 10 } xs={ 10 }>
                        <BreadCrumb item={ AdminBreadCrumb } />
                    </Grid>
                </Grid>
            </Box>
            <Grid container spacing={ 2 }>
                <Grid item md={ 8 } xs={ 12 }>
                    <MainHeading
                        title={ `Repository (${pageDetails?.totalElements !== undefined ? pageDetails?.totalElements : 0})` }
                    />
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

            <CardView>
                <>
                    <CommonTable
                        isCheckbox={ false }
                        isSorting={ true }
                        tableHeader={ columns }
                        tableData={ rows }
                        handleAction={ handleAction }
                        charLength={ 10 }
                        isLoading={ isLoadingRepo }
                    />

                    <div style={ { marginLeft: '40%', marginTop: '25px' } }>
                        <Pagination
                            count={ pageDetails?.totalPages }
                            onChange={ handlePagination }
                            color="primary"
                            variant="outlined"
                            shape="rounded"
                        />
                    </div>
                </>
            </CardView>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({
    repoData: state?.detailsData?.repoData?._embedded?.directRepositoryInboxList,
    pageDetails: state?.detailsData?.repoData?.page,
    isLoadingRepo: state?.detailsData?.isLoadingRepo,
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

Repository.layout = Admin

export default connect(mapStateToProps, mapDispatchToProps)(Repository);
