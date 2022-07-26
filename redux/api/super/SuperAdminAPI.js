import END_POINTS from '../../../utils/EndPoints';
import { BASE_URL_SUPER } from '../../../utils/BaseUrl';
import { PostMethod, GetMethod } from '../ApiMethod';

/**
 * API CALL FOR GET EXTREME AND REF ACCOUNT
 */
export const GetExtremeRefDetail = async (apiUrl) => {
    const url = BASE_URL_SUPER + END_POINTS.SUPER_ADMIN_EXTREME_REF + apiUrl;
    return GetMethod(url);
};

/**
 * API CALL FOR CREATE EXTREME AND REF ACCOUNT
 */
export const ExtremeRefAccount = async (endPoint, data) => {
    const url = BASE_URL_SUPER + END_POINTS.CREATE_EXTREME_REF_ACCOUNT + endPoint;
    return PostMethod(url, data);
};