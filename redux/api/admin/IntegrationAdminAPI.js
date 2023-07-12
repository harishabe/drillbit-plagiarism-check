import { GetMethod, PostMethod, PutMethod, DeleteMethod } from './../ApiMethod';
import { BASE_URL_EXTREM } from '../../../utils/BaseUrl';
import { PaginationUrl } from '../../../utils/PaginationUrl';
import END_POINTS from '../../../utils/EndPoints';

/**
 * API CALL FOR INTEGRATION DATA
 */

export const GetIntegrationDetail = async (url) => {
    return GetMethod(url);
};

/**
 * API CALL UPLOAD INTEGRATION DATA
 */

export const LmsIntegrationDetail = async (url, data) => {
    return PostMethod(url, data);
};

/**
 * API CALL CHANGE INTEGRATION CONFIGURATION
 */

export const ChangeConfigDetail = async (url, data) => {
    return PutMethod(url, data);
};

/**
 * API CALL DELETE INTEGRATIONS
 */

export const DeleteIntegrationAdmin = async (url) => {
    return DeleteMethod(url);
};


/**
 * API CALL GOOGLE CLASSROOM CONFIGURATION
 */

export const GoogleClassroomDetail = async () => {
    return GetMethod(BASE_URL_EXTREM + END_POINTS.ADMIN_INTEGRATION_GOOGLE_CLASSROOM);
};

/**
 * API CALL GOOGLE CLASSROOM LIVE COURSES
 */

export const GoogleLiveCoursesDetail = async () => {
    return GetMethod(BASE_URL_EXTREM + END_POINTS.ADMIN_INTEGRATION_GOOGLE_LIVECOURSE);
};

/**
 * API CALL GOOGLE CLASSROOM IMPORT COURSE
 */

export const GoogleImportCoursesDetail = async (data) => {
    return PostMethod(BASE_URL_EXTREM + END_POINTS.ADMIN_INTEGRATION_GOOGLE_IMPORTCOURSES, data);
};

/**
 * API CALL GOOGLE CLASSROOM COURSE HOME
 */

export const GoogleCourseHomeDetail = async (paginationPayload) => {
    const url = BASE_URL_EXTREM + END_POINTS.ADMIN_INTEGRATION_GOOGLE_COURSEHOME + PaginationUrl(paginationPayload);
    return GetMethod(url);
};

/**
 * API CALL GOOGLE CLASSROOM COURSE STATUS
 */

export const GoogleCourseStatus = async (apiUrl, id) => {
    const url = BASE_URL_EXTREM + END_POINTS.ADMIN_INTEGRATION_GOOGLE_COURSE_STATUS_CLASS_WORK + `${apiUrl}/${id}`;
    return GetMethod(url);
};

/**
 * API CALL GOOGLE CLASSROOM COURSE/CLASS WORK
 */

export const GoogleClassWorkList = async (id, paginationPayload) => {
    const url = BASE_URL_EXTREM + END_POINTS.ADMIN_INTEGRATION_GOOGLE_COURSE_STATUS_CLASS_WORK + id + '/coursework' + PaginationUrl(paginationPayload);
    return GetMethod(url);
};