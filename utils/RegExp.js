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
        return 'rgba(216, 79, 79, 0.4)';
    } else if (validity >= 0 && validity <= 15) {
        return 'rgba(216, 79, 79, 0.4)';
    } else if (validity >= 15 && validity <= 100) {
        return 'rgba(245, 203, 71, 0.4)';
    } else if (validity >= 100) {
        return 'rgba(204, 204, 204, 0.33)';
    }
};

const dateFormat = (str) => {
    let date = new Date(str),
        month = (date.getMonth() + 1 < 10) ? "0" + (date.getMonth() + 1) : date.getMonth() + 1,
        day = (date.getDate() < 10) ? "0" + date.getDate().toString() : date.getDate();
    return [date, month, day];
};

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

export const formatDate = (str) => {
    var date = new Date(str);
    var dateStr = ("00" + date.getDate()).slice(-2) + "-" +
        ("00" + (date.getMonth() + 1)).slice(-2) + "-" +
        date.getFullYear() + " " +
        ("00" + date.getHours()).slice(-2) + ":" +
        ("00" + date.getMinutes()).slice(-2) + ":" +
        ("00" + date.getSeconds()).slice(-2);
    return dateStr;
};

export const formatOnlyDate = (str) => {
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
