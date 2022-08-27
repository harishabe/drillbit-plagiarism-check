import * as types from '../ActionType';

export const GetProfile = (role) => {
    return {
        type: types.FETCH_PROFILE_DATA_START, query: role
    };
};

export const ProfileLogo = (role, data) => {
    return {
        type: types.FETCH_PROFILE_LOGO_START, role: role, query: data
    };
};

export const ProfileChangePassword = (requestPayload) => {
    return {
        type: types.FETCH_PROFILE_CHANGE_PASSWORD_START, requestPayload: requestPayload
    };
};
