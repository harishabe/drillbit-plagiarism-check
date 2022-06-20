import * as types from '../../action/ActionType';

const DetailsStudentReducer = (state = {}, action) => {
    switch (action.type) {
        case types.FETCH_STUDENTS_CLASSES_DATA_START:
            return {
                ...state,
                isLoading: true,
            };
        case types.FETCH_STUDENTS_CLASSES_DATA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                classesData: action.payload,
            };
        case types.FETCH_STUDENTS_CLASSES_DATA_FAIL:
            return {
                ...state,
                isLoading: false,
                classesError: action.payload,
            };
        case types.FETCH_STUDENTS_ASSIGNMENT_DATA_START:
            return {
                ...state,
                isLoading: true,
            };
        case types.FETCH_STUDENTS_ASSIGNMENT_DATA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                assignmentData: action.payload,
            };
        case types.FETCH_STUDENTS_ASSIGNMENT_DATA_FAIL:
            return {
                ...state,
                isLoading: false,
                assignmentError: action.payload,
            };
        case types.FETCH_STUDENTS_SUBMISSION_DATA_START:
            return {
                ...state,
                isLoading: true,
            };
        case types.FETCH_STUDENTS_SUBMISSION_DATA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                submissionData: action.payload,
            };
        case types.FETCH_STUDENTS_SUBMISSION_DATA_FAIL:
            return {
                ...state,
                isLoading: false,
                submissionError: action.payload,
            };
        default:
            return state;
    }
};

export default DetailsStudentReducer;
