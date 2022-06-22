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
 * Get instructor & student stats data
 */
export const GetStats = (id) => {
    return {
        type: types.FETCH_ADMIN_STATS_DATA_START, id: id
    };
};


/**
 * Export csv file from stats report
 */
 export const GetExportToCSV = (emailId) => {
    return {
        type: types.FETCH_ADMIN_EXPORT_CSV_STATS_DATA_START, emailId: emailId
    };
};


/**
 * Create instructor data
 */
export const CreateInstructorData = (data) => {
    return {
        type: types.FETCH_ADMIN_INSTRUCTOR_CREATE_START, query: data
    };
};

/**
 * Get all student data
 */
export const GetStudnetData = (paginationPayload) => {
    return {
        type: types.FETCH_ADMIN_STUDENT_DATA_START, paginationPayload: paginationPayload,
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
 * instructor and student csv file download
 */
export const DownloadInstructorStudentData = (userType) => {
    return {
        type: types.FETCH_ADMIN_INSTRUCTOR_STUDENT_DOWNLOAD_START, userType:userType
    };
};

/**
 * reports view & download data download
 */
export const ViewAndDownloadData = (url) => {
    return {
        type: types.FETCH_ADMIN_REPORTS_VIEW_DOWNLOAD_START, url: url
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
export const DeleteData = (id, paginationPayload) => {
    return {
        type: types.FETCH_ADMIN_DELETE_ROW_START, id: id, paginationPayload: paginationPayload
    };
};

/**
 * Delete student data
 */
export const DeleteStudentData = (id, paginationPayload) => {
    return {
        type: types.FETCH_ADMIN_DELETE_STUDENT_ROW_START, id: id, paginationPayload: paginationPayload
    };
};

/**
 * Deactivate data
 */
export const DeactivateData = (data, paginationPayload) => {
    return {
        type: types.FETCH_ADMIN_DEACTIVATE_ROW_START, query: data, paginationPayload: paginationPayload
    };
};
