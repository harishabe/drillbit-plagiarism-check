import React, { useState, useEffect, useMemo } from 'react';
import debouce from "lodash.debounce";
import { connect } from 'react-redux';
import styled from 'styled-components';
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { TextField } from '@mui/material'
import { Pagination } from '@mui/material';
import { PaginationValue } from '../../utils/PaginationUrl';
import {
    BreadCrumb,
    MainHeading,
    CardView,
    CommonTable,
    CreateDrawer
} from './../../components';
import { DeleteIcon } from '../../assets/icon';
import Admin from '../../layouts/Admin';
import { GetRepoList } from '../../redux/action/admin/AdminAction';
import RepositaryForm from './form/RepositaryForm';
import { formatDate, removeCommaWordEnd } from '../../utils/RegExp';

const AdminBreadCrumb = [
    {
        name: 'Dashboard',
        link: '/admin/dashboard',
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
    { id: 'name', label: 'Author Name' },
    { id: 'email', label: 'Paper Title' },
    { id: 'date', label: 'Added Date' },
    { id: 'action', label: 'Actions' },
]

function createData(id, name, email, date, action) {
    return {
        id, name, email, date, action
    }
}

const Repository = ({
    GetRepoList,
    repoData,
    pageDetails,
    isLoadingRepo
}) => {

    const [rows, setRows] = useState([]);
    const [paginationPayload, setPaginationPayload] = useState({
        page: PaginationValue?.page,
        size: PaginationValue?.size,
        field: 'paper_id',
        orderBy: PaginationValue?.orderBy,
    });

    useEffect(() => {
        GetRepoList(paginationPayload);
    }, [, paginationPayload]);

    useEffect(() => {
        let row = '';
        let arr = [];
        repoData?.map((repo) => {
            row =
                createData(
                    repo.paper_id,
                    repo.name,
                    repo.title,
                    formatDate(repo.date_up),
                    [{ 'component': <DeleteIcon />, 'type': 'delete' }]
                );
            row['isSelected'] = false;
            arr.push(row)
        });
        setRows([...arr]);
    }, [repoData]);

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

    return (
        <React.Fragment>
            <Box sx={ { flexGrow: 1 } }>
                <Grid container spacing={ 1 }>
                    <Grid item md={ 10 } xs={ 10 }>
                        <BreadCrumb item={ AdminBreadCrumb } />
                    </Grid>
                    <Grid item md={ 2 } xs={ 2 }>
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
            </Box>
            <MainHeading title={ `Repository(${pageDetails?.totalElements !== undefined ? pageDetails?.totalElements : 0})` } />
            <AddButtonBottom>
                <CreateDrawer
                    isShowAddIcon={ true }
                    title='Upload File'
                >
                    <RepositaryForm />
                </CreateDrawer>
            </AddButtonBottom>
            <CardView>
                <>
                    <CommonTable
                        isCheckbox={ true }
                        isSorting={true}
                        tableHeader={ columns }
                        tableData={ rows }
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
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetRepoList: (PaginationValue) => dispatch(GetRepoList(PaginationValue)),
    };
};

Repository.layout = Admin

export default connect(mapStateToProps, mapDispatchToProps)(Repository);
