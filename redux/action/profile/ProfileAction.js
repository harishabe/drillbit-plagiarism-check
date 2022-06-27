import * as types from '../ActionType';

export const GetProfile = (role) => {
    return {
        type: types.FETCH_PROFILE_DATA_START, query: role
    };
};

export const ProfileLogo = (data) => {
    return {
        type: types.FETCH_PROFILE_LOGO_START, query: data
    };
};

export const ProfileChangePassword = (data) => {
    return {
        type: types.FETCH_PROFILE_CHANGE_PASSWORD_START, query: data
    };
};
