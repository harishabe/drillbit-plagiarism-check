import * as types from '../../../action/CommonActionType';

const DocumnentChartReducer = (state = {}, action) => {
    switch (action.type) {
        case types.FETCH_DOCUMENT_TYPE_START:
            return {
                ...state,
                isLoadingDocument: true,
            };
        case types.FETCH_DOCUMENT_TYPE_SUCCESS:
            return {
                ...state,
                isLoadingDocument: false,
                DocumentTypeData: action.payload,
            };
        case types.FETCH_DOCUMENT_TYPE_FAIL:
            return {
                ...state,
                isLoadingDocument: false,
                DocumentTypeData: action.payload,
            };
        case types.FETCH_DEPARTMENT_TYPE_START:
            return {
                ...state,
                isLoadingDepartment: true,
            };
        case types.FETCH_DEPARTMENT_TYPE_SUCCESS:
            return {
                ...state,
                isLoadingDepartment: false,
                DepartmentTypeData: action.payload,
            };
        case types.FETCH_DEPARTMENT_TYPE_FAIL:
            return {
                ...state,
                isLoadingDepartment: false,
                DepartmentTypeData: action.payload,
            };
        default:
            return state;
    }
};

export default DocumnentChartReducer;