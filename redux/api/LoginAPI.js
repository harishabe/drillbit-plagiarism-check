import END_POINTS from '../../utils/EndPoints';
import { BASE_URL } from '../../utils/BaseUrl';
import { LoginPostMethod } from './ApiMethod';

/**
 * API CALL FOR LOGIN 
 * @param {*} query
 */

export const login = (query) => {
    const url = BASE_URL + END_POINTS.LOGIN;
    return LoginPostMethod(url, query);
};
