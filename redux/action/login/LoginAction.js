import * as types from '../ActionType';

export const login = (data) => {
    return {
        type: types.FETCH_LOGIN_START, query: data
    };
};
