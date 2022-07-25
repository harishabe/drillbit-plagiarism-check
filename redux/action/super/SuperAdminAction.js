import * as types from '../ActionType';

/**
 * Get Extreme and Ref Account
 */
export const GetExtremeRefData = (url) => {
    return {
        type: types.FETCH_SUPER_ADMIN_EXTREME_REF_START, url: url
    };
};

/**
 * Create Extreme and Ref Account
 */
export const CreateAccount = (url, data) => {
    return {
        type: types.FETCH_SUPER_ADMIN_CREATE_ACCOUNT_START, url: url, query: data
    };
};