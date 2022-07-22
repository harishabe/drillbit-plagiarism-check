import * as types from '../../action/ActionType';

const SubmissionReducer = (state = {}, action) => {
    switch (action.type) {
        case types.FETCH_INSTRUCTOR_SUBMISSIONS_GRADING_QNA_START:
            return {
                ...state,
                isLoadingSubmissionGrading: true,
            };
        case types.FETCH_INSTRUCTOR_SUBMISSIONS_GRADING_QNA_SUCCESS:
            return {
                ...state,
                isLoadingSubmissionGrading: false,
                SubmissionGradingData: action.payload,
            };
        case types.FETCH_INSTRUCTOR_SUBMISSIONS_GRADING_QNA_FAIL:
            return {
                ...state,
                isLoadingSubmissionGrading: false,
                SubmissionGradingError: action.payload,
            };
        default:
            return state;
    }
};

export default SubmissionReducer;
