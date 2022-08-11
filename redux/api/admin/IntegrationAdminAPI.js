import END_POINTS from '../../../utils/EndPoints';
import { BASE_URL_EXTREM } from '../../../utils/BaseUrl';
import { GetMethod, PostMethod, PutMethod } from './../ApiMethod';

/**
 * API CALL FOR INTEGRATION DATA
 */

export const GetIntegrationDetail = async () => {
    const url = BASE_URL_EXTREM + END_POINTS.ADMIN_INTEGRATION_DATA;
    return GetMethod(url);
};