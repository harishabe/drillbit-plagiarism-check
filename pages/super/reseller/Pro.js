import React, { useEffect, useState, useMemo } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Grid, Tooltip, Skeleton, IconButton, Box, TextField, Pagination } from '@mui/material';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import debouce from 'lodash.debounce';
import {
    CommonTable
} from '../../../components';
import SuperAdmin from './../../../layouts/SuperAdmin';
import { GetExtremeStudentList } from '../../../redux/action/super/SuperAdminAction';
import {
    DownloadCsv
} from '../../../redux/action/common/Submission/SubmissionAction';
import { PaginationValue } from '../../../utils/PaginationUrl';
import { WINDOW_PLATFORM, DOWNLOAD_CSV } from '../../../constant/data/Constant';
import { PaginationContainer } from '../../../style/index';
import END_POINTS from '../../../utils/EndPoints';
import { BASE_URL_SUPER } from '../../../utils/BaseUrl';
import { platform } from '../../../utils/RegExp';

const SearchField = styled.div`
    position:absolute;
    top: 125px;
    right:16px;
`;

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
const columns = [
    { id: 'lid', label: 'LID', maxWidth: 60 },
    { id: 'name', label: 'Name', maxWidth: 140 },
    { id: 'email', label: 'Email', maxWidth: 170 },
    { id: 'college_name', label: 'Institution name', maxWidth: 170 },
    { id: 'country', label: 'Location', maxWidth: 90 },
    { id: 'instructors', label: 'Users', maxWidth: 70 },
    { id: 'documents', label: 'Documents', maxWidth: 110 },
    { id: 'used_documents', label: 'Submissions', maxWidth: 100 },
]

function createData(lid, name, email, college_name, country, instructors, documents, used_documents) {
    return { lid, name, email, college_name, country, instructors, documents, used_documents };
}

const Pro = ({
    GetExtremeStudentList,
    DownloadCsv,
    studentData,
    pageDetailsStudent,
    isLoadingExtStuList,
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
            GetExtremeStudentList(END_POINTS.SUPER_ADMIN_RESELLER_LIST + `reseller/${router?.query?.licenseId}/pro`, paginationPayload);
        }
    }, [router.isReady, paginationPayload]);

    useEffect(() => {
        let row = '';
        let arr = [];
        studentData?.map((data) => {
            row =
                createData(
                    data.lid,
                    data.name,
                    data.email,
                    data.college_name,
                    data.country,
                    data.instructors.toString(),
                    data.documents.toString(),
                    data.used_documents.toString()
                );
            row['isSelected'] = false;
            arr.push(row);
        });
        setRows([...arr]);
    }, [studentData]);

    const handleChange = (event, value) => {
        event.preventDefault();
        setPaginationPayload({ ...paginationPayload, 'page': value - 1 });
    };

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
        DownloadCsv(BASE_URL_SUPER + END_POINTS.SUPER_ADMIN_RESELLER_LIST + `resellerCsv/${router?.query?.licenseId}/pro`, DOWNLOAD_CSV.PRO_LISTS);
    };

    return (
        <React.Fragment>
            <Box sx={ { flexGrow: 1 } }>
                <Grid container spacing={ 1 }>
                    <Grid item container direction='row' justifyContent={ 'right' }>
                        <DownloadField>
                            <DownloadButton>
                                { studentData?.length > 0 &&
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
                    isLoading={ isLoadingExtStuList }
                    path=''
                />


                <PaginationContainer>
                    <Pagination
                        count={ pageDetailsStudent?.totalPages }
                        page={ pageDetailsStudent?.number + 1 }
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
    pageDetailsStudent: state?.superAdmin?.extStuList?.page,
    studentData: state?.superAdmin?.extStuList?._embedded?.licenseDTOList,
    isLoadingExtStuList: state?.superAdmin?.isLoadingExtStuList,
    isLoadingDownload: state?.submission?.isLoadingDownload,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetExtremeStudentList: (url, paginationPayload) => dispatch(GetExtremeStudentList(url, paginationPayload)),
        DownloadCsv: (url, title) => dispatch(DownloadCsv(url, title))
    };
};

Pro.layout = SuperAdmin;

export default connect(mapStateToProps, mapDispatchToProps)(Pro);