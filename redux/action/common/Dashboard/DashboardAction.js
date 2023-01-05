import * as types from '../../CommonActionType';

/**
 * Document chart
 */
export const Documentchart = (url) => {
    return {
        type: types.FETCH_DOCUMENT_TYPE_START, url: url
    };
};

/**
 * Department chart
 */
export const Departmentchart = (url) => {
    return {
        type: types.FETCH_DEPARTMENT_TYPE_START, url: url
    };
};


