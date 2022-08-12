import { BASE_URL_EXTREM } from '../../../utils/BaseUrl';
import { GetMethod, PostMethod, PutMethod } from './../ApiMethod';

/**
 * API CALL FOR INTEGRATION DATA
 */

export const GetIntegrationDetail = async (apiUrl) => {
    const url = BASE_URL_EXTREM + apiUrl;
    return GetMethod(url);
};

/**
 * API CALL UPLOAD INTEGRATION DATA
 */

export const LmsIntegrationDetail = async (apiUrl, data) => {
    const url = BASE_URL_EXTREM + apiUrl;
    return PostMethod(url, data);
};

/**
 * API CALL CHANGE INTEGRATION CONFIGURATION
 */

export const ChangeConfigDetail = async (apiUrl, data) => {
    const url = BASE_URL_EXTREM + apiUrl;
    return PutMethod(url, data);
};