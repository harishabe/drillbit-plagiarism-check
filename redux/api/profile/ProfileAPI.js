import { GetMethod, PutMethod, PostFormData } from './../ApiMethod';

/**
 * API CALL FOR PROFILE DATA
 */

export const GetProfile = async (url) => {
    return GetMethod(url);
};

/**
 * API CALL FOR PROFILE LOGO SUBMIT
 */

export const UploadLogo = async (url, query) => {
    return PostFormData(url, query);
};

/**
 * API CALL FOR PROFILE CHANGE PASSWORD
 */

export const ChangePassword = async (action) => {
    return PutMethod(action.apiUrl, action.requestPayload);
};
