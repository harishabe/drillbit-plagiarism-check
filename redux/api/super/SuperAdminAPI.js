import END_POINTS from '../../../utils/EndPoints';
import { BASE_URL_SUPER } from '../../../utils/BaseUrl';
import { PostMethod } from '../ApiMethod';

/**
 * API CALL FOR CREATE EXTREME AND REF ACCOUNT
 */
export const ExtremeRefAccount = async (endPoint, data) => {
    const url = BASE_URL_SUPER + END_POINTS.CREATE_EXTREME_REF_ACCOUNT + endPoint;
    return PostMethod(url, data);
};