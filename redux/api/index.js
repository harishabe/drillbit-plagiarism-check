import axois from 'axios';
import BASE_URL from '../../utils/BaseUrl';
import END_POINTS from '../../utils/EndPoints';

export const login = async (query) => {
    const url = BASE_URL + END_POINTS.LOGIN;
    return await axois.post(url, query)
        .then(response => ({ response }))
        .catch(error => ({ error }))
};