import axois from 'axios';
import BASE_URL from '../../utils/BaseUrl';
import END_POINTS from '../../utils/EndPoints';

const header = () => {
    return {
        "Content-Type": "application/json",
        "Accept": "application/json",
        'authorization': `Bearer ${localStorage.getItem('token')}`
    }
}

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

export const GetMethod = async () => {
    const Apiurl = BASE_URL + END_POINTS.ADMIN_DASHBOARD_WIDGET;;
    return await axois.get(Apiurl, {
        headers: header()
    })
        .then(response => ({ response }))
        .catch(error => ({ error }))
};