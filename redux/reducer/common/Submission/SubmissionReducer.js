import * as types from '../../../action/CommonActionType';

const SubmissionReducer = (state = {}, action) => {
    switch (action.type) {
        case types.FETCH_DOWNLOAD_ORIGINAL_FILE_START:
            return {
                ...state,
                isLoadingDownloadFile: true,
            };
        case types.FETCH_DOWNLOAD_ORIGINAL_FILE_SUCCESS:
            return {
                ...state,
                isLoadingDownloadFile: false,
                downloadFileData: action.payload,
            };
        case types.FETCH_DOWNLOAD_ORIGINAL_FILE_FAIL:
            return {
                ...state,
                isLoadingDownloadFile: false,
                downloadFileError: action.payload,
            };
        case types.FETCH_DOWNLOAD_CSV_START:
            return {
                ...state,
                isLoadingDownload: true,
            };
        case types.FETCH_DOWNLOAD_CSV_SUCCESS:
            return {
                ...state,
                isLoadingDownload: false,
                downloadData: action.payload,
            };
        case types.FETCH_DOWNLOAD_CSV_FAIL:
            return {
                ...state,
                isLoadingDownload: false,
                downloadDataError: action.payload,
            };
        case types.FETCH_FOLDER_SUBMISSION_LIST_START:
            return {
                ...state,
                isLoadingSubmission: true,
            };
        case types.FETCH_FOLDER_SUBMISSION_LIST_SUCCESS:
            return {
                ...state,
                isLoadingSubmission: false,
                folderSubmissionData: action.payload,
            };
        case types.FETCH_FOLDER_SUBMISSION_LIST_FAIL:
            return {
                ...state,
                isLoadingSubmission: false,
                folderSubmissionError: action.payload,
            };
        case types.FETCH_FOLDER_SUBMISSION_LIST_DELETE_START:
            return {
                ...state,
                isLoadingDelete: true,
            };
        case types.FETCH_FOLDER_SUBMISSION_LIST_DELETE_SUCCESS:
            return {
                ...state,
                isLoadingDelete: false,
                deleteData: action.payload,
            };
        case types.FETCH_FOLDER_SUBMISSION_LIST_DELETE_FAIL:
            return {
                ...state,
                isLoadingDelete: false,
                deleteDataError: action.payload,
            };
        case types.FETCH_GRAMMAR_REPORT_START:
            return {
                ...state,
                isLoadingGrammarReport: true,
            };
        case types.FETCH_GRAMMAR_REPORT_SUCCESS:
            return {
                ...state,
                isLoadingGrammarReport: false,
                grammarReportData: action.payload,
            };
        case types.FETCH_GRAMMAR_REPORT_FAIL:
            return {
                ...state,
                isLoadingGrammarReport: false,
                grammarReportData: action.payload,
            }
        case types.FETCH_SAVE_TO_REPOSITORY_START:
            return {
                ...state,
                isLoadingSaveRepo: true,
            };
        case types.FETCH_SAVE_TO_REPOSITORY_SUCCESS:
            return {
                ...state,
                isLoadingSaveRepo: false,
                saveRepoData: action.payload,
            };
        case types.FETCH_SAVE_TO_REPOSITORY_FAIL:
            return {
                ...state,
                isLoadingSaveRepo: false,
                saveRepoData: action.payload,
            };
        case types.FETCH_SUBMISSION_HISTORY_START:
            return {
                ...state,
                isLoadingHistory: true,
            };
        case types.FETCH_SUBMISSION_HISTORY_SUCCESS:
            return {
                ...state,
                isLoadingHistory: false,
                historyData: action.payload,
            };
        case types.FETCH_SUBMISSION_HISTORY_FAIL:
            return {
                ...state,
                isLoadingHistory: false,
                historyData: action.payload,
            };
        case types.FETCH_SUBMISSION_BULK_REPORT_START:
            return {
                ...state,
                isLoadingBulkDownload: true,
            };
        case types.FETCH_SUBMISSION_BULK_REPORT_SUCCESS:
            return {
                ...state,
                isLoadingBulkDownload: false,
                submissionBulkDownload: action.payload,
            };
        case types.FETCH_SUBMISSION_BULK_REPORT_FAIL:
            return {
                ...state,
                isLoadingBulkDownload: false,
                submissionBulkDownloadErr: action.payload,
            };
        case types.FETCH_SUBMISSION_REPORT_DOWNLOAD_START:
            return {
                ...state,
                isLoadingSubmissionReport: true,
            };
        case types.FETCH_SUBMISSION_REPORT_DOWNLOAD_SUCCESS:
            return {
                ...state,
                isLoadingSubmissionReport: false,
                submissionDownload: action.payload,
            };
        case types.FETCH_SUBMISSION_REPORT_DOWNLOAD_FAIL:
            return {
                ...state,
                isLoadingSubmissionReport: false,
                submissionDownloadErr: action.payload,
            };
        default:
            return state;
    }
};

export default SubmissionReducer;