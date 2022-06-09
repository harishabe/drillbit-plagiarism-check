import * as types from '../../action/ActionType';

const ReportsReducer = (state = {}, action) => {
    switch (action.type) {
        case types.FETCH_ADMIN_REPORTS_DATA_START:
            return {
                ...state,
                isLoading: true,
            };
        case types.FETCH_ADMIN_REPORTS_DATA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                reportData: action.payload,
            };
        case types.FETCH_ADMIN_REPORTS_DATA_FAIL:
            return {
                ...state,
                isLoading: false,
                reportDataError: action.payload,
            };
        case types.FETCH_ADMIN_REPORTS_DATA_DOWNLOAD_START:
            return {
                ...state,
                isLoading: true,
            };
        case types.FETCH_ADMIN_REPORTS_DATA_DOWNLOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                reportDataDownload: action.payload,
            };
        case types.FETCH_ADMIN_REPORTS_DATA_DOWNLOAD_FAIL:
            return {
                ...state,
                isLoading: false,
                reportDataDownloadError: action.payload,
            };
        default:
            return state;
    }
}

export default ReportsReducer;