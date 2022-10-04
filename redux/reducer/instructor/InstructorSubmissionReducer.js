import * as types from '../../action/ActionType';

const InstructorSubmissionReducer = (state = {}, action) => {
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
        case types.FETCH_INSTRUCTOR_EDIT_FEEDBACK_DETAILS_START:
            return {
                ...state,
                isLoadingEditFeedback: true,
            };
        case types.FETCH_INSTRUCTOR_EDIT_FEEDBACK_DETAILS_SUCCESS:
            return {
                ...state,
                isLoadingEditFeedback: false,
                editFeedbackData: action.payload,
            };
        case types.FETCH_INSTRUCTOR_EDIT_FEEDBACK_DETAILS_FAIL:
            return {
                ...state,
                isLoadingEditFeedback: false,
                editFeedbackError: action.payload,
            };
        default:
            return state;
    }
};

export default InstructorSubmissionReducer;
