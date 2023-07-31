import React, { useEffect, useState, useMemo } from 'react';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import styled from 'styled-components';
import debouce from 'lodash.debounce';
import { Grid, Tooltip, Skeleton, IconButton, Box, TextField, Pagination } from '@mui/material';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import SuperAdmin from './../../../layouts/SuperAdmin';
import {
    CommonTable
} from '../../../components';
import {
    GetExtremeInstructorList,
} from '../../../redux/action/super/SuperAdminAction';
import {
    DownloadCsv
} from '../../../redux/action/common/Submission/SubmissionAction';
import { PaginationValue } from '../../../utils/PaginationUrl';
import END_POINTS from '../../../utils/EndPoints';
import { BASE_URL_SUPER } from '../../../utils/BaseUrl';
import { WINDOW_PLATFORM, DOWNLOAD_CSV } from '../../../constant/data/Constant';
import { PaginationContainer } from '../../../style/index';
import { platform } from '../../../utils/RegExp';

const columns = [
    { id: 'lid', label: 'LID', maxWidth: 60 },
    { id: 'name', label: 'Name', maxWidth: 130 },
    { id: 'email', label: 'Email', maxWidth: 160 },
    { id: 'college_name', label: 'Institution name', maxWidth: 160 },
    { id: 'country', label: 'Location', maxWidth: 90 },
    { id: 'instructors', label: 'Instructors', maxWidth: 70 },
    { id: 'students', label: 'Students', maxWidth: 70 },
    { id: 'documents', label: 'Documents', maxWidth: 70 },
    { id: 'used_documents', label: 'Submissions', maxWidth: 70 },
];

function createData(lid, name, email, college_name, country, instructors, students, documents, used_documents) {
    return { lid, name, email, college_name, country, instructors, students, documents, used_documents };
};

const DownloadField = styled.div`
    position:absolute;
    top: 130px;
    right:${platform === WINDOW_PLATFORM ? '225px' : '205px'};
`;

const DownloadButton = styled.div`
    margin-top:-5px;
`;

const SkeletonContainer = styled.div`
    marginTop: 10px;
    margin-right: 5px;
`;

const SearchField = styled.div`
    position:absolute;
    top: 125px;
    right:16px;
`;

const Extreme = ({
    pageDetailsInstructor,
    GetExtremeInstructorList,
    DownloadCsv,
    extInsList,
    isLoadingExtInsList,
    isLoadingDownload
}) => {
    const router = useRouter();
    const [rows, setRows] = useState([]);
    const [paginationPayload, setPaginationPayload] = useState({
        page: PaginationValue?.page,
        size: PaginationValue?.size,
        field: 'lid',
        orderBy: PaginationValue?.orderBy,
    });

    useEffect(() => {
        if (router.isReady) {
            GetExtremeInstructorList(END_POINTS.SUPER_ADMIN_RESELLER_LIST + `reseller/${router?.query?.licenseId}/extreme`, paginationPayload);
        }
    }, [router.isReady, paginationPayload]);

    useEffect(() => {
        let row = '';
        let arr = [];
        extInsList?.map((data) => {
            row =
                createData(
                    data.lid,
                    data.name,
                    data.email,
                    data.college_name,
                    data.country,
                    data.instructors.toString(),
                    data.students.toString(),
                    data.documents.toString(),
                    data.used_documents.toString()
                );
            row['isSelected'] = false;
            arr.push(row);
        });
        setRows([...arr]);
    }, [extInsList]);

    const handleChange = (event, value) => {
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

    const handleDownload = () => {
        DownloadCsv(BASE_URL_SUPER + END_POINTS.SUPER_ADMIN_RESELLER_LIST + `resellerCsv/${router?.query?.licenseId}/extreme`, DOWNLOAD_CSV.EXTREME_LISTS);
    };

    return (
        <React.Fragment>
            <Box sx={ { flexGrow: 1 } }>
                <Grid container spacing={ 1 }>
                    <Grid item container direction='row' justifyContent={ 'right' }>
                        <DownloadField>
                            <DownloadButton>
                                { extInsList?.length > 0 &&
                                    isLoadingDownload ?
                                    <SkeletonContainer>
                                        <Skeleton style={ { marginTop: '10px' } } width={ 50 } />
                                    </SkeletonContainer>
                                    : <Tooltip title="Download csv" arrow>
                                        <IconButton
                                            aria-label="download-file"
                                            size="small"
                                            onClick={ handleDownload }>
                                            <FileDownloadOutlinedIcon fontSize='medium' />
                                        </IconButton>
                                    </Tooltip>
                                }
                            </DownloadButton>
                        </DownloadField>
                        <SearchField>
                            <TextField
                                placeholder='Search'
                                onChange={ debouncedResults }
                                inputProps={ {
                                    style: {
                                        padding: 5,
                                        display: 'inline-flex'
                                    }
                                } }
                            />
                        </SearchField>
                    </Grid>
                </Grid>
            </Box>

            <>
                <CommonTable
                    isCheckbox={ false }
                    isSorting={ true }
                    tableHeader={ columns }
                    tableData={ rows }
                    handleTableSort={ handleTableSort }
                    isLoading={ isLoadingExtInsList }
                    path=''
                />

                <PaginationContainer>
                    <Pagination
                        count={ pageDetailsInstructor?.totalPages }
                        page={ pageDetailsInstructor?.number + 1 }
                        onChange={ handleChange }
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
    pageDetailsInstructor: state?.superAdmin?.extInsList?.list?.page,
    extInsList: state?.superAdmin?.extInsList?._embedded?.licenseDTOList,
    isLoadingExtInsList: state?.superAdmin?.isLoadingExtInsList,
    isLoadingDownload: state?.submission?.isLoadingDownload,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetExtremeInstructorList: (url, paginationPayload) => dispatch(GetExtremeInstructorList(url, paginationPayload)),
        DownloadCsv: (url, title) => dispatch(DownloadCsv(url, title)),
    };
};

Extreme.layout = SuperAdmin;

export default connect(mapStateToProps, mapDispatchToProps)(Extreme);