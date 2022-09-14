import { GetMethod, PostMethod, PutMethod } from './../ApiMethod';

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