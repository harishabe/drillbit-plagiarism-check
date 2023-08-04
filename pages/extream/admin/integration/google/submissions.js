import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { Pagination } from '@mui/material';
import Admin from '../../../../../layouts/Admin';
import { Box, Grid } from '@mui/material';
import {
    CommonTable,
    SimilarityStatus,
    BreadCrumb,
    // WarningDialog
} from '../../../../../components';
import { GetSubmissionList } from '../../../../../redux/action/instructor/InstructorAction';
import { formatDate } from '../../../../../utils/RegExp';
import { BASE_URL_EXTREM } from '../../../../../utils/BaseUrl';
import { PaginationContainer } from '../../../../../style/index';
import { PaginationValue } from '../../../../../utils/PaginationUrl';

const Columns = [
    { id: 'name', label: 'Name' },
    { id: 'title', label: 'Title' },
    { id: 'original_fn', label: 'File', isDownload: true },
    { id: 'lang1', label: 'Language' },
    { id: 'percent', label: 'Similarity' },
    { id: 'paper_id', label: 'ID' },
    { id: 'date_up', label: 'Submission Date' },
];

function createData(id, d_key, name, title, original_fn, lang1, lang, percent, paper_id, date_up, flag) {
    return {
        id, d_key, name, title, original_fn, lang1, lang, percent, paper_id, date_up, flag
    };
}

const Submissions = ({
    GetSubmissionList,
    submissionData,
    isLoading,
    pageDetails
}) => {

    const router = useRouter();
    const [rows, setRows] = useState([]);
    // const [showDownloadWarning, setShowDownloadWarning] = useState(false);
    const [paginationPayload, setPaginationPayload] = useState({
        page: PaginationValue?.page,
        size: PaginationValue?.size,
        field: 'paper_id',
        orderBy: PaginationValue?.orderBy,
    });

    const IntegrationBreadCrumb = [
        {
            name: 'Dashboard',
            link: '/extream/admin/dashboard',
            active: false,
        },
        {
            name: 'Integrations',
            link: '/extream/admin/integration',
            active: false,
        },
        {
            name: 'Courses',
            link: '/extream/admin/integration/google/coursesDashboard',
            active: false,
        },
        {
            name: router?.query?.courseName,
            link: '/extream/admin/integration/google/classWork?' + router?.asPath.split('?')[1],
            active: false,
        },
        {
            name: router?.query?.assName,
            link: '',
            active: true,
        },
    ];

    useEffect(() => {
        if (router.isReady) {
            // let url = BASE_URL_EXTREM + `/extreme/classes/${clasId}/assignments/${folderId}/${historyUserId}/submissionsHistory`;
            GetSubmissionList('abc')
        }
    }, [router.isReady, paginationPayload]);

    useEffect(() => {
        let row = '';
        let arr = [];
        submissionData?.map((data) => {
            row =
                createData(
                    data.ass_id,
                    data.d_key,
                    data.name,
                    data.title,
                    data.original_fn,
                    data.lang1,
                    data.lang,
                    <SimilarityStatus percent={ data.percent } flag={ data.flag } />,
                    data.paper_id,
                    formatDate(data.date_up),
                );
            arr.push(row);
        });
        setRows([...arr]);
    }, [submissionData]);

    const handleTableSort = (e, column, sortToggle) => {
        if (sortToggle) {
            setPaginationPayload({ ...paginationPayload, 'field': column.id, 'orderBy': 'asc' });
        } else {
            setPaginationPayload({ ...paginationPayload, 'field': column.id, 'orderBy': 'desc' });
        }
    };

    const handleChange = (event, value) => {
        event.preventDefault();
        setPaginationPayload({ ...paginationPayload, page: value - 1 });
    };

    // const handleShowAnalysisPage = (e, row) => {
    //     let token = getItemSessionStorage('token');
    //     let url = BASE_URL_ANALYSIS + row.paper_id + '/' + row.d_key + '/' + token;
    //     windowOpen(url);
    // };

    // const handleOriginalFileDownload = (e, data) => {
    //     e.preventDefault();
    //     setShowDownloadWarning(true);
    //     setData(data);
    // };

    // const handleFileDownloadCloseWarning = () => {
    //     setShowDownloadWarning(false);
    // };

    // const handleFileDownloadYesWarning = () => {
    //     let detailedData = {
    //         clasId: clasId,
    //         assId: assId,
    //         paperId: data?.paper_id,
    //         name: data?.original_fn,
    //         path: 'assignmentSubmission'
    //     };
    //     DownloadOriginalFile(detailedData);
    //     setShowDownloadWarning(false);
    //     setTimeout(() => {
    //         setShowDownloadWarning(false);
    //     }, [100]);
    // };

    return (
        <>
            <Box sx={ { flexGrow: 1 } }>
                <Grid container spacing={ 1 }>
                    <Grid item md={ 12 } xs={ 10 }>
                        <BreadCrumb item={ IntegrationBreadCrumb } />
                    </Grid>
                </Grid>
            </Box>

            {/* {
                showDownloadWarning &&
                <WarningDialog
                    message={ WARNING_MESSAGES.DOWNLOAD }
                    handleYes={ handleFileDownloadYesWarning }
                    handleNo={ handleFileDownloadCloseWarning }
                    isOpen={ true }
                />
            } */}

            <CommonTable
                isCheckbox={ false }
                isSorting={ true }
                tableHeader={ Columns }
                tableData={ rows }
                handleTableSort={ handleTableSort }
                // downloadSubmissionFile={ handleOriginalFileDownload }
                // showAnalysisPage={ handleShowAnalysisPage }
                charLength={ 10 }
                isLoading={ isLoading }
                path=''
            />
            <PaginationContainer>
                <Pagination
                    count={ pageDetails?.totalPages }
                    onChange={ handleChange }
                    color="primary"
                    variant="outlined"
                    shape="rounded"
                />
            </PaginationContainer>
        </>
    );
};

const mapStateToProps = (state) => ({
    submissionData: state?.instructorMyFolders?.submissionData?._embedded?.submissionsList,
    pageDetails: state?.instructorMyFolders?.submissionData?.page,
    isLoading: state?.instructorMyFolders?.isLoadingSubmission
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetSubmissionList: (url) => dispatch(GetSubmissionList(url)),
    };
};

Submissions.layout = Admin;

export default connect(mapStateToProps, mapDispatchToProps)(Submissions);