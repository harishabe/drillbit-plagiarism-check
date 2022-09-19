import * as types from '../../CommonActionType';

/**
 * Get Download Original File data
 */
export const DownloadOriginalFile = (data) => {
    return {
        type: types.FETCH_DOWNLOAD_ORIGINAL_FILE_START, data: data
    };
};

/**
 * Get myfolder > folderSubmission > submissionList
 */
export const folderSubmissionsFileData = (url, paginationPayload) => {
    return {
        type: types.FETCH_FOLDER_SUBMISSION_LIST_START, url: url, paginationPayload: paginationPayload
    };
};

/**
 * Get myfolder > submissionList > delete
 */
export const DeletefolderSubmissionData = (url) => {
    return {
        type: types.FETCH_FOLDER_SUBMISSION_LIST_DELETE_START, url: url
    };
};