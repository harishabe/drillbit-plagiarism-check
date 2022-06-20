import * as types from '../../action/ActionType';

const DetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case types.FETCH_ADMIN_INSTRUCTOR_DATA_START:
            return {
                ...state,
                isLoading: true,
            };
        case types.FETCH_ADMIN_INSTRUCTOR_DATA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                instructorData: action.payload,
            };
        case types.FETCH_ADMIN_INSTRUCTOR_DATA_FAIL:
            return {
                ...state,
                isLoading: false,
                instructorError: action.payload,
            };
        case types.FETCH_ADMIN_INSTRUCTOR_STATS_DATA_START:
            return {
                ...state,
                isLoadingStats: true,
            };
        case types.FETCH_ADMIN_INSTRUCTOR_STATS_DATA_SUCCESS:
            return {
                ...state,
                isLoadingStats: false,
                statsData: action.payload,
            };
        case types.FETCH_ADMIN_INSTRUCTOR_STATS_DATA_FAIL:
            return {
                ...state,
                isLoadingStats: false,
                statsError: action.payload,
            };
        case types.FETCH_ADMIN_STUDENT_DATA_START:
            return {
                ...state,
                isLoading: true,
            };
        case types.FETCH_ADMIN_STUDENT_DATA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                studentData: action.payload,
            };
        case types.FETCH_ADMIN_STUDENT_DATA_FAIL:
            return {
                ...state,
                isLoading: false,
                studentDataError: action.payload,
            };      
        default:
            return state;
    }
}

export default DetailsReducer;