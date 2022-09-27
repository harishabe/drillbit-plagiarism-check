import END_POINTS from '../../../utils/EndPoints';
import { BASE_URL_EXTREM } from '../../../utils/BaseUrl';
import { GetMethod, PostMethod, PutMethod, DeleteMethod, GetMethodDownload, PostFormData } from './../ApiMethod';
import { PaginationUrl } from '../../../utils/PaginationUrl';

/**
 * API CALL FOR INSTRUCTOR DATA
 */

export const GetInstructorDetail = async (apiUrl, paginationPayload) => {
    const url = apiUrl + PaginationUrl(paginationPayload);
    return GetMethod(url);
};

/**
 * API CALL FOR CREATE INSTRUCTOR
 */

export const CreateInstructorData = async (url, data) => {
    return PostMethod(url, data);
};

/**
 * API CALL DOWNLOAD TEMPLATE
 */

export const DownloadInstructorTemplate = async (url, title) => {
    return GetMethodDownload(url, title + '.csv');
};

/**
 * API CALL UPLOAD MULTIPLE INSTRUCTOR
 */

export const MultipleInstructorUpload = async (url, query) => {
    return PostFormData(url, query);
};

/**
 * API CALL FOR STUDENT DATA
 */

export const GetStudentDetail = async (paginationPayload) => {
    const url = BASE_URL_EXTREM + END_POINTS.ADMIN_STUDENT + PaginationUrl(paginationPayload);
    return GetMethod(url);
};

/**
 * API CALL FOR DELETE STUDENT
 */

export const DeleteStudent = async (id) => {
    const url = BASE_URL_EXTREM + END_POINTS.ADMIN_STUDENT_DELETE + '?id=' + id;
    return DeleteMethod(url);
};

/**
 * API CALL FOR REPORTS
 */

export const GetReports = async (url) => {
    return GetMethod(url);
};

/**
 * API CALL FOR REPORTS DOWNLOAD
 */

export const DownloadReports = async (url, userType) => {
    return GetMethodDownload(url, userType + '.csv');
};

/**
 * API CALL FOR REPORTS VIEW & DOWNLOAD
 */

export const ViewDownloadReports = async (url) => {
    return GetMethod(url);
};

/**
 * API CALL FOR STATS
 */

export const GetStats = async (url) => {
    return GetMethod(url);
};


/**
 * Download (export) csv file
 */

export const GetExportCsvFile = async (url) => {
    return GetMethodDownload(url, 'Submission_Report.csv');
};

/**
 * API CALL FOR EDIT
 */

export const EditRow = async (url, data) => {
    return PutMethod(url, data);
};

/**
 * API CALL FOR DELETE
 */

export const DeleteRow = async (url) => {
    return DeleteMethod(url);
};

/**
 * API CALL FOR DEACTIVATE
 */

export const DeactivateRow = async (url) => {
    return PutMethod(url, {});
};

/**
 * API CALL FOR REPOSITARY DATA
 */

export const GetRepoDetail = async (apiUrl, paginationPayload) => {
    const url = apiUrl + PaginationUrl(paginationPayload);
    return GetMethod(url);
};

/**
 * REPOSITARY > UPLOADFILE
 */

export const RepoUploadDetail = async (url, data) => {
    return PostFormData(url, data);
};

/**
 * API CALL FOR REMOVE REPOSITARY
 */

export const RemoveRepositaryData = async (url) => {
    return GetMethod(url);
};