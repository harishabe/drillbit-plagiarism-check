import * as types from '../../action/ActionType';

const IntegrationReducer = (state = {}, action) => {
    switch (action.type) {
        case types.FETCH_ADMIN_INTEGRATION_DETAILS_START:
            return {
                ...state,
                isLoading: true,
            };
        case types.FETCH_ADMIN_INTEGRATION_DETAILS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                integrationData: action.payload,
            };
        case types.FETCH_ADMIN_INTEGRATION_DETAILS_FAIL:
            return {
                ...state,
                isLoading: false,
                integrationDataError: action.payload,
            };
        case types.FETCH_ADMIN_INTEGRATION_TYPE_DETAILS_START:
            return {
                ...state,
                isLoading: true,
            };
        case types.FETCH_ADMIN_INTEGRATION_TYPE_DETAILS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                integrationTypeData: action.payload,
            };
        case types.FETCH_ADMIN_INTEGRATION_TYPE_DETAILS_FAIL:
            return {
                ...state,
                isLoading: false,
                integrationTypeDataError: action.payload,
            };
        case types.FETCH_ADMIN_INTEGRATION_UPLOAD_DETAILS_START:
            return {
                ...state,
                isLoadingUpload: true,
            };
        case types.FETCH_ADMIN_INTEGRATION_UPLOAD_DETAILS_SUCCESS:
            return {
                ...state,
                isLoadingUpload: false,
                uploadData: action.payload,
            };
        case types.FETCH_ADMIN_INTEGRATION_UPLOAD_DETAILS_FAIL:
            return {
                ...state,
                isLoadingUpload: false,
                uploadDataError: action.payload,
            };
        case types.FETCH_ADMIN_INTEGRATION_CHANGE_CONFIG_START:
            return {
                ...state,
                isLoadingUpload: true,
            };
        case types.FETCH_ADMIN_INTEGRATION_CHANGE_CONFIG_SUCCESS:
            return {
                ...state,
                isLoadingUpload: false,
                configData: action.payload,
            };
        case types.FETCH_ADMIN_INTEGRATION_CHANGE_CONFIG_FAIL:
            return {
                ...state,
                isLoadingUpload: false,
                configDataError: action.payload,
            };
        default:
            return state;
    }
}

export default IntegrationReducer;