import * as types from '../../action/ActionType';

const DetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case types.FETCH_ADMIN_INSTRUCTOR_DATA_START:
            return {
                ...state,
                isLoading: true,
            };
        case types.FETCH_ADMIN_INSTRUCTOR_DATA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                instructorData: action.payload,
            };
        case types.FETCH_ADMIN_INSTRUCTOR_DATA_FAIL:
            return {
                ...state,
                isLoading: false,
                instructorError: action.payload,
            };
        case types.FETCH_ADMIN_INSTRUCTOR_TEMPLATE_DOWNLOAD_START:
            return {
                ...state,
                isLoadingTemplate: true,
            };
        case types.FETCH_ADMIN_INSTRUCTOR_TEMPLATE_DOWNLOAD_SUCCESS:
            return {
                ...state,
                isLoadingTemplate: false,
                templateDownload: action.payload,
            };
        case types.FETCH_ADMIN_INSTRUCTOR_TEMPLATE_DOWNLOAD_FAIL:
            return {
                ...state,
                isLoadingTemplate: false,
                templateDownloadError: action.payload,
            };
        case types.FETCH_ADMIN_MULTIPLE_INSTRUCTOR_UPLOAD_START:
            return {
                ...state,
                isLoading: true,
            };
        case types.FETCH_ADMIN_MULTIPLE_INSTRUCTOR_UPLOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                fileUploadData: action.payload,
            };
        case types.FETCH_ADMIN_MULTIPLE_INSTRUCTOR_UPLOAD_DATA_CLEAR:
            return {
                ...state,
                fileUploadData: '',
            };
        case types.FETCH_ADMIN_MULTIPLE_INSTRUCTOR_UPLOAD_FAIL:
            return {
                ...state,
                isLoading: false,
                fileUploadData: action.payload,
            };
        case types.FETCH_ADMIN_STATS_DATA_START:
            return {
                ...state,
                isLoadingStats: true,
                StatsData:''
            };
        case types.FETCH_ADMIN_STATS_DATA_SUCCESS:
            return {
                ...state,
                isLoadingStats: false,
                StatsData: action.payload,
            };
        case types.FETCH_ADMIN_STATS_DATA_FAIL:
            return {
                ...state,
                isLoadingStats: false,
                StatsData: action.payload,
            };
        case types.FETCH_ADMIN_EXPORT_CSV_STATS_DATA_START:
            return {
                ...state,
                isLoadingCSV: true,
            };
        case types.FETCH_ADMIN_EXPORT_CSV_STATS_DATA_SUCCESS:
            return {
                ...state,
                isLoadingCSV: false,
                csvExportData: action.payload,
            };
        case types.FETCH_ADMIN_EXPORT_CSV_STATS_DATA_FAIL:
            return {
                ...state,
                isLoadingCSV: false,
                csvExportError: action.payload,
            };
        case types.FETCH_ADMIN_STUDENT_DATA_START:
            return {
                ...state,
                isLoading: true,
            };
        case types.FETCH_ADMIN_STUDENT_DATA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                studentData: action.payload,
            };
        case types.FETCH_ADMIN_STUDENT_DATA_FAIL:
            return {
                ...state,
                isLoading: false,
                studentDataError: action.payload,
            };
        case types.FETCH_ADMIN_REPOSITARY_DETAILS_START:
            return {
                ...state,
                isLoadingRepo: true,
            };
        case types.FETCH_ADMIN_REPOSITARY_DETAILS_SUCCESS:
            return {
                ...state,
                isLoadingRepo: false,
                repoData: action.payload,
            };
        case types.FETCH_ADMIN_REPOSITARY_DETAILS_FAIL:
            return {
                ...state,
                isLoadingRepo: false,
                repoError: action.payload,
            };
        case types.FETCH_ADMIN_REPOSITARY_DETAILS_CLEAR:
            return {
                ...state,
                isLoadingRepo: false,
                repoData: '',
            };
        case types.FETCH_ADMIN_REPOSITARY_UPLOAD_START:
            return {
                ...state,
                isLoadingUpload: true,
            };
        case types.FETCH_ADMIN_REPOSITARY_UPLOAD_SUCCESS:
            return {
                ...state,
                isLoadingUpload: false,
                uploadData: action.payload,
            };
        case types.FETCH_ADMIN_REPOSITARY_UPLOAD_FAIL:
            return {
                ...state,
                isLoadingUpload: false,
                uploadError: action.payload,
            };
        case types.FETCH_ADMIN_REPOSITARY_DELETE_START:
            return {
                ...state,
                isLoadingRemove: true,
            };
        case types.FETCH_ADMIN_REPOSITARY_DELETE_SUCCESS:
            return {
                ...state,
                isLoadingRemove: false,
                removeData: action.payload,
            };
        case types.FETCH_ADMIN_REPOSITARY_DELETE_FAIL:
            return {
                ...state,
                isLoadingRemove: false,
                removeError: action.payload,
            };
        default:
            return state;
    }
}

export default DetailsReducer;