import * as types from '../../action/ActionType';

const InstructorCRUDReducer = (state = {}, action) => {
    switch (action.type) {
        case types.FETCH_INSTRUCTOR_CREATE_CLASSES_DATA_START:
            return {
                ...state,
                isLoading: true,
            };
        case types.FETCH_INSTRUCTOR_CREATE_CLASSES_DATA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                createClassesData: action.payload,
            };
        case types.FETCH_INSTRUCTOR_CREATE_CLASSES_DATA_FAIL:
            return {
                ...state,
                isLoading: false,
                createClassesError: action.payload,
            };
        case types.FETCH_INSTRUCTOR_CREATE_STUDENT_DATA_START:
            return {
                ...state,
                isLoading: true,
            };
        case types.FETCH_INSTRUCTOR_CREATE_STUDENT_DATA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                createStudentData: action.payload,
            };
        case types.FETCH_INSTRUCTOR_CREATE_STUDENT_DATA_FAIL:
            return {
                ...state,
                isLoading: false,
                createStudentError: action.payload,
            };
        case types.FETCH_INSTRUCTOR_CREATE_ASSIGNMENT_DATA_START:
            return {
                ...state,
                isLoading: true,
            };
        case types.FETCH_INSTRUCTOR_CREATE_ASSIGNMENT_DATA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                createAssignmentData: action.payload,
            };
        case types.FETCH_INSTRUCTOR_CREATE_ASSIGNMENT_DATA_FAIL:
            return {
                ...state,
                isLoading: false,
                createAssignmentError: action.payload,
            };
        case types.FETCH_INSTRUCTOR_EDIT_CLASS_DATA_START:
            return {
                ...state,
                isLoading: true,
            };
        case types.FETCH_INSTRUCTOR_EDIT_CLASS_DATA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            };
        case types.FETCH_INSTRUCTOR_EDIT_CLASS_DATA_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export default InstructorCRUDReducer;