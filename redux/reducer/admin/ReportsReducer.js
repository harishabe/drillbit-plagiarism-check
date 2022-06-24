import * as types from '../../action/ActionType';

const ReportsReducer = (state = {}, action) => {
    switch (action.type) {
        case types.FETCH_ADMIN_REPORTS_DATA_START:
            return {
                ...state,
                isLoading: true,
            };
        case types.FETCH_ADMIN_REPORTS_DATA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                reportData: action.payload,
            };
        case types.FETCH_ADMIN_REPORTS_DATA_FAIL:
            return {
                ...state,
                isLoading: false,
                reportDataError: action.payload,
            };
        case types.FETCH_ADMIN_INSTRUCTOR_STUDENT_DOWNLOAD_START:
            return {
                ...state,
                isLoadingDownload: true,
            };
        case types.FETCH_ADMIN_INSTRUCTOR_STUDENT_DOWNLOAD_SUCCESS:
            return {
                ...state,
                isLoadingDownload: false,
                reportDataDownload: action.payload,
            };
        case types.FETCH_ADMIN_INSTRUCTOR_STUDENT_DOWNLOAD_FAIL:
            return {
                ...state,
                isLoadingDownload: false,
                reportDataDownloadError: action.payload,
            };
        case types.FETCH_ADMIN_REPORTS_VIEW_DOWNLOAD_START:
            return {
                ...state,
                isLoadingViewReport: true,
            };
        case types.FETCH_ADMIN_REPORTS_VIEW_DOWNLOAD_SUCCESS:
            return {
                ...state,
                isLoadingViewReport: false,
                viewDownloadData: action.payload,
            };
        case types.FETCH_ADMIN_REPORTS_VIEW_DOWNLOAD_FAIL:
            return {
                ...state,
                isLoadingViewReport: false,
                viewDownloadDataError: action.payload,
            };
        case types.FETCH_ADMIN_REPORTS_VIEW_SUBMISSION_DOWNLOAD_START:
            return {
                ...state,
                isLoadingSubmissionReport: true,
            };
        case types.FETCH_ADMIN_REPORTS_VIEW_SUBMISSION_DOWNLOAD_SUCCESS:
            return {
                ...state,
                isLoadingSubmissionReport: false,
                submissionDownloadData: action.payload,
            };
        case types.FETCH_ADMIN_REPORTS_VIEW_SUBMISSION_DOWNLOAD_FAIL:
            return {
                ...state,
                isLoadingSubmissionReport: false,
                submissionDownloadDataError: action.payload,
            };
        default:
            return state;
    }
}

export default ReportsReducer;