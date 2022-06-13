import axois from 'axios';
import BASE_URL from '../../utils/BaseUrl';

const header = () => {
    return {
        "Content-Type": "application/json",
        "Accept": "application/json",
        'authorization': `Bearer ${localStorage.getItem('token')}`
    }
};

const FormDataHeader = () => {
    return {
        "Content-Type": "multipart/form-data",
        'authorization': `Bearer ${localStorage.getItem('token')}`
    }
};

/**
 * API METHOD - POST
 * @param {*} url
 */

export const PostMethod = async (url, query) => {
    return await axois.post(BASE_URL + url, query,{
        headers: header()
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
        headers: header()
    })
        .then(response => ({ response }))
        .catch(error => ({ error }))
};

/**
 * API METHOD - POST accepts only form data
 * @param {*} url
 */

 export const PostFormData = async (url, query) => {
    return await axois.post(BASE_URL + url, query,{
        headers: FormDataHeader()
    })
        .then(response => ({ response }))
        .catch(error => ({ error }))
};
