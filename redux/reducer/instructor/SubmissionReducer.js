import * as types from '../../action/ActionType';

const SubmissionReducer = (state = {}, action) => {
    switch (action.type) {
        case types.FETCH_INSTRUCTOR_SUBMISSIONS_GRADING_QNA_EDIT_START:
            return {
                ...state,
                isLoadingEditSubmission: true,
            };
        case types.FETCH_INSTRUCTOR_SUBMISSIONS_GRADING_QNA_EDIT_SUCCESS:
            return {
                ...state,
                isLoadingEditSubmission: false,
                EditSubmissionData: action.payload,
            };
        case types.FETCH_INSTRUCTOR_SUBMISSIONS_GRADING_QNA_EDIT_FAIL:
            return {
                ...state,
                isLoadingEditSubmission: false,
                EditSubmissionError: action.payload,
            };
        case types.FETCH_INSTRUCTOR_DOWNLOAD_ORIGINAL_FILE_START:
            return {
                ...state,
                isLoadingDownloadFile: true,
            };
        case types.FETCH_INSTRUCTOR_DOWNLOAD_ORIGINAL_FILE_SUCCESS:
            return {
                ...state,
                isLoadingDownloadFile: false,
                downloadFileData: action.payload,
            };
        case types.FETCH_INSTRUCTOR_DOWNLOAD_ORIGINAL_FILE_FAIL:
            return {
                ...state,
                isLoadingDownloadFile: false,
                downloadFileError: action.payload,
            };
        case types.FETCH_INSTRUCTOR_SUBMISSIONS_SAVE_TO_REPOSITARY_START:
            return {
                ...state,
                isLoadingRepo: true,
            };
        case types.FETCH_INSTRUCTOR_SUBMISSIONS_SAVE_TO_REPOSITARY_SUCCESS:
            return {
                ...state,
                isLoadingRepo: false,
                repoData: action.payload,
            };
        case types.FETCH_INSTRUCTOR_SUBMISSIONS_SAVE_TO_REPOSITARY_FAIL:
            return {
                ...state,
                isLoadingRepo: false,
                repoError: action.payload,
            };
        case types.FETCH_INSTRUCTOR_FEEDBACK_DETAILS_START:
            return {
                ...state,
                isLoadingFeedback: true,
            };
        case types.FETCH_INSTRUCTOR_FEEDBACK_DETAILS_SUCCESS:
            return {
                ...state,
                isLoadingFeedback: false,
                feedbackData: action.payload,
            };
        case types.FETCH_INSTRUCTOR_FEEDBACK_DETAILS_FAIL:
            return {
                ...state,
                isLoadingFeedback: false,
                feedbackError: action.payload,
            };
        default:
            return state;
    }
};

export default SubmissionReducer;
