import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Pagination } from '@mui/material';
import { useRouter } from 'next/router';
import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined';
import {
    CommonTable,
    CreateDrawer,
    SimilarityStatus,
    Instructions
} from '../../../components';
import {
    NonEnglishUploadIcon,
    EnglishUploadIcon
} from '../../../assets/icon';
import {
    GetGrammarReport
} from '../../../redux/action/common/Submission/SubmissionAction';
import { BASE_URL_ANALYSIS, BASE_URL_UPLOAD } from '../../../utils/BaseUrl';
import END_POINTS from '../../../utils/EndPoints';
import { formatDate, windowOpen, getItemSessionStorage } from '../../../utils/RegExp';
import { PaginationContainer, StyledButtonIcon, AddButtonBottom } from '../../../style/index';
import { SUBMISSION_DELAY } from '../../../constant/data/Constant';
import { INSTRUCTIONS_STEPS } from '../../../constant/data/InstructionMessage';

function createData(original_fn, lang1, paper_id, date_up, grammar, grammar_url, percent, score, status, action, d_key, alert_msg, repository_status, flag) {
    return { original_fn, lang1, paper_id, date_up, grammar, grammar_url, percent, score, status, action, d_key, alert_msg, repository_status, flag };
}

const SubmissionHistory = ({
    submissionData,
    isLoadingSubmission,
    pageDetails,
    handleChange,
    handleOriginalFileDownload,
    handleTableSort,
    handleAction,
    handleRefresh,
    GetGrammarReport,
    isLoadingGrammarReport
}) => {
    const router = useRouter();
    const [rows, setRows] = useState([]);

    const columns = [
        { id: 'original_fn', label: 'Filename', isDownload: true, maxWidth: 168 },
        { id: 'lang1', label: 'Language', maxWidth: 90 },
        { id: 'paper_id', label: 'Paper ID', maxWidth: 80 },
        { id: 'date_up', label: 'Date', maxWidth: 130 },
        { id: 'grammar_url', label: 'Grammar', maxWidth: 125 },
        { id: 'percent', label: 'Similarity', maxWidth: 120 },
        { id: 'score', label: 'Marks', maxWidth: 60 },
        { id: 'status', label: 'Status', maxWidth: 70 },
        { id: 'action', label: 'Feedback', maxWidth: 82 },
    ];

    useEffect(() => {
        if (isLoadingSubmission) {
            setRows([])
        }
    }, [isLoadingSubmission]);

    useEffect(() => {
        let row = '';
        let arr = [];
        submissionData?.map((submission) => {
            row =
                createData(
                    submission.original_fn,
                    submission.lang1,
                    submission.paper_id,
                    formatDate(submission.date_up),
                    submission.grammar,
                    submission.grammar_url,
                    <SimilarityStatus percent={ submission.percent } width={ 100 } flag={ submission.flag } />,
                    submission.feedback?.marks,
                    submission.status,
                    [
                        {
                            'component': <StyledButtonIcon variant="outlined" size='small'><FeedbackOutlinedIcon fontSize='medium' /></StyledButtonIcon>, 'type': 'feedback', 'title': 'Feedback'
                        },
                    ],
                    submission.d_key,
                    submission.alert_msg,
                    submission.rep_status
                );
            arr.push(row);
        });
        setRows([...arr]);
    }, [submissionData]);

    useEffect(() => {
        const result = rows?.some((item) => item?.percent?.props?.percent === '--');
        if (result) {
            const intervalId = setInterval(() => {
                handleRefresh()
            }, SUBMISSION_DELAY);

            return () => {
                clearInterval(intervalId);
            };
        }
    }, [rows]);

    const handleShowAnalysisPage = (e, row) => {
        let token = getItemSessionStorage('token');
        let url = BASE_URL_ANALYSIS + row.paper_id + '/' + row.d_key + '/' + token;
        windowOpen(url);
    };


    const handleShow = (e, info) => {
        if (info?.title === 'English') {
            router.push({ pathname: '/extream/student/uploadFile/englishFile', query: router.query });
        } else if (info?.title === 'Non English') {
            router.push({ pathname: '/extream/student/uploadFile/nonEnglishFile', query: router.query });
        }
    };

    const handlGrammarReport = (grammar) => {
        GetGrammarReport(BASE_URL_UPLOAD + END_POINTS.GRAMMAR_REPORT + grammar);
    }


    return (
        <>
            { rows.length > 0 ?
                <CommonTable
                    isCheckbox={ false }
                    isSorting={ true }
                    isStudentSubmission={ true }
                    tableHeader={ columns }
                    tableData={ rows }
                    downloadSubmissionFile={ handleOriginalFileDownload }
                    handleTableSort={ handleTableSort }
                    // isLoading={isLoadingSubmission}
                    handleAction={ handleAction }
                    showAnalysisPage={ handleShowAnalysisPage }
                    showGrammarReport={ handlGrammarReport }
                    isLoadingGrammarReport={ isLoadingGrammarReport }
                /> :
                <Instructions message={ Object.values(INSTRUCTIONS_STEPS.STUDENT_SUBMISSION) } />
            }


            <PaginationContainer>
                <Pagination
                    count={ pageDetails?.totalPages }
                    page={ pageDetails?.number + 1 }
                    onChange={handleChange}
                    color="primary"
                    variant="outlined"
                    shape="rounded"
                />
            </PaginationContainer>

            <AddButtonBottom>
                <CreateDrawer
                    options={[
                        {
                            icon: <NonEnglishUploadIcon />,
                            title: 'Non English',
                            handleFromCreateDrawer: true
                        },
                        {
                            icon: <EnglishUploadIcon />,
                            title: 'English',
                            handleFromCreateDrawer: true
                        }]}
                    handleMultiData={handleShow}
                    isShowAddIcon={true}
                    title="Upload File"
                    navigateToMultiFile={true}
                >
                </CreateDrawer>
            </AddButtonBottom>
        </>
    );
};

const mapStateToProps = (state) => ({
    isLoadingGrammarReport: state?.submission?.isLoadingGrammarReport
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetGrammarReport: (url) => dispatch(GetGrammarReport(url)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionHistory);
