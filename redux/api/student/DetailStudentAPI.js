import END_POINTS from '../../../utils/EndPoints';
import { BASE_URL, BASE_URL_EXTREM, BASE_URL_UPLOAD } from '../../../utils/BaseUrl';
import { GetMethod, PostMethod, GetMethodDownload, PostFormData } from '../ApiMethod';
import { PaginationUrl } from '../../../utils/PaginationUrl';

/**
 * API CALL FOR STUDENT DASHBOARD DATA
 */

export const GetDashboardData = async () => {
    const url = BASE_URL_EXTREM + END_POINTS.STUDENT_DASHBOARD_WIDGET;
    return GetMethod(url);
};

/**
 * API CALL FOR CLASSES DATA
 */

export const GetClassesDetail = async (paginationPayload) => {
    const url = BASE_URL_EXTREM + END_POINTS.STUDENT_MY_CLASSES + PaginationUrl(paginationPayload);
    return GetMethod(url);
};

/**
 * API CALL FOR ASSIGNMENT DATA
 */

export const GetAssignmentDetail = async (class_id, paginationPayload) => {
    const url = BASE_URL_EXTREM + END_POINTS.STUDENT_MY_CLASSES + '/' + class_id + '/assignments' + PaginationUrl(paginationPayload);
    return GetMethod(url);
};

/**
 * API CALL FOR SUBMISSION HEADER
 */

export const GetSubmissionHeader = async (class_id, folder_id) => {
    const url = BASE_URL_EXTREM + END_POINTS.STUDENT_MY_CLASSES + '/' + class_id + '/assignments/' + folder_id + '/header';
    return GetMethod(url);
};

/**
 * API CALL FOR SUBMISSION DATA
 */

export const GetSubmissionDetail = async (class_id, folder_id, paginationPayload) => {
    const url = BASE_URL_EXTREM + END_POINTS.STUDENT_MY_CLASSES + '/' + class_id + '/assignments/' + folder_id + '/submissions' + PaginationUrl(paginationPayload);
    return GetMethod(url);
};

/**
 * API CALL FOR DOWNLOAD CSV
 */

export const DownloadHistory = async (apiUrl) => {
    const url = BASE_URL_EXTREM + END_POINTS.STUDENT_MY_CLASSES + apiUrl;
    return GetMethodDownload(url, 'Submission_History.csv');
};

/**
 * API CALL FOR QNA DATA
 */
export const GetQnaDetail = async (class_id, folder_id) => {
    const url = BASE_URL_EXTREM + END_POINTS.STUDENT_MY_CLASSES + '/' + class_id + '/assignments/' + folder_id + '/qa';
    return GetMethod(url);
};

// /**
//  * API CALL FOR FEEDBACK DATA
//  */
export const GetFeedbackDetail = async (class_id, folder_id) => {
    const url = BASE_URL_EXTREM + END_POINTS.STUDENT_MY_CLASSES + '/' + class_id + '/assignments/' + folder_id + '/feedback';
    return GetMethod(url);
};


/**
 * API CALL FOR FEEDBACK DATA
 */
export const SendAnswerData = async (data, class_id, folder_id) => {
    const url = BASE_URL_EXTREM + END_POINTS.STUDENT_MY_CLASSES + '/' + class_id + '/assignments/' + folder_id + '/answer';
    return PostMethod(url, data);
};

/**
 * API CALL FOR NEW SUBMISSION DATA
 */
export const SendSubmissionData = async (query, class_id, folder_id) => {
    const url = BASE_URL_UPLOAD + END_POINTS.STUDENT_NEW_SUBMISSION + class_id + '/assignments/' + folder_id + '/studentFile';
    return PostFormData(url, query);
};

/**
 * API CALL FOR DOWNLOAD ORIGINAL FILE
 */

export const DownloadOriginalFileData = async (class_id, folder_id, paper_id, name) => {
    const url = BASE_URL_EXTREM + END_POINTS.STUDENT_MY_CLASSES + '/' + class_id + '/assignments/' + folder_id + '/downloadOriginalFile/' + paper_id;
    return GetMethodDownload(url, name);
};