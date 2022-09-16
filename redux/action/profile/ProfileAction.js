import * as types from '../ActionType';

export const GetProfile = (url) => {
    return {
        type: types.FETCH_PROFILE_DATA_START, url: url
    };
};

export const ProfileLogo = (url, data) => {
    return {
        type: types.FETCH_PROFILE_LOGO_START, url: url, query: data
    };
};

export const ProfileChangePassword = (requestPayload) => {
    return {
        type: types.FETCH_PROFILE_CHANGE_PASSWORD_START, requestPayload: requestPayload
    };
};
