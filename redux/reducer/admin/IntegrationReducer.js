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
                isLoadingTypeDetail: true,
            };
        case types.FETCH_ADMIN_INTEGRATION_TYPE_DETAILS_SUCCESS:
            return {
                ...state,
                isLoadingTypeDetail: false,
                integrationTypeData: action.payload,
            };
        case types.FETCH_ADMIN_INTEGRATION_TYPE_DETAILS_FAIL:
            return {
                ...state,
                isLoadingTypeDetail: false,
                integrationTypeData: action.payload,
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
        case types.FETCH_ADMIN_INTEGRATION_GOOGLECLASSROOM_START:
            return {
                ...state,
                isLoadingGoogle: true,
            };
        case types.FETCH_ADMIN_INTEGRATION_GOOGLECLASSROOM_SUCCESS:
            return {
                ...state,
                isLoadingGoogle: false,
                googleConfigData: action.payload,
            };
        case types.FETCH_ADMIN_INTEGRATION_GOOGLECLASSROOM_FAIL:
            return {
                ...state,
                isLoadingGoogle: false,
                googleConfigData: action.payload,
            };
        case types.FETCH_ADMIN_INTEGRATION_GOOGLE_LIVECOURSE_START:
            return {
                ...state,
                isLoadingLiveCourse: true,
            };
        case types.FETCH_ADMIN_INTEGRATION_GOOGLE_LIVECOURSE_SUCCESS:
            return {
                ...state,
                isLoadingLiveCourse: false,
                googleLiveCourseData: action.payload,
            };
        case types.FETCH_ADMIN_INTEGRATION_GOOGLE_LIVECOURSE_FAIL:
            return {
                ...state,
                isLoadingLiveCourse: false,
                googleLiveCourseData: action.payload,
            };
        case types.FETCH_ADMIN_INTEGRATION_GOOGLE_IMPORT_COURSES_START:
            return {
                ...state,
                isLoadingImportCourse: true,
            };
        case types.FETCH_ADMIN_INTEGRATION_GOOGLE_IMPORT_COURSES_SUCCESS:
            return {
                ...state,
                isLoadingImportCourse: false,
                googleImportCourseData: action.payload,
            };
        case types.FETCH_ADMIN_INTEGRATION_GOOGLE_IMPORT_COURSES_FAIL:
            return {
                ...state,
                isLoadingImportCourse: false,
                googleImportCourseData: action.payload,
            };
        case types.FETCH_ADMIN_INTEGRATION_GOOGLE_COURSE_HOME_START:
            return {
                ...state,
                isLoadingCourseHome: true,
            };
        case types.FETCH_ADMIN_INTEGRATION_GOOGLE_COURSE_HOME_SUCCESS:
            return {
                ...state,
                isLoadingCourseHome: false,
                googleCourseHomeData: action.payload,
            };
        case types.FETCH_ADMIN_INTEGRATION_GOOGLE_COURSE_HOME_FAIL:
            return {
                ...state,
                isLoadingCourseHome: false,
                googleCourseHomeData: action.payload,
            };
        default:
            return state;
    }
}

export default IntegrationReducer;