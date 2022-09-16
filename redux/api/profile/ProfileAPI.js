import END_POINTS from '../../../utils/EndPoints';
import { BASE_URL_EXTREM, BASE_URL_INTEGRATION } from '../../../utils/BaseUrl';
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
    const url = BASE_URL_EXTREM + END_POINTS.PROFILE_CHANGE_PASSWORD;
    return PutMethod(url, action.requestPayload);
};
