import END_POINTS from '../../../utils/EndPoints';
import { GetMethod, PostMethod, PutMethod, DeleteMethod, GetMethodDownload } from './../ApiMethod';
import { PaginationUrl } from '../../../utils/PaginationUrl';

/**
 * API CALL FOR INSTRUCTOR DATA
 */

export const GetInstructorDetail = async (paginationPayload) => {
    const url = END_POINTS.ADMIN_INSTRUCTOR + PaginationUrl(paginationPayload);
    return GetMethod(url);
};

/**
 * API CALL FOR CREATE INSTRUCTOR
 */

export const CreateInstructorData = async (data) => {
    const url = END_POINTS.CREATE_INSTRUCTOR;
    return PostMethod(url, data);
};

/**
 * API CALL FOR STUDENT DATA
 */

export const GetStudentDetail = async (paginationPayload) => {
    const url = END_POINTS.ADMIN_STUDENT + PaginationUrl(paginationPayload);
    return GetMethod(url);
};

/**
 * API CALL FOR DELETE STUDENT
 */

export const DeleteStudent = async (id) => {
    const url = END_POINTS.ADMIN_STUDENT_DELETE + '?id=' + id;
    return DeleteMethod(url);
};

/**
 * API CALL FOR REPORTS
 */

export const GetReports = async () => {
    const url = END_POINTS.ADMIN_REPORTS;
    return GetMethod(url);
};

/**
 * API CALL FOR REPORTS DOWNLOAD
 */

export const DownloadReports = async (action) => {
    const url = END_POINTS.ADMIN_REPORTS_DOWNLOAD_INSTRUCTOR_LIST + action.userType + '/download';
    return GetMethodDownload(url, action.userType + '.csv');
};

/**
 * API CALL FOR REPORTS VIEW & DOWNLOAD
 */

export const ViewDownloadReports = async (apiUrl) => {
    const url = END_POINTS.ADMIN_REPORTS_DOWNLOAD_INSTRUCTOR_LIST + apiUrl;
    return GetMethod(url);
};

/**
 * API CALL FOR STATS
 */

export const GetStats = async (id) => {
    const url = END_POINTS.ADMIN_INSTRUCTOR_STUDENT_STATS + '/' + id + '/stats';
    return GetMethod(url);
};


/**
 * Download (export) csv file
 */

export const GetExportCsvFile = async (emailId) => {
    const url = END_POINTS.ADMIN_EXPORT_CSV_STATS + '/' + emailId;
    return GetMethodDownload(url, 'Submission_Report.csv');
};

/**
 * API CALL FOR EDIT
 */

export const EditRow = async (action) => {
    const url = END_POINTS.ADMIN_INSTRUCTOR_EDIT_DATA + action.API_END_POINT + '/' + action.instructorId;
    return PutMethod(url, action.requestPayload);
};

/**
 * API CALL FOR DELETE
 */

export const DeleteRow = async (id) => {
    const url = END_POINTS.ADMIN_INSTRUCTOR_DELETE + '?id=' + id;
    return DeleteMethod(url);
};

/**
 * API CALL FOR DEACTIVATE
 */

export const DeactivateRow = async (payload) => {
    const url = END_POINTS.ACTIVATE_DEACTIVATE_INSTRUCTOR + '/' + payload.id + '/' + payload.status;
    return PutMethod(url, {});
};