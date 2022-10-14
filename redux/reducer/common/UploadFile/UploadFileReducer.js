import * as types from '../../../action/UploadFileActionType';

const UploadFileReducer = (state = {}, action) => {
    switch (action.type) {
        case types.FETCH_LANGUAGE_LIST_START:
            return {
                ...state,
                isLoadingLang: true,
            };
        case types.FETCH_LANGUAGE_LIST_SUCCESS:
            return {
                ...state,
                isLoadingLang: false,
                nonEnglishLang: action.payload,
            };
        case types.FETCH_LANGUAGE_LIST_FAIL:
            return {
                ...state,
                isLoadingLang: false,
                nonEnglishLang: action.payload,
            };
        case types.FETCH_UPLOAD_GOOGLE_DRIVE_START:
            return {
                ...state,
                isLoadingFileDrive: true,
            };
        case types.FETCH_UPLOAD_GOOGLE_DRIVE_SUCCESS:
            return {
                ...state,
                isLoadingFileDrive: false,
                uploadFileDrive: action.payload,
            };
        case types.FETCH_UPLOAD_GOOGLE_DRIVE_FAIL:
            return {
                ...state,
                isLoadingFileDrive: false,
                uploadFileDrive: action.payload,
            };
        case types.FETCH_UPLOAD_FILE_NON_ENGLISH_START:
            return {
                ...state,
                isLoadingNonEng: true,
            };
        case types.FETCH_UPLOAD_FILE_NON_ENGLISH_SUCCESS:
            return {
                ...state,
                isLoadingNonEng: false,
                uploadFileNonEng: action.payload,
            };
        case types.FETCH_UPLOAD_FILE_NON_ENGLISH_FAIL:
            return {
                ...state,
                isLoadingNonEng: false,
                uploadFileNonEng: action.payload,
            };
        case types.FETCH_UPLOAD_FILE_NON_ENGLISH_DATA_CLEAR:
            return {
                ...state,
                uploadFileNonEng: '',
            };
        case types.FETCH_REPO_UPLOAD_FILE_DRIVE_AND_ZIP_START:
            return {
                ...state,
                isLoadingRepoUpload: true,
            };
        case types.FETCH_REPO_UPLOAD_FILE_DRIVE_AND_ZIP_SUCCESS:
            return {
                ...state,
                isLoadingRepoUpload: false,
                uploadFileRepo: action.payload,
            };
        case types.FETCH_REPO_UPLOAD_FILE_DRIVE_AND_ZIP_FAIL:
            return {
                ...state,
                isLoadingRepoUpload: false,
                uploadFileRepo: action.payload,
            };
        case types.FETCH_GDRIVE_UPLOAD_DATA_CLEAR:
            return {
                ...state,
                uploadFileDrive: '',
            };
        default:
            return state;
    }
};

export default UploadFileReducer;