import END_POINTS from '../../../utils/EndPoints';
import { GetMethod, PostMethod } from '../ApiMethod';
import { PaginationUrl } from '../../../utils/PaginationUrl';

/**
 * API CALL FOR STUDENT DASHBOARD DATA
 */

export const GetDashboardData = async () => {
    const url = END_POINTS.STUDENT_DASHBOARD_WIDGET;
    return GetMethod(url);
};

/**
 * API CALL FOR CLASSES DATA
 */

export const GetClassesDetail = async (paginationPayload) => {
    const url = END_POINTS.STUDENT_MY_CLASSES + PaginationUrl(paginationPayload);
    return GetMethod(url);
};

/**
 * API CALL FOR ASSIGNMENT DATA
 */

export const GetAssignmentDetail = async (class_id, paginationPayload) => {
    const url = END_POINTS.STUDENT_MY_CLASSES + '/' + class_id + '/assignments' + PaginationUrl(paginationPayload);
    return GetMethod(url);
};

/**
 * API CALL FOR SUBMISSION DATA
 */

export const GetSubmissionDetail = async (class_id, folder_id) => {
    const url = END_POINTS.STUDENT_MY_CLASSES + '/' + class_id + '/assignments/' + folder_id + '/submissions';
    return GetMethod(url);
};

/**
 * API CALL FOR QNA DATA
 */
export const GetQnaDetail = async (class_id, folder_id) => {
    const url = END_POINTS.STUDENT_MY_CLASSES + '/' + class_id + '/assignments/' + folder_id + '/qa';
    return GetMethod(url);
};

/**
 * API CALL FOR FEEDBACK DATA
 */
export const GetFeedbackDetail = async (class_id, folder_id, paper_id) => {
    const url = END_POINTS.STUDENT_MY_CLASSES + '/' + class_id + '/assignments/' + folder_id + '/feedback/' + paper_id;
    return GetMethod(url);
};

/**
 * API CALL FOR FEEDBACK DATA
 */
export const SendAnswerData = async (data, class_id, folder_id) => {
    const url = END_POINTS.STUDENT_MY_CLASSES + '/' + class_id + '/assignments/' + folder_id + '/answer';
    return PostMethod(url, data);
};