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

const headerEN = () => {
    return {
        "Accept-Language": "en",
        "Content-Type": "application/json",
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
 * API METHOD - POST EN
 * @param {*} url
 */

export const PostMethodEN = async (url, query) => {
    return await axois.post(url, query, {
        headers: headerEN()
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

export const GetMethodDownload = async (url, fileName) => {
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
 * API METHOD - GET PDF
 * @param {*} url
 */

export const GetMethodDownloadPdf = async (url, fileName) => {
    return await axois.get(url, {
        responseType: 'blob',
        headers: header()
    })
        .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]), { type: 'application/pdf' });
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
 * API METHOD - GET PDF TO NEW WINDOW
 * @param {*} url
 */

export const GetDownloadPdfNewWindow = async (url) => {
    return await axois.get(url, {
        responseType: 'blob',
        headers: header()
    })
        .then((response) => {
            const file = new Blob([response.data], { type: "application/pdf" });
            const fileURL = URL.createObjectURL(file);
            const pdfWindow = window.open();
            pdfWindow.location.href = fileURL;
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