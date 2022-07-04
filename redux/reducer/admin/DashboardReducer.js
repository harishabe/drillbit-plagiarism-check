import * as types from '../../action/ActionType';

const DashboardReducer = (state = {}, action) => {
    switch (action.type) {
        case types.FETCH_ADMIN_DASH_WIDGET_START:
            return {
                ...state,
                isLoadingDashboard: true,
            };
        case types.FETCH_ADMIN_DASH_WIDGET_SUCCESS:
            return {
                ...state,
                isLoadingDashboard: false,
                data: action.payload
            };
        case types.FETCH_ADMIN_DASH_WIDGET_FAIL:
            return {
                ...state,
                isLoadingDashboard: false,
                error: action.payload
            };
        case types.FETCH_ADMIN_DASH_TOP_STUDENT_START:
            return {
                ...state,
                isLoadingTopStudent: true,
            };
        case types.FETCH_ADMIN_DASH_TOP_STUDENT_SUCCESS:
            return {
                ...state,
                isLoadingTopStudent: false,
                topStudent: action.payload
            };
        case types.FETCH_ADMIN_DASH_TOP_STUDENT_FAIL:
            return {
                ...state,
                isLoadingTopStudent: false,
                topStudentError: action.payload
            };
        case types.FETCH_ADMIN_DASH_TREND_ANALYSIS_START:
            return {
                ...state,
                isLoadingTrendAnalysis: true,
            };
        case types.FETCH_ADMIN_DASH_TREND_ANALYSIS_SUCCESS:
            return {
                ...state,
                isLoadingTrendAnalysis: false,
                trendAnalysis: action.payload
            };
        case types.FETCH_ADMIN_DASH_TREND_ANALYSIS_FAIL:
            return {
                ...state,
                isLoadingTrendAnalysis: false,
                trendAnalysisError: action.payload
            };
        default:
            return state;
    }
}

export default DashboardReducer;