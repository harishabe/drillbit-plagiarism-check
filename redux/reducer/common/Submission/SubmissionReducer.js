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
        default:
            return state;
    }
};

export default SubmissionReducer;