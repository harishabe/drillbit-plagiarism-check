import * as types from '../../action/ActionType';

const ProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case types.FETCH_PROFILE_DATA_START:
            return {
                ...state,
                isLoading: true,
            };
        case types.FETCH_PROFILE_DATA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                profileData: action.payload,
            };
        case types.FETCH_PROFILE_DATA_FAIL:
            return {
                ...state,
                isLoading: false,
                profileDataError: action.payload,
            };
        case types.FETCH_PROFILE_LOGO_START:
            return {
                ...state,
                isLoading: true,
            };
        case types.FETCH_PROFILE_LOGO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                profileLogo: action.payload,
            };
        case types.FETCH_PROFILE_LOGO_FAIL:
            return {
                ...state,
                isLoading: false,
                profileLogoError: action.payload,
            };
        case types.FETCH_PROFILE_CHANGE_PASSWORD_START:
            return {
                ...state,
                isLoading: true,
            };
        case types.FETCH_PROFILE_CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                changePassword: action.payload,
            };
        case types.FETCH_PROFILE_CHANGE_PASSWORD_FAIL:
            return {
                ...state,
                isLoading: false,
                changePasswordError: action.payload,
            };
        default:
            return state;
    }
}

export default ProfileReducer;