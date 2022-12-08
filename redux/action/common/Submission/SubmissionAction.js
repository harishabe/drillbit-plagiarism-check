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
 * Download CSV
 */
export const DownloadCsv = (url, title) => {
    return {
        type: types.FETCH_DOWNLOAD_CSV_START, url: url, title: title
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

/**
 * Get myfolder > submissionList > grammar download
 */
export const GetGrammarReport = (url) => {
    return {
        type: types.FETCH_GRAMMAR_REPORT_START, url: url
    }
}

/**
 * submission > savetorepo 
 */
export const SaveToRepoBulk = (url) => {
    return {
        type: types.FETCH_SAVE_TO_REPOSITORY_START, url: url
    };
};

/**
 * submission > submission history 
 */
export const SubmissionHistory = (url, paginationPayload) => {
    return {
        type: types.FETCH_SUBMISSION_HISTORY_START, url: url, paginationPayload: paginationPayload
    };
};