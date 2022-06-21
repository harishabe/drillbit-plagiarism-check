import * as types from '../../action/ActionType';

const CRUDReducer = (state = {}, action) => {
    switch (action.type) {
        case types.FETCH_ADMIN_INSTRUCTOR_CREATE_START:
            return {
                ...state,
                isLoading: true,
            };
        case types.FETCH_ADMIN_INSTRUCTOR_CREATE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                CreateInstructor: action.payload,
            };
        case types.FETCH_ADMIN_INSTRUCTOR_CREATE_FAIL:
            return {
                ...state,
                isLoading: false,
                CreateInstructorError: action.payload,
            };
        case types.FETCH_ADMIN_DEACTIVATE_ROW_START:
            return {
                ...state,
                isLoading: true,
            };
        case types.FETCH_ADMIN_DEACTIVATE_ROW_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            };
        case types.FETCH_ADMIN_DEACTIVATE_ROW_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case types.FETCH_ADMIN_EDIT_ROW_START:
            return {
                ...state,
                isLoading: true,
            };
        case types.FETCH_ADMIN_EDIT_ROW_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            };
        case types.FETCH_ADMIN_EDIT_ROW_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case types.FETCH_ADMIN_DELETE_ROW_START:
            return {
                ...state,
                isLoading: true,
            };
        case types.FETCH_ADMIN_DELETE_ROW_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            };
        case types.FETCH_ADMIN_DELETE_ROW_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case types.FETCH_ADMIN_DELETE_STUDENT_ROW_START:
            return {
                ...state,
                isLoading: true,
            };
        case types.FETCH_ADMIN_DELETE_STUDENT_ROW_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            };
        case types.FETCH_ADMIN_DELETE_STUDENT_ROW_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export default CRUDReducer;