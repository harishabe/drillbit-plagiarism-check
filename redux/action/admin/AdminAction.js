import * as types from '../ActionType';

export const GetWidgetCount = () => {
    return {
        type: types.FETCH_ADMIN_DASH_WIDGET_START
    };
};

export const GetTopStudent = () => {
    return {
        type: types.FETCH_ADMIN_DASH_TOP_STUDENT_START
    };
};

export const GetTrendAnalysis = () => {
    return {
        type: types.FETCH_ADMIN_DASH_TREND_ANALYSIS_START
    };
};

/**
 * Get all instructor data
 */
export const GetInstructorData = () => {
    return {
        type: types.FETCH_ADMIN_INSTRUCTOR_DATA_START
    };
};

/**
 * Get all student data
 */
export const GetStudnetData = () => {
    return {
        type: types.FETCH_ADMIN_STUDENT_DATA_START
    };
};

