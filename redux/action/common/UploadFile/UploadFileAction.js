import * as types from '../../UploadFileActionType';

/**
 * Language list
 */
export const LanguageList = () => {
    return {
        type: types.FETCH_LANGUAGE_LIST_START
    };
};

/**
 * Upload google drive
 */
export const UploadFileDrive = (classId, assId, data) => {
    return {
        type: types.FETCH_UPLOAD_GOOGLE_DRIVE_START, classId: classId, assId: assId, query: data
    };
};

/**
 * Upload Non English
 */
 export const UploadNonEnglish = (classId, assId, data) => {
    return {
        type: types.FETCH_UPLOAD_FILE_NON_ENGLISH_START, classId: classId, assId: assId, query: data
    };
};

/**
 * Upload Non English
 */
export const RepositoryUpload = (url, data) => {
    return {
        type: types.FETCH_REPO_UPLOAD_FILE_DRIVE_AND_ZIP_START, url: url, query: data
    };
};

/**
 * Gdrive file clear uploaded data
 */
 export const UploadGdriveFileDataClear = () => {
    return {
        type: types.FETCH_GDRIVE_UPLOAD_DATA_CLEAR
    };
};
