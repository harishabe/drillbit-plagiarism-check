import * as types from '../../action/ActionType';

const SuperReducer = (state = {}, action) => {
    switch (action.type) {
        case types.FETCH_SUPER_ADMIN_DASH_WIDGET_START:
            return {
                ...state,
                isLoading: true,
            };
        case types.FETCH_SUPER_ADMIN_DASH_WIDGET_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            };
        case types.FETCH_SUPER_ADMIN_DASH_WIDGET_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case types.FETCH_SUPER_ADMIN_EXTREME_REF_START:
            return {
                ...state,
                isLoadingExtrRef: true,
            };
        case types.FETCH_SUPER_ADMIN_EXTREME_REF_SUCCESS:
            return {
                ...state,
                isLoadingExtrRef: false,
                ExtrRefData: action.payload,
            };
        case types.FETCH_SUPER_ADMIN_EXTREME_REF_FAIL:
            return {
                ...state,
                isLoadingExtrRef: false,
                ExtrRefDataError: action.payload,
            };
        case types.FETCH_SUPER_ADMIN_CREATE_ACCOUNT_START:
            return {
                ...state,
                isLoadingCreate: true,
            };
        case types.FETCH_SUPER_ADMIN_CREATE_ACCOUNT_SUCCESS:
            return {
                ...state,
                isLoadingCreate: false,
                createdSuccess: action.payload,
            };
        case types.FETCH_SUPER_ADMIN_CREATE_ACCOUNT_FAIL:
            return {
                ...state,
                isLoadingCreate: false,
                createdError: action.payload,
            };
        case types.FETCH_SUPER_ADMIN_DELETE_ACCOUNT_START:
            return {
                ...state,
                isLoadingDelete: true,
            };
        case types.FETCH_SUPER_ADMIN_DELETE_ACCOUNT_SUCCESS:
            return {
                ...state,
                isLoadingDelete: false,
                deleteSuccess: action.payload,
            };
        case types.FETCH_SUPER_ADMIN_DELETE_ACCOUNT_FAIL:
            return {
                ...state,
                isLoadingDelete: false,
                deleteError: action.payload,
            };
        case types.FETCH_SUPER_ADMIN_EDIT_ACCOUNT_START:
            return {
                ...state,
                isLoadingEdit: true,
            };
        case types.FETCH_SUPER_ADMIN_EDIT_ACCOUNT_SUCCESS:
            return {
                ...state,
                isLoadingEdit: false,
                editedSuccess: action.payload,
            };
        case types.FETCH_SUPER_ADMIN_EDIT_ACCOUNT_FAIL:
            return {
                ...state,
                isLoadingEdit: false,
                editedError: action.payload,
            };
        case types.FETCH_SUPER_ADMIN_DROPDOWN_LIST_START:
            return {
                ...state,
                isLoadingList: true,
            };
        case types.FETCH_SUPER_ADMIN_DROPDOWN_LIST_SUCCESS:
            return {
                ...state,
                isLoadingList: false,
                ListSuccess: action.payload,
            };
        case types.FETCH_SUPER_ADMIN_DROPDOWN_LIST_FAIL:
            return {
                ...state,
                isLoadingList: false,
                ListError: action.payload,
            };
        case types.FETCH_SUPER_ADMIN_FOLDER_PATH_LIST_START:
            return {
                ...state,
                isLoadingList: true,
            };
        case types.FETCH_SUPER_ADMIN_FOLDER_PATH_LIST_SUCCESS:
            return {
                ...state,
                isLoadingList: false,
                folderListSuccess: action.payload,
            };
        case types.FETCH_SUPER_ADMIN_FOLDER_PATH_LIST_FAIL:
            return {
                ...state,
                isLoadingList: false,
                folderListError: action.payload,
            };
        case types.FETCH_SUPER_ADMIN_EXT_INSTRUCTOR_LIST_START:
            return {
                ...state,
                isLoadingExtInsList: true,
            };
        case types.FETCH_SUPER_ADMIN_EXT_INSTRUCTOR_LIST_SUCCESS:
            return {
                ...state,
                isLoadingExtInsList: false,
                extInsList: action.payload,
            };
        case types.FETCH_SUPER_ADMIN_EXT_INSTRUCTOR_LIST_FAIL:
            return {
                ...state,
                isLoadingExtInsList: false,
                extInsList: action.payload,
            };
        case types.FETCH_SUPER_ADMIN_EXT_STUDENT_LIST_START:
            return {
                ...state,
                isLoadingExtStuList: true,
            };
        case types.FETCH_SUPER_ADMIN_EXT_STUDENT_LIST_SUCCESS:
            return {
                ...state,
                isLoadingExtStuList: false,
                extStuList: action.payload,
            };
        case types.FETCH_SUPER_ADMIN_EXT_STUDENT_LIST_FAIL:
            return {
                ...state,
                isLoadingExtStuList: false,
                extStuList: action.payload,
            };
        case types.FETCH_SUPER_ADMIN_EXT_EDIT_STUDENT_START:
            return {
                ...state,
                isLoadingEditStudent: true,
            };
        case types.FETCH_SUPER_ADMIN_EXT_EDIT_STUDENT_SUCCESS:
            return {
                ...state,
                isLoadingEditStudent: false,
                editStudent: action.payload,
            };
        case types.FETCH_SUPER_ADMIN_EXT_EDIT_STUDENT_FAIL:
            return {
                ...state,
                isLoadingEditStudent: false,
                editStudent: action.payload,
            };
        case types.FETCH_SUPER_ADMIN_GLOBAL_SEARCH_START:
            return {
                ...state,
                isLoadingList: true,
            };
        case types.FETCH_SUPER_ADMIN_GLOBAL_SEARCH_SUCCESS:
            return {
                ...state,
                isLoadingList: false,
                globalData: action.payload,
            };
        case types.FETCH_SUPER_ADMIN_GLOBAL_SEARCH_FAIL:
            return {
                ...state,
                isLoadingList: false,
                globalDataError: action.payload,
            };
        case types.FETCH_SUPER_ADMIN_GLOBAL_SEARCH_CLEAR:
            return {
                ...state,
                isLoadingList: false,
                globalData: '',
            }
        case types.FETCH_SUPER_ADMIN_EXT_CREATE_STUDENT_START:
            return {
                ...state,
                isLoadingCreateStudent: true,
            };
        case types.FETCH_SUPER_ADMIN_EXT_CREATE_STUDENT_SUCCESS:
            return {
                ...state,
                isLoadingCreateStudent: false,
                createStudent: action.payload,
            };
        case types.FETCH_SUPER_ADMIN_EXT_CREATE_STUDENT_FAIL:
            return {
                ...state,
                isLoadingCreateStudent: false,
                createStudent: action.payload,
            };
        case types.FETCH_SUPER_ADMIN_MAKE_HIM_ADMIN_START:
            return {
                ...state,
                isLoading: true,
            };
        case types.FETCH_SUPER_ADMIN_MAKE_HIM_ADMIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                makeHimAdmin: action.payload,
            };
        case types.FETCH_SUPER_ADMIN_MAKE_HIM_ADMIN_FAIL:
            return {
                ...state,
                isLoading: false,
                makeHimAdmin: action.payload,
            };
        case types.FETCH_SUPER_ADMIN_RESEND_CREDENTIALS_START:
            return {
                ...state,
                isLoadingResend: true,
            };
        case types.FETCH_SUPER_ADMIN_RESEND_CREDENTIALS_SUCCESS:
            return {
                ...state,
                isLoadingResend: false,
                resendCredentials: action.payload,
            };
        case types.FETCH_SUPER_ADMIN_RESEND_CREDENTIALS_FAIL:
            return {
                ...state,
                isLoadingResend: false,
                resendCredentials: action.payload,
            };
        default:
            return state;
    }
};

export default SuperReducer;
