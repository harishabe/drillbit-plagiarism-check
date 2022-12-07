import { GetMethod, PostMethod, PutMethod } from './../ApiMethod';
import { BASE_URL_EXTREM } from '../../../utils/BaseUrl';
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