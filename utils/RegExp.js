export const removeCommaWordEnd = (str) => {
    return str.replace(/,(\s+)?$/, '');
};

export const renameKeys = (obj, newKeys) => {
    const keyValues = Object.keys(obj).map(key => {
        const newKey = newKeys[key] || key;
        return { [newKey]: obj[key] };
    });
    return Object.assign({}, ...keyValues);
}

export const findByExpiryDate = (date) => {
    let presentDate = new Date();
    let expiryDate = new Date(date);
    let differenceInTime = presentDate.getTime() - expiryDate.getTime();
    return `${Math.round(differenceInTime / (1000 * 3600 * 24))}`;
}

export const expiryDateBgColor = (validity) => {
    if (validity <= 15) {
        return '#FF0000';
    } else if (validity >= 15 && validity <= 100) {
        return '#FFFF00';
    } else if (validity >= 100) {
        return '#CCCC';
    }
}

const dateFormat = (str) => {
    let date = new Date(str),
        month = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
    return [date, month, day];
};

export const convertDate = (str) => {
    const [date, month, day] = dateFormat(str);
    return [date.getFullYear(), month, day].join("-");
};

export const formatDate = (str) => {
    const [date, month, day] = dateFormat(str);
    return [day, month, date.getFullYear()].join("/");
};
