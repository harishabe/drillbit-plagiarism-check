import * as types from '../ActionType';

export const GetProfile = () => {
    return {
        type: types.FETCH_PROFILE_DATA_START,
    };
};

export const ProfileLogo = (data) => {
    console.log('profiledata',data);
    return {
        type: types.FETCH_PROFILE_LOGO_START, query: data
    };
};

export const ProfileChangePassword = (data) => {
    return {
        type: types.FETCH_PROFILE_CHANGE_PASSWORD_START, query: data
    };
};
