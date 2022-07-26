import * as types from '../../action/ActionType';

const DetailsInstructorReducer = (state = {}, action) => {
    switch (action.type) {
        case types.FETCH_INSTRUCTOR_CLASSES_DATA_START:
            return {
                ...state,
                isLoading: true,
            };
        case types.FETCH_INSTRUCTOR_CLASSES_DATA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                classesData: action.payload,
            };
        case types.FETCH_INSTRUCTOR_CLASSES_DATA_FAIL:
            return {
                ...state,
                isLoading: false,
                classesError: action.payload,
            };
        case types.FETCH_INSTRUCTOR_STUDENTS_DATA_START:
            return {
                ...state,
                isLoadingStudent: true,
            };
        case types.FETCH_INSTRUCTOR_STUDENTS_DATA_SUCCESS:
            return {
                ...state,
                isLoadingStudent: false,
                studentData: action.payload,
            };
        case types.FETCH_INSTRUCTOR_STUDENTS_DATA_FAIL:
            return {
                ...state,
                isLoadingStudent: false,
                studentError: action.payload,
            };
        case types.FETCH_INSTRUCTOR_ASSIGNMENTS_DATA_START:
            return {
                ...state,
                isLoadingAssignment: true,
            };
        case types.FETCH_INSTRUCTOR_ASSIGNMENTS_DATA_SUCCESS:
            return {
                ...state,
                isLoadingAssignment: false,
                assignmentData: action.payload,
            };
        case types.FETCH_INSTRUCTOR_ASSIGNMENTS_DATA_FAIL:
            return {
                ...state,
                isLoadingAssignment: false,
                assignmentError: action.payload,
            };
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
                isLoadingCreate: true,
            };
        case types.FETCH_INSTRUCTOR_CREATE_STUDENT_DATA_SUCCESS:
            return {
                ...state,
                isLoadingCreate: false,
                createStudentData: action.payload,
            };
        case types.FETCH_INSTRUCTOR_CREATE_STUDENT_DATA_FAIL:
            return {
                ...state,
                isLoadingCreate: false,
                createStudentError: action.payload,
            };
        case types.FETCH_INSTRUCTOR_DELETE_STUDENT_START:
            return {
                ...state,
                isLoading: true,
            };
        case types.FETCH_INSTRUCTOR_DELETE_STUDENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                deleteStudentData: action.payload,
            };
        case types.FETCH_INSTRUCTOR_DELETE_STUDENT_FAIL:
            return {
                ...state,
                isLoading: false,
                deleteStudentError: action.payload,
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

        default:
            return state;
    }
};

export default DetailsInstructorReducer;
