import React, { useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import debouce from 'lodash.debounce';
import { Pagination } from '@mui/material';
import Instructor from '../../../../layouts/Instructor';
import { TextField, Grid } from '@mui/material';
import {
    CommonTable,
    SimilarityStatus
} from '../../../../components';
import { SubmissionHistory } from '../../../../redux/action/common/Submission/SubmissionAction';
import { formatDate } from '../../../../utils/RegExp';
import { BASE_URL_EXTREM } from '../../../../utils/BaseUrl';
import { PaginationContainer } from '../../../../style/index';
import { PaginationValue } from '../../../../utils/PaginationUrl';

const SubmissionColumns = [
    { id: 'name', label: 'Author Name' },
    { id: 'title', label: 'Paper Title' },
    { id: 'original_fn', label: 'Original File', isDownload: true },
    { id: 'lang1', label: 'Language' },
    { id: 'grammar_url', label: 'Grammar' },
    { id: 'percent', label: 'Similarity' },
    { id: 'paper_id', label: 'Paper ID' },
    { id: 'date_up', label: 'Submission Date' },
];

function submissionHistoryData(id, d_key, name, title, original_fn, lang1, grammar, grammar_url, lang, percent, paper_id, date_up) {
    return {
        id, d_key, name, title, original_fn, lang1, grammar, grammar_url, lang, percent, paper_id, date_up
    };
}

const SubmissionHistoryPage = ({
    SubmissionHistory,
    clasId,
    folderId,
    historyUserId,
    historyData,
    isLoadingHistory,
    pageDetails,
    handleOriginalFileDownload,
    handleShowAnalysisPage,
    handlGrammarReport,
    isLoadingGrammarReport
}) => {
    const router = useRouter();
    const [rows, setRows] = useState([]);
    const [paginationPayload, setPaginationPayload] = useState({
        page: PaginationValue?.page,
        size: PaginationValue?.size,
        field: 'paper_id',
        orderBy: PaginationValue?.orderBy,
    });

    useEffect(() => {
        if (router.isReady) {
            let url = BASE_URL_EXTREM + `/extreme/classes/${clasId}/assignments/${folderId}/${historyUserId}/submissionsHistory`;
            SubmissionHistory(url, paginationPayload)
        }
    }, [router.isReady, paginationPayload]);

    useEffect(() => {
        let row = '';
        let arr = [];
        historyData?.map((data) => {
            row =
                submissionHistoryData(
                    data.ass_id,
                    data.d_key,
                    data.name,
                    data.title,
                    data.original_fn,
                    data.lang1,
                    data.grammar,
                    data.grammar_url,
                    data.lang,
                    <SimilarityStatus percent={ data.percent } />,
                    data.paper_id,
                    formatDate(data.date_up),
                );
            arr.push(row);
        });
        setRows([...arr]);
    }, [historyData]);

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

    return (
        <>
            <Grid container spacing={ 1 }>
                <Grid item md={ 8 }>
                </Grid>
                <Grid item md={ 4 } xs={ 12 }>
                    <TextField
                        sx={ {
                            width: '20%',
                            position: 'fixed',
                            top: '13px',
                            right: '65px'
                        } }
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

            <CommonTable
                isCheckbox={ false }
                isSorting={ true }
                tableHeader={ SubmissionColumns }
                tableData={ rows }
                handleTableSort={ handleTableSort }
                downloadSubmissionFile={ handleOriginalFileDownload }
                showAnalysisPage={ handleShowAnalysisPage }
                showGrammarReport={ handlGrammarReport }
                charLength={ 10 }
                isLoading={ isLoadingHistory }
                isLoadingGrammarReport={ isLoadingGrammarReport }
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
    historyData: state?.submission?.historyData?._embedded?.submissionsList,
    pageDetails: state?.submission?.historyData?.page,
    isLoadingHistory: state?.submission?.isLoadingHistory
});

const mapDispatchToProps = (dispatch) => {
    return {
        SubmissionHistory: (url, PaginationValue) => dispatch(SubmissionHistory(url, PaginationValue)),
    };
};

SubmissionHistoryPage.layout = Instructor;

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionHistoryPage);