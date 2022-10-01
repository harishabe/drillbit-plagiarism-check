import * as types from '../ActionType';

export const login = (data) => {
    return {
        type: types.FETCH_LOGIN_START, query: data
    };
};

export const ForgetPassword = (data) => {
    return {
        type: types.FETCH_FORGET_PASSWORD_START, query: data
    };
};

export const ResetPassword = (data) => {
    return {
        type: types.FETCH_RESET_PASSWORD_START, query: data
    };
};
