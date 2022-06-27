import END_POINTS from '../../../utils/EndPoints';
import { GetMethod, PostMethod, PostFormData } from './../ApiMethod';

/**
 * API CALL FOR PROFILE DATA
 */

export const GetProfile = async (role) => {
    const url = END_POINTS.PROFILE_DATA + role + '/accountInformation';
    return GetMethod(url);
};

/**
 * API CALL FOR PROFILE LOGO SUBMIT
 */

export const UploadLogo = async (query) => {
    const url = END_POINTS.ADMIN_PROFILE_UPLOAD_LOGO;
    return PostFormData(url, query);
};

/**
 * API CALL FOR PROFILE CHANGE PASSWORD
 */

export const ChangePassword = async () => {
    const url = END_POINTS.PROFILE_CHANGE_PASSWORD;
    return PostMethod(url);
};
