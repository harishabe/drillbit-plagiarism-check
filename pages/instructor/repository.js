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
} from './../../components'
import Instructor from '../../layouts/Instructor'
import { GetRepoList } from '../../redux/action/instructor/InstructorAction';
import RepositaryForm from './form/RepositaryForm'
import { formatDate, removeCommaWordEnd } from '../../utils/RegExp';

const InstructorBreadCrumb = [
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
    position: absolute;
    bottom: 30px;
    right: 30px;
`

const columns = [
    { id: 'sl_no', label: 'Sl No' },
    { id: 'id', label: 'Paper ID' },
    { id: 'name', label: 'Author Name' },
    { id: 'email', label: 'Paper Title' },
    { id: 'date', label: 'Added Date' },
    { id: 'action', label: 'Actions' },
]

function createData(sl_no, id, name, email, date, action) {
    return {
        sl_no, id, name, email, date, action
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
        let i = 1;
        let arr = [];
        repoData?.map((repo) => {
            row =
                repo['sl_no'] = i++;
            createData(
                repo.paper_id,
                repo.name,
                repo.email,
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
                    {/* { _.find(data, function (o) { return o.isSelected === true }) && <div style={ { textAlign: 'left' } }>
                        <Button variant="contained" onClick={ addAllStudent } >
                            { isLoadingEnroll ? <BeatLoader color="#fff" /> : `Add new student` }
                        </Button>
                    </div> } */}

                    <CommonTable
                        isCheckbox={ true }
                        tableHeader={ columns }
                        tableData={ rows }
                        charLength={ 10 }
                        isLoading={ isLoadingRepo }
                    // handleAction={ handleAction }
                    // handleTableSort={ handleTableSort }
                    // handleCheckboxSelect={ handleCheckboxSelect }
                    // handleSingleSelect={ handleSingleSelect }
                    // path=''
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
    repoData: state?.instructorClasses?.repoData?._embedded?.directRepositoryInboxList,
    pageDetails: state?.instructorClasses?.repoData?._embedded?.page,
    isLoadingRepo: state?.instructorClasses?.isLoadingRepo,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetRepoList: (PaginationValue) => dispatch(GetRepoList(PaginationValue)),
    };
};

Repository.layout = Instructor

export default connect(mapStateToProps, mapDispatchToProps)(Repository);
