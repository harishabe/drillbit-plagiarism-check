export const removeCommaWordEnd = (str) => {
    return str.replace(/,(\s+)?$/, '');
};

export const renameKeys = (obj, newKeys) => {
    const keyValues = Object.keys(obj).map(key => {
        const newKey = newKeys[key] || key;
        return { [newKey]: obj[key] };
    });
    return Object.assign({}, ...keyValues);
};

export const randomColor = Math.floor(Math.random() * 16777215).toString(16);
export const platform = typeof window !== "undefined" && window.navigator.platform;

export const findByExpiryDate = (date) => {
    let presentDate = new Date();
    let expiryDate = new Date(date.replace(" ", "T"));
    let differenceInTime = expiryDate.getTime() - presentDate.getTime();
    return `${Math.round(differenceInTime / (1000 * 3600 * 24))}`;
};

export const expiryDateBgColor = (validity) => {
    if (validity < 0) {
        return 'rgba(216, 79, 79, 0.4)';
    } else if (validity >= 0 && validity <= 15) {
        return 'rgba(216, 79, 79, 0.4)';
    } else if (validity >= 15 && validity <= 100) {
        return 'rgba(245, 203, 71, 0.4)';
    } else if (validity >= 100) {
        return 'rgba(204, 204, 204, 0.33)';
    }
};

/**
 * 
 * @param {*} str
 * Below function using only in student role -> submission page at header 
 * @returns 
 */
export const dateFormat = (str) => {
    // let date = new Date(str),
    //     year = date.getFullYear(),
    //     month = (date.getMonth() + 1 < 10) ? "0" + (date.getMonth() + 1) : date.getMonth() + 1,
    //     day = (date.getDate() < 10) ? "0" + date.getDate().toString() : date.getDate();
    // return [day, month, year].join("/");
    var date = new Date(str && str.replace(" ", "T"));
    var dateStr = ("00" + date.getDate()).slice(-2) + "/" +
        ("00" + (date.getMonth() + 1)).slice(-2) + "/" +
        date.getFullYear() + " "
    return dateStr;
};

/**
 * 
 * @param {*} str 
 * using below convertDate function only for post request to api
 * @returns 
 */
export const convertDate = (str) => {
    var date = new Date(str);
    var dateStr = date.getFullYear() + "-" +
        ("00" + (date.getMonth() + 1)).slice(-2) + "-" +
        ("00" + date.getDate()).slice(-2) + " " +
        ("00" + date.getHours()).slice(-2) + ":" +
        ("00" + date.getMinutes()).slice(-2) + ":" +
        ("00" + date.getSeconds()).slice(-2);
    return dateStr;
};

/**
 * 
 * @param {*} str 
 * using below convertDateAssignment function only for assignment post request
 * @returns 
 */
export const convertDateAssignment = (str) => {
    let date = new Date(str);
    let currentTime = new Date();

    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let seconds = currentTime.getSeconds();

    hours = (hours < 10 ? "0" : "") + hours;
    minutes = (minutes < 10 ? "0" : "") + minutes;
    seconds = (seconds < 10 ? "0" : "") + seconds;

    let dateStr = date.getFullYear() + "-" +
        ("00" + (date.getMonth() + 1)).slice(-2) + "-" +
        ("00" + date.getDate()).slice(-2) + " " +
        hours + ":" + minutes + ":" + seconds;
    return dateStr;
};

export const formatDate = (str) => {
    var date = new Date(str.replace(" ", "T"));
    var dateStr = ("00" + date.getDate()).slice(-2) + "-" +
        ("00" + (date.getMonth() + 1)).slice(-2) + "-" +
        date.getFullYear() + " " +
        ("00" + date.getHours()).slice(-2) + ":" +
        ("00" + date.getMinutes()).slice(-2) + ":" +
        ("00" + date.getSeconds()).slice(-2);
    return dateStr;
};

// export const formatOnlyDate = (str) => {
//     const [date, month, day] = dateFormat(str);
//     return [day, month, date.getFullYear()].join("/");
// };

export const setItemLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
};

export const getItemLocalStorage = (key) => {
    let a = localStorage.getItem(key);
    return a;
};

export const setItemSessionStorage = (key, value) => {
    sessionStorage.setItem(key, value);
};

export const getItemSessionStorage = (key) => {
    let a = sessionStorage.getItem(key);
    return a;
};

export const removeItemSessionStorage = (key) => {
    let a = sessionStorage.removeItem(key);
    return a;
};

export const clearSessionStorage = () => {
    sessionStorage.clear();
};

export const windowOpen = (url) => {
    let params = 'width=' + screen.width;
    params += ', height=' + screen.height;
    params += ', top=0, left=0';
    params += ', fullscreen=yes';
    let newwin = window.open(url, 'AnalysisWindow', params);
    if (window.focus) {
        newwin.focus()
    }
    return false;
};

export const isValidFileUploaded = (file) => {
    const validExtensions = ['pdf', 'doc', 'docx', 'txt', 'rtf', 'dot', 'dotx', 'html', 'odt', 'pptx', 'ppt', 'xlsx', 'xls', 'wpd', 'ps', 'xml', 'tex', 'tiff'];
    const fileExtension = file?.name?.split('.').pop().toLowerCase();
    return validExtensions.includes(fileExtension);
}

export const isValidRepositoryFileUploaded = (file) => {
    const validExtensions = ['pdf', 'doc', 'docx'];
    const fileExtension = file?.name?.split('.').pop().toLowerCase();
    return validExtensions.includes(fileExtension);
}

export const isValidRepositoryFileUpload = (file) => {
    const validExtensions = ['pdf', 'doc', 'docx'];
    const fileExtension = file.split('.').pop().toLowerCase();
    return validExtensions.includes(fileExtension);
}

/**
 * 
 * Prevents letter e/E in inputNumber field_type 
 */

export const handleKeyPress = (event) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    if (/[eE]/.test(keyValue)) {
        event.preventDefault();
    }
};