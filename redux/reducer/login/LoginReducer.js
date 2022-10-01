import * as types from '../../action/ActionType';

const LoginReducer = (state = {}, action) => {
    switch (action.type) {
        case types.FETCH_LOGIN_START:
            return {
                ...state,
                isLoadingLogin: true,
            };
        case types.FETCH_LOGIN_SUCCESS:
            return {
                ...state,
                isLoadingLogin: false,
                data: action.payload
            };
        case types.FETCH_LOGIN_FAIL:
            return {
                ...state,
                isLoadingLogin: false,
                error: action.payload
            };
        case types.FETCH_FORGET_PASSWORD_START:
            return {
                ...state,
                isLoadingForgetPwd: true,
            };
        case types.FETCH_FORGET_PASSWORD_SUCCESS:
            return {
                ...state,
                isLoadingForgetPwd: false,
                data: action.payload
            };
        case types.FETCH_FORGET_PASSWORD_FAIL:
            return {
                ...state,
                isLoadingForgetPwd: false,
                error: action.payload
            };
        case types.FETCH_RESET_PASSWORD_START:
            return {
                ...state,
                isLoadingResetPwd: true,
            };
        case types.FETCH_RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                isLoadingResetPwd: false,
                data: action.payload
            };
        case types.FETCH_RESET_PASSWORD_FAIL:
            return {
                ...state,
                isLoadingResetPwd: false,
                error: action.payload
            };
        default:
            return state;
    }
}

export default LoginReducer;