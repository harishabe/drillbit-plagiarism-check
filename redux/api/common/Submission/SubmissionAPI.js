import END_POINTS from '../../../../utils/EndPoints';
import END_POINTS_PRO from '../../../../utils/EndPointPro';
import { BASE_URL_EXTREM, BASE_URL_PRO, BASE_URL } from '../../../../utils/BaseUrl';
import { SIMILARITY_BULK_REPORT_TITLE } from '../../../../constant/data/Constant';

import { GetMethodDownloadPdf, GetMethod, DeleteMethod, GetMethodDownload, PostMethod, GetDownloadPdfNewWindow, PostMethodDownloadPdf } from '../../ApiMethod';
import { PaginationUrl } from '../../../../utils/PaginationUrl';

/**
 * API CALL FOR DOWNLOAD ORIGINAL FILE
 */

export const DownloadOriginalFileData = async (data) => {
    if (data?.path === 'studentSubmission') {
        const url = BASE_URL_EXTREM + END_POINTS.STUDENT_MY_CLASSES + '/' + data?.clasId + '/assignments/' + data?.assId + '/downloadOriginalFile/' + data?.paperId;
        return GetMethodDownloadPdf(url, data?.name);
    } else if (data?.path === 'folderSubmission') {
        const url = BASE_URL_EXTREM + END_POINTS.INSTRUCTOR_SUBMISSION_LIST_ORIGINAL_LIST_DOWNLOAD + 'myFolder/' + data?.folderId + '/downloadOriginalFile/' + data?.paperId;
        return GetMethodDownloadPdf(url, data?.name);
    } else if (data?.path === 'assignmentSubmission') {
        const url = BASE_URL_EXTREM + END_POINTS.INSTRUCTOR_SUBMISSION_LIST_ORIGINAL_LIST_DOWNLOAD + 'classes/' + data?.clasId + '/assignments/' + data?.assId + '/downloadOriginalFile/' + data?.paperId;
        return GetMethodDownloadPdf(url, data?.name);
    } else if (data?.path === 'proFolderSubmission') {
        const url = BASE_URL_PRO + END_POINTS_PRO.USER_SUBMISSION + data?.folderId + '/downloadOriginalFile/' + data?.paperId;
        return GetMethodDownloadPdf(url, data?.name);
    }
};

/**
 * API CALL FOR MY FOLDER > FOLDER SUBMISSION > SUBMISSION DATA
 */
export const GetFolderSubmission = async (apiUrl, paginationPayload) => {
    const url = apiUrl + PaginationUrl(paginationPayload);
    return GetMethod(url);
}

/**
 * API CALL FOR MY FOLDER > SUBMISSION DATA > DELETE
 */

export const DeletefolderSubmission = async (url) => {
    return DeleteMethod(url);
};

/**
 * API CALL FOR DOWNLOAD CSV
 */

export const DownloadSubmissionData = async (url, title) => {
    return GetMethodDownload(url, title + '.csv');
};


/**
 * API CALL FOR GRAMMAR REPORT
 */

export const DownloadGrammarReportData = async (url) => {
    return GetDownloadPdfNewWindow(url);
}

/**
 * SAVE TO REPOSITORY
 */
export const SaveToRepoBulkData = async (url) => {
    return PostMethod(url);
};

/**
 * SUBMISSION HISTORY
 */
export const SubmissionHistoryData = async (apiUrl, paginationPayload) => {
    const url = apiUrl + PaginationUrl(paginationPayload);
    return GetMethod(url);
};

/**
 * SUBMISSION BULK REPORT DOWNLOAD
 */
export const SubmissionBulkReportDownload = async (url, requestPayload) => {
    return PostMethodDownloadPdf(url, requestPayload, SIMILARITY_BULK_REPORT_TITLE);
};

/**
 * SUBMISSION SINGLE REPORT DOWNLOAD
 */
export const SubmissionSingleReportDownload = async (url, data) => {
    return GetMethodDownloadPdf(url, data?.original_fn.replace(/\.[^/.]+$/, "") + ".pdf");
};

/**
 * SUBMISSION REPROCESS
 */
export const SubmissionReprocess = async (data) => {
    let url = BASE_URL + END_POINTS.SUBMISSION_REPROCESS + data
    return GetMethod(url);
};