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
