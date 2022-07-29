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
        month = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
    let hour = (date.getHours().toString()).length > 1 ? date.getHours() : "0" + date.getHours();
    let min = (date.getMinutes().toString()).length > 1 ? date.getMinutes() : "0" + date.getMinutes();
    let sec = (date.getSeconds().toString()).length > 1 ? date.getSeconds() : "0" + date.getSeconds();
    return [date, month, day, hour, min, sec];
};

export const convertDate = (str) => {
    console.log('11111111111',str);
    const [date, month, day, hour, min, sec] = dateFormat(str);
    return [date.getFullYear(), month, day].join("-")[hour, min, sec].join(":");
    // return [(date.getFullYear(), month, day, hour, min, sec)].join("-");
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
