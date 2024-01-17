import * as types from '../../CommonActionType';
/**
 * MFA Activation
 */
export const MfaActivation = (url) => {
    return {
        type: types.FETCH_MFA_ACTIVATION_START, url: url
    };
};

/**
 * MFA Login 
 */
export const MfaLogin = (data) => {
    return {
        type: types.FETCH_MFA_LOGIN_START, query: data
    };
};