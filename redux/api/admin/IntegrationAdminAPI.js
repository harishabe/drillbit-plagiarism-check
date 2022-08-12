import END_POINTS from '../../../utils/EndPoints';
import { BASE_URL_EXTREM } from '../../../utils/BaseUrl';
import { GetMethod, PostMethod, PutMethod } from './../ApiMethod';

/**
 * API CALL FOR INTEGRATION DATA
 */

export const GetIntegrationDetail = async (apiUrl) => {
    const url = BASE_URL_EXTREM + apiUrl;
    return GetMethod(url);
};