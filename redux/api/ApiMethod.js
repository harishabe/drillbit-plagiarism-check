import axois from 'axios';
import BASE_URL from '../../utils/BaseUrl';

/**
 * API METHOD - POST
 * @param {*} url
 */

export const PostMethod = async (url, query) => {
    return await axois.post(BASE_URL + url, query)
        .then(response => ({ response }))
        .catch(error => ({ error }))
};

/**
 * API METHOD - GET
 * @param {*} url
 */

export const GetMethod = async (url) => {
    return await axois.get(BASE_URL + url)
        .then(response => ({ response }))
        .catch(error => ({ error }))
};
