import * as types from '../../action/ActionType';

const LoginReducer = (state = {}, action) => {
    switch (action.type) {
        case types.FETCH_LOGIN_START:
            return {
                ...state,
                isLoading: true,
            };
        case types.FETCH_LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload
            };
        case types.FETCH_LOGIN_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        case types.FETCH_FORGET_PASSWORD_START:
            return {
                ...state,
                isLoading: true,
            };
        case types.FETCH_FORGET_PASSWORD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload
            };
        case types.FETCH_FORGET_PASSWORD_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        default:
            return state;
    }
}

export default LoginReducer;