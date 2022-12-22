import * as types from '../ActionType';

export const GetWidgetCount = (url) => {
    return {
        type: types.FETCH_ADMIN_DASH_WIDGET_START, url: url
    };
};

export const GetTopStudent = () => {
    return {
        type: types.FETCH_ADMIN_DASH_TOP_STUDENT_START,
    };
};

export const GetTrendAnalysis = (url) => {
    return {
        type: types.FETCH_ADMIN_DASH_TREND_ANALYSIS_START, url: url
    };
};

export const RenewValidity = (url) => {
    return {
        type: types.FETCH_ADMIN_DASH_RENEW_ACCOUNT_START, url: url
    };
};

/**
 * Get all instructor data
 */
export const GetInstructorData = (url, paginationPayload) => {
    return {
        type: types.FETCH_ADMIN_INSTRUCTOR_DATA_START, url: url, paginationPayload: paginationPayload
    };
};

/**
 * Get instructor & student stats data
 */
export const GetStats = (url) => {
    return {
        type: types.FETCH_ADMIN_STATS_DATA_START, url: url
    };
};


/**
 * Export csv file from stats report
 */
export const GetExportToCSV = (url) => {
    return {
        type: types.FETCH_ADMIN_EXPORT_CSV_STATS_DATA_START, url: url
    };
};


/**
 * Create instructor data
 */
export const CreateInstructorData = (url, data) => {
    return {
        type: types.FETCH_ADMIN_INSTRUCTOR_CREATE_START, url: url, query: data
    };
};

/**
 * Create multiple instructor template
 */
export const DownloadTemplate = (url, title) => {
    return {
        type: types.FETCH_ADMIN_INSTRUCTOR_TEMPLATE_DOWNLOAD_START, url: url, title: title
    };
};

/**
 * Clear upload data
 */
export const UploadFileDataClear = () => {
    return {
        type: types.FETCH_ADMIN_MULTIPLE_INSTRUCTOR_UPLOAD_DATA_CLEAR
    };
};

/**
 * Upload multiple instructor 
 */
export const UploadFile = (url, data) => {
    return {
        type: types.FETCH_ADMIN_MULTIPLE_INSTRUCTOR_UPLOAD_START, url: url, query: data
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
export const ReportsData = (url) => {
    return {
        type: types.FETCH_ADMIN_REPORTS_DATA_START, url: url
    };
};

/**
 * instructor and student csv file download
 */
export const DownloadInstructorStudentData = (url, userType) => {
    return {
        type: types.FETCH_ADMIN_INSTRUCTOR_STUDENT_DOWNLOAD_START, url: url, userType: userType
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
export const EditData = (url, data, API_END_POINT) => {
    return {
        type: types.FETCH_ADMIN_EDIT_ROW_START, url: url, data: data, API_END_POINT: API_END_POINT
    };
};

/**
 * Delete data
 */
export const DeleteData = (url, paginationPayload) => {
    return {
        type: types.FETCH_ADMIN_DELETE_ROW_START, url: url, paginationPayload: paginationPayload
    };
};

/**
 * Delete student data
 */
export const DeleteStudentData = (url) => {
    return {
        type: types.FETCH_ADMIN_DELETE_STUDENT_ROW_START, url: url
    };
};

/**
 * Deactivate data
 */
export const DeactivateData = (url, paginationPayload) => {
    return {
        type: types.FETCH_ADMIN_DEACTIVATE_ROW_START, url: url, paginationPayload: paginationPayload
    };
};

/**
 * Get repositary data
 */
export const GetRepoList = (url, paginationPayload) => {
    return {
        type: types.FETCH_ADMIN_REPOSITARY_DETAILS_START, url: url, paginationPayload: paginationPayload
    };
};

/**
 * Repositary > uploadfile
 */
export const RepoUpload = (url, data) => {
    return {
        type: types.FETCH_ADMIN_REPOSITARY_UPLOAD_START, url: url, query: data
    };
};

/**
 * Remove repositary
 */
export const RemoveRepositary = (url) => {
    return {
        type: types.FETCH_ADMIN_REPOSITARY_DELETE_START, url: url
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
export const LmsIntegration = (url, data) => {
    return {
        type: types.FETCH_ADMIN_INTEGRATION_UPLOAD_DETAILS_START, url: url, query: data
    };
};

/**
 * change config data
 */
export const ChangeConfig = (url, data) => {
    return {
        type: types.FETCH_ADMIN_INTEGRATION_CHANGE_CONFIG_START, url: url, query: data
    };
};

/**
 * delete integration
 */
export const DeleteIntegration = (url) => {
    return {
        type: types.FETCH_ADMIN_INTEGRATION_DELETE_START, url: url
    };
};

/**
 * Get Google classroom
 */
export const GetGoogleLms = () => {
    return {
        type: types.FETCH_ADMIN_INTEGRATION_GOOGLECLASSROOM_START
    };
};

/**
 * Get Google Live Courses
 */
export const GetGoogleLiveCourses = () => {
    return {
        type: types.FETCH_ADMIN_INTEGRATION_GOOGLE_LIVECOURSE_START
    };
};

/**
 * Get Google Live Courses
 */
export const GetGoogleImportCourses = (data) => {
    return {
        type: types.FETCH_ADMIN_INTEGRATION_GOOGLE_IMPORT_COURSES_START, query: data
    };
};

/**
 * Get Google Live Courses
 */
export const GetGoogleCourseHome = () => {
    return {
        type: types.FETCH_ADMIN_INTEGRATION_GOOGLE_COURSE_HOME_START
    };
};