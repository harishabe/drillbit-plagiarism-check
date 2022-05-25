import BASE_URL from '../../utils/BaseUrl';
import END_POINTS from '../../utils/EndPoints';
import { PostMethod } from './ApiMethod';

/**
 * API CALL FOR LOGIN 
 * @param {*} query
 */

export const login = (query) => {
    const url = END_POINTS.LOGIN;
    return PostMethod(url, query);
};
