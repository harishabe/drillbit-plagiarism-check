import END_POINTS from '../../../utils/EndPoints';
import { BASE_URL_EXTREM, BASE_URL_INTEGRATION } from '../../../utils/BaseUrl';
import { GetMethod, PutMethod, PostMethod, PostFormData } from './../ApiMethod';

/**
 * API CALL FOR PROFILE DATA
 */

export const GetProfile = async (role) => {
    const url = BASE_URL_EXTREM + END_POINTS.PROFILE_DATA + role + '/accountInformation';
    return GetMethod(url);
};

/**
 * API CALL FOR PROFILE LOGO SUBMIT
 */

export const UploadLogo = async (query) => {
    const url = BASE_URL_EXTREM + END_POINTS.ADMIN_PROFILE_UPLOAD_LOGO;
    return PostFormData(url, query);
};

/**
 * API CALL FOR PROFILE CHANGE PASSWORD
 */

export const ChangePassword = async () => {
    const url = BASE_URL_INTEGRATION + END_POINTS.PROFILE_CHANGE_PASSWORD;
    return PutMethod(url);
};
