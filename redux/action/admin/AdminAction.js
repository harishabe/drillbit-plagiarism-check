import * as types from '../ActionType';

export const GetWidgetCount = () => {
    return {
        type: types.FETCH_ADMIN_DASH_WIDGET_START
    };
};

export const GetTopStudent = () => {
    return {
        type: types.FETCH_ADMIN_DASH_TOP_STUDENT_START,
    };
};

export const GetTrendAnalysis = () => {
    return {
        type: types.FETCH_ADMIN_DASH_TREND_ANALYSIS_START,
    };
};

/**
 * Get all instructor data
 */
export const GetInstructorData = (paginationPayload) => {
    return {
        type: types.FETCH_ADMIN_INSTRUCTOR_DATA_START, paginationPayload: paginationPayload
    };
};

/**
 * Get all student data
 */
export const GetStudnetData = (paginationPayload) => {
    return {
        type: types.FETCH_ADMIN_STUDENT_DATA_START, paginationPayload: paginationPayload
    };
};

/**
 * reports data
 */
export const ReportsData = () => {
    return {
        type: types.FETCH_ADMIN_REPORTS_DATA_START,
    };
};

/**
 * reports data download
 */
export const DownloadReportData = () => {
    return {
        type: types.FETCH_ADMIN_REPORTS_DATA_DOWNLOAD_START,
    };
};

/**
 * reports view & download data download
 */
export const ViewAndDownloadData = (data) => {
    return {
        type: types.FETCH_ADMIN_REPORTS_VIEW_DOWNLOAD_START, query: data
    };
};

/**
 * Edit data
 */
export const EditData = () => {
    return {
        type: types.FETCH_ADMIN_EDIT_ROW_START,
    };
};

/**
 * Delete data
 */
export const DeleteData = () => {
    return {
        type: types.FETCH_ADMIN_DELETE_ROW_START,
    };
};

/**
 * Deactivate data
 */
export const DeactivateData = (data) => {
    return {
        type: types.FETCH_ADMIN_DEACTIVATE_ROW_START, query:data
    };
};
