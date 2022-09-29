import * as types from '../ActionType';

/**
 * Get Dashboard data
 */
export const GetWidgetCount = () => {
    return {
        type: types.FETCH_SUPER_ADMIN_DASH_WIDGET_START
    };
};
/**
 * Get Extreme and Ref Account
 */
export const GetExtremeRefData = (url, paginationPayload) => {
    return {
        type: types.FETCH_SUPER_ADMIN_EXTREME_REF_START, url: url, paginationPayload: paginationPayload
    };
};

/**
 * Create Extreme and Ref Account
 */
export const EditAccount = (url, data) => {
    return {
        type: types.FETCH_SUPER_ADMIN_EDIT_ACCOUNT_START, url: url, query: data
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

/**
 * DropdownList Extreme and Ref Account
 */
export const DropdownList = () => {
    return {
        type: types.FETCH_SUPER_ADMIN_DROPDOWN_LIST_START
    };
};