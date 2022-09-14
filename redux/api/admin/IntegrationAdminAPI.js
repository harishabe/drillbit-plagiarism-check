import { BASE_URL_EXTREM } from '../../../utils/BaseUrl';
import { GetMethod, PostMethod, PutMethod } from './../ApiMethod';

/**
 * API CALL FOR INTEGRATION DATA
 */

export const GetIntegrationDetail = async (url) => {
    // const url = BASE_URL_EXTREM + apiUrl;
    return GetMethod(url);
};

/**
 * API CALL UPLOAD INTEGRATION DATA
 */

export const LmsIntegrationDetail = async (url, data) => {
    // const url = BASE_URL_EXTREM + apiUrl;
    return PostMethod(url, data);
};

/**
 * API CALL CHANGE INTEGRATION CONFIGURATION
 */

export const ChangeConfigDetail = async (url, data) => {
    // const url = BASE_URL_EXTREM + url;
    return PutMethod(url, data);
};