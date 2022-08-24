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
    CreateDrawer,
    WarningDialog
} from './../../components';
import { DeleteIcon, DeleteWarningIcon } from '../../assets/icon';
import Instructor from '../../layouts/Instructor';
import { GetRepoList, RemoveRepositary } from '../../redux/action/instructor/InstructorAction';
import RepositaryForm from './form/RepositaryForm';
import { formatDate, removeCommaWordEnd } from '../../utils/RegExp';

const InstructorBreadCrumb = [
    {
        name: 'Dashboard',
        link: '/instructor/dashboard',
        active: false,
    },
    {
        name: 'Repository',
        link: '',
        active: true,
    },
]

const AddButtonBottom = styled.div`
    position: absolute;
    bottom: 30px;
    right: 30px;
`

const columns = [
    { id: 'id', label: 'Paper ID' },
    { id: 'name', label: 'Name' },
    { id: 'email', label: 'Email ID' },
    { id: 'title', label: 'Title' },
    { id: 'date', label: 'Added Date' },
    { id: 'action', label: 'Actions' },
]

function createData(id, name, email, title, date, action) {
    return {
        id, name, email, title, date, action
    }
}

const Repository = ({
    GetRepoList,
    RemoveRepositary,
    repoData,
    pageDetails,
    isLoadingRepo
}) => {

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
                    repo.mail_id,
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
        RemoveRepositary(deleteRowData);
        setTimeout(() => {
            setShowDeleteWarning(false);
        }, [100]);
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
                <Grid item md={ 8 } xs={ 12 }>
                    <MainHeading title={ `Repositary(${pageDetails?.totalElements !== undefined ? pageDetails?.totalElements : 0})` } />
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
                    isShowAddIcon={true}
                    title='Upload File'
                >
                    <RepositaryForm />
                </CreateDrawer>
            </AddButtonBottom>
            <CardView>
                <>
                    <CommonTable
                        isCheckbox={true}
                        isSorting={ true }
                        tableHeader={columns}
                        tableData={rows}
                        charLength={10}
                        handleAction={ handleAction }
                        isLoading={isLoadingRepo}
                        path=''
                    />

                    <div style={{ marginLeft: '40%', marginTop: '25px' }}>
                        <Pagination
                            count={pageDetails?.totalPages}
                            onChange={handlePagination}
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
    repoData: state?.instructorClasses?.repoData?._embedded?.directRepositoryInboxList,
    pageDetails: state?.instructorClasses?.repoData?.page,
    isLoadingRepo: state?.instructorClasses?.isLoadingRepo,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetRepoList: (PaginationValue) => dispatch(GetRepoList(PaginationValue)),
        RemoveRepositary: (id) => dispatch(RemoveRepositary(id)),
    };
};

Repository.layout = Instructor

export default connect(mapStateToProps, mapDispatchToProps)(Repository);
