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
export const DropdownList = (url) => {
    return {
        type: types.FETCH_SUPER_ADMIN_DROPDOWN_LIST_START, url: url
    };
};

/**
 * Extreme (Instructor list)
 */
export const GetExtremeInstructorList = (url, paginationPayload) => {
    return {
        type: types.FETCH_SUPER_ADMIN_EXT_INSTRUCTOR_LIST_START, url: url, paginationPayload: paginationPayload
    };
};

/**
 * Extreme (students list)
 */
export const GetExtremeStudentList = (url, paginationPayload) => {
    return {
        type: types.FETCH_SUPER_ADMIN_EXT_STUDENT_LIST_START, url: url, paginationPayload: paginationPayload
    };
};

/**
 * Edit student
 */
export const SuperEditStudent = (url, data) => {
    return {
        type: types.FETCH_SUPER_ADMIN_EXT_EDIT_STUDENT_START, url: url, query: data
    };
};

/**
 * Global search super admin
 */
export const GlobalSearch = (url) => {
    return {
        type: types.FETCH_SUPER_ADMIN_GLOBAL_SEARCH_START, url: url
    };
};

/**
 * Global search super admin
 */
export const GlobalSearchClear = () => {
    return {
        type: types.FETCH_SUPER_ADMIN_GLOBAL_SEARCH_CLEAR
    };
};