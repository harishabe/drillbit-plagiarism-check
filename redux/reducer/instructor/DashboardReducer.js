import * as types from '../../action/ActionType';

const InsDashboardReducer = (state = {}, action) => {
    switch (action.type) {
        case types.FETCH_INSTRUCTOR_DASH_WIDGET_START:
            return {
                ...state,
                isLoading: true,
            };
        case types.FETCH_INSTRUCTOR_DASH_WIDGET_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            };
        case types.FETCH_INSTRUCTOR_DASH_WIDGET_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case types.FETCH_INSTRUCTOR_DASH_TOP_STUDENT_START:
            return {
                ...state,
                isLoading: true,
            };
        case types.FETCH_INSTRUCTOR_DASH_TOP_STUDENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                topStudent: action.payload,
            };
        case types.FETCH_INSTRUCTOR_DASH_TOP_STUDENT_FAIL:
            return {
                ...state,
                isLoading: false,
                topStudentError: action.payload,
            };
        default:
            return state;
    }
};

export default InsDashboardReducer;
