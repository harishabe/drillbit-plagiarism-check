import axois from 'axios';
import BASE_URL from '../../utils/BaseUrl';


const headers = {
    'Content-Type': 'application/json',
    "Accept": "application/json",
    'Authorization': typeof window !== 'undefined' && `Bearer ${localStorage.getItem('token')}`
}

/**
 * API METHOD - POST
 * @param {*} url
 */

export const PostMethod = async (url, query) => {
    return await axois.post(BASE_URL + url, query, {
        headers: headers
    })
        .then(response => ({ response }))
        .catch(error => ({ error }))
};

/**
 * API METHOD - GET
 * @param {*} url
 */

export const GetMethod = async (url) => {
    return await axois.get(BASE_URL + url, {
        headers: headers
    })
        .then(response => ({ response }))
        .catch(error => ({ error }))
};
