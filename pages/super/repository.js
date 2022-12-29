import React, { useState, useEffect, useMemo } from 'react';
import debouce from 'lodash.debounce';
import { connect } from 'react-redux';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { TextField, Autocomplete } from '@mui/material';
import { Pagination } from '@mui/material';
import { PaginationValue } from '../../utils/PaginationUrl';
import {
    BreadCrumb,
    MainHeading,
    CommonTable,
    WarningDialog
} from './../../components';
import { DeleteIcon, DeleteWarningIcon } from '../../assets/icon';
import SuperAdmin from './../../layouts/SuperAdmin';
import { GetRepoList, ClearRepoData } from '../../redux/action/admin/AdminAction';
import { DropdownList, RemoveRepository, GlobalSearch, GlobalSearchClear } from '../../redux/action/super/SuperAdminAction';
import END_POINTS from '../../utils/EndPoints';
import { BASE_URL_SUPER } from '../../utils/BaseUrl';
import { formatDate } from '../../utils/RegExp';
import { PaginationContainer } from '../../style/index';

const RepositoryBreadCrumb = [
    {
        name: 'Dashboard',
        link: '/super/dashboard',
        active: false,
    },
    {
        name: 'Repository',
        link: '',
        active: true,
    },
];

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
    GlobalSearch,
    GlobalSearchClear,
    DropdownList,
    ClearRepoData,
    dpList,
    globalData,
    RemoveRepository,
    repoData,
    pageDetails,
    isLoadingRepo,
    isLoadingList
}) => {
    const [rows, setRows] = useState([]);
    const [list, setList] = useState();
    const [value, setValue] = useState();
    const [inputValue, setInputValue] = useState('');
    const [licenseId, setLicenseId] = useState('');
    const [deleteRowData, setDeleteRowData] = useState('');
    const [showDeleteWarning, setShowDeleteWarning] = useState(false);
    const [globalSearch, setGlobalSearch] = useState(false);
    const [paginationPayload, setPaginationPayload] = useState({
        page: PaginationValue?.page,
        size: PaginationValue?.size,
        field: 'paper_id',
        orderBy: PaginationValue?.orderBy,
    });

    if (inputValue === '' && repoData !== '') {
        ClearRepoData()
    }

    useEffect(() => {
        DropdownList(BASE_URL_SUPER + END_POINTS.SUPER_ADMIN_REPOSITORY_INSTITUTE)
        GlobalSearchClear()
        if (inputValue === '' && paginationPayload?.search) {
            GlobalSearch(BASE_URL_SUPER + END_POINTS.SUPER_ADMIN_REPOSITORY_SEARCH + paginationPayload?.search);
            setGlobalSearch(true)
        }
    }, [, paginationPayload]);

    useEffect(() => {
        let InstitutionList = [];
        dpList && dpList?.map((item) => {
            InstitutionList.push({ 'id': item?.lid, 'name': item?.college_name });
        });
        setList(InstitutionList);
    }, [dpList]);

    useEffect(() => {
        dpList && list?.map((item) => {
            if (inputValue === item?.name) {
                GetRepoList(BASE_URL_SUPER + END_POINTS.SUPER_ADMIN_REPOSITORY + `${item?.id}/repository`, paginationPayload);
                setLicenseId(item?.id)
            }
        })
    }, [dpList, inputValue, paginationPayload]);

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
        let arr = [];
        globalData &&
            arr.push(
                createData(
                    globalData?.paper_id,
                    globalData?.name,
                    globalData?.mail_id,
                    globalData?.title,
                    globalData?.repository_type,
                    globalData?.language,
                    globalData?.date_up && (formatDate(globalData?.date_up)),
                    [{ 'component': <DeleteIcon />, 'type': 'delete', 'title': 'Delete' }],
                )
            ),
            globalData?.lid && setLicenseId(globalData?.lid)
        // setLicenseId(1)
        setRows([...arr]);
    }, [globalData]);

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
        if (globalSearch) {
            console.log('global search delete')
        } else {
            RemoveRepository(BASE_URL_SUPER + END_POINTS.SUPER_ADMIN_REMOVE_REPOSITORY + `${licenseId}/removeRepository/${deleteRowData}`);
        }
        setTimeout(() => {
            setShowDeleteWarning(false);
            setGlobalSearch(false)
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

    return (
        <React.Fragment>
            <Box sx={ { flexGrow: 1 } }>
                <Grid container spacing={ 1 }>
                    <Grid item md={ 10 } xs={ 10 }>
                        <BreadCrumb item={ RepositoryBreadCrumb } />
                    </Grid>
                </Grid>
            </Box>
            <Grid container spacing={ 2 }>
                <Grid item md={ 6 } xs={ 5 }>
                    <MainHeading
                        title={ `Repository (${pageDetails?.totalElements !== undefined ? pageDetails?.totalElements : 0})` }
                    />
                </Grid>
                <Grid item md={ 6 } xs={ 12 } style={ { display: 'inline-flex' } }>
                    <Autocomplete
                        size='small'
                        sx={ { width: '400px', mr: 1 } }
                        value={ value }
                        onChange={ (event, newValue) => {
                            setValue(newValue);
                        } }
                        inputValue={ inputValue }
                        onInputChange={ (event, newInputValue) => {
                            setInputValue(newInputValue);
                        } }
                        options={ list !== undefined && list?.map((item) => {
                            return item?.name
                        }) }
                        renderInput={ (params) => <TextField { ...params } label="Institution list" /> }
                    />
                    <TextField
                        placeholder='Search'
                        onChange={ debouncedResults }
                        inputProps={ {
                            style: {
                                padding: 8,
                            }
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

            <>
                <CommonTable
                    isCheckbox={ false }
                    isSorting={ true }
                    tableHeader={ columns }
                    tableData={ rows }
                    handleAction={ handleAction }
                    handleTableSort={ handleTableSort }
                    charLength={ 10 }
                    isLoading={ isLoadingRepo || isLoadingList }
                />

                <PaginationContainer>
                    <Pagination
                        count={ pageDetails?.totalPages }
                        onChange={ handlePagination }
                        color="primary"
                        variant="outlined"
                        shape="rounded"
                    />
                </PaginationContainer>
            </>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => ({
    repoData: state?.detailsData?.repoData?._embedded?.repositoryListList,
    pageDetails: state?.detailsData?.repoData?.page,
    isLoadingRepo: state?.detailsData?.isLoadingRepo,
    isLoadingList: state?.superAdmin?.isLoadingList,
    dpList: state?.superAdmin?.ListSuccess,
    globalData: state?.superAdmin?.globalData,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetRepoList: (url, PaginationValue) => dispatch(GetRepoList(url, PaginationValue)),
        GlobalSearch: (url) => dispatch(GlobalSearch(url)),
        GlobalSearchClear: () => dispatch(GlobalSearchClear()),
        RemoveRepository: (url) => dispatch(RemoveRepository(url)),
        DropdownList: (url) => dispatch(DropdownList(url)),
        ClearRepoData: () => dispatch(ClearRepoData()),
    };
};

Repository.layout = SuperAdmin;

export default connect(mapStateToProps, mapDispatchToProps)(Repository);
