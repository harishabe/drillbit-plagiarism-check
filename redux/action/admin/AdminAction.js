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
 * Create multiple instructor template
 */
export const DownloadTemplate = () => {
    return {
        type: types.FETCH_ADMIN_INSTRUCTOR_TEMPLATE_DOWNLOAD_START
    };
};

/**
 * Upload multiple instructor 
 */
export const UploadFile = (data) => {
    return {
        type: types.FETCH_ADMIN_MULTIPLE_INSTRUCTOR_UPLOAD_START, query: data
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
        type: types.FETCH_ADMIN_INSTRUCTOR_STUDENT_DOWNLOAD_START, userType: userType
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
 * submission reports view & download data download
 */
export const ViewDownloadSubmissiondData = (url) => {
    return {
        type: types.FETCH_ADMIN_REPORTS_VIEW_SUBMISSION_DOWNLOAD_START, url: url
    };
};

/**
 * Edit data
 */
export const EditData = (instructorId, requestPayload, API_END_POINT) => {
    return {
        type: types.FETCH_ADMIN_EDIT_ROW_START, instructorId: instructorId, requestPayload: requestPayload, API_END_POINT: API_END_POINT
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

/**
 * Get repositary data
 */
export const GetRepoList = (paginationPayload) => {
    return {
        type: types.FETCH_ADMIN_REPOSITARY_DETAILS_START, paginationPayload: paginationPayload
    };
};

/**
 * Repositary > uploadfile
 */
export const RepoUpload = (data) => {
    return {
        type: types.FETCH_ADMIN_REPOSITARY_UPLOAD_START, query: data
    };
};

/**
 * Get integration data
 */
export const GetIntegrationList = (apiUrl) => {
    return {
        type: types.FETCH_ADMIN_INTEGRATION_DETAILS_START, apiUrl: apiUrl
    };
};

/**
 * Get integration data
 */
 export const GetIntegrationDetailData = (apiUrl) => {
    return {
        type: types.FETCH_ADMIN_INTEGRATION_TYPE_DETAILS_START, apiUrl: apiUrl
    };
};

/**
 * Upload integration data
 */
export const LmsIntegration = (apiUrl, data) => {
    return {
        type: types.FETCH_ADMIN_INTEGRATION_UPLOAD_DETAILS_START, apiUrl: apiUrl, query: data
    };
};

/**
 * change config data
 */
export const ChangeConfig = (apiUrl, data) => {
    return {
        type: types.FETCH_ADMIN_INTEGRATION_CHANGE_CONFIG_START, apiUrl: apiUrl, query: data
    };
};
