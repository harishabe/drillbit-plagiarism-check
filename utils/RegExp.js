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

export const findByExpiryDate = (date) => {
    let presentDate = new Date();
    let expiryDate = new Date(date);
    let differenceInTime = expiryDate.getTime() - presentDate.getTime();
    return `${Math.round(differenceInTime / (1000 * 3600 * 24))}`;
};

export const expiryDateBgColor = (validity) => {
    if (validity < 0) {
        return '#E9596F';
    } else if (validity >= 0 && validity <= 15) {
        return '#FF0000';
    } else if (validity >= 15 && validity <= 100) {
        return '#FFFF00';
    } else if (validity >= 100) {
        return '#CCCC';
    }
};

const dateFormat = (str) => {
    let date = new Date(str),
        month = (date.getMonth() < 10) ? "0" + date.getMonth().toString() : date.getMonth(),
        day = (date.getDate() < 10) ? "0" + date.getDate().toString() : date.getDate();
    return [date, month, day];
};

const ISO = (timeStamp = Date.now()) => {
    return new Date(timeStamp - (new Date().getTimezoneOffset() * 60 * 1000)).toISOString().slice(0, -5).replace('T', ' ')
}

export const convertDate = (str) => {
    return ISO(str);
};

export const formatDate = (str) => {
    const [date, month, day] = dateFormat(str);
    return [day, month, date.getFullYear()].join("/");
};

export const setItemLocalStorage = (key,value) => {
    localStorage.setItem(key,value);
};

export const getItemLocalStorage = (key) => {
    let a = localStorage.getItem(key);
    return a;
};
