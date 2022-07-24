import axois from 'axios';

const header = () => {
    return {
        "Content-Type": "application/json",
        "Accept": "application/json",
        'authorization': `Bearer ${localStorage.getItem('token')}`
    }
};

const headerWithoutToken = () => {
    return {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
};

const FormDataHeader = () => {
    return {
        "Accept-Language": "en",
        "Content-Type": "multipart/form-data",
        'authorization': `Bearer ${localStorage.getItem('token')}`
    }
};

/**
 * API METHOD - POST
 * @param {*} url
 */

export const LoginPostMethod = async (url, query) => {
    return await axois.post(url, query, {
        headers: headerWithoutToken()
    })
        .then(response => ({ response }))
        .catch(error => ({ error }))
};

/**
 * API METHOD - POST
 * @param {*} url
 */

export const PostMethod = async (url, query) => {
    return await axois.post(url, query, {
        headers: header()
    })
        .then(response => ({ response }))
        .catch(error => ({ error }))
};

/**
 * API METHOD - PUT
 * @param {*} url
 */

export const PutMethod = async (url, query) => {
    return await axois.put(url, query, {
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
    return await axois.get(url, {
        headers: header()
    })
        .then(response => ({ response }))
        .catch(error => ({ error }))
};

/**
 * API METHOD - GET
 * @param {*} url
 */

export const GetMethodDownload = async (url,fileName) => {
    return await axois.get(url, {
        headers: header()
    })
        .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            return true;
        })
        .catch(error => ({ error }))
};

/**
 * API METHOD - POST accepts only form data
 * @param {*} url
 */

export const PostFormData = async (url, query) => {
    return await axois.post(url, query, {
        headers: FormDataHeader()
    })
        .then(response => ({ response }))
        .catch(error => ({ error }))
};

/**
 * API METHOD - GET
 * @param {*} url
 */

export const DeleteMethod = async (url) => {
    return await axois.delete(url, {
        headers: header()
    })
        .then(response => ({ response }))
        .catch(error => ({ error }))
};