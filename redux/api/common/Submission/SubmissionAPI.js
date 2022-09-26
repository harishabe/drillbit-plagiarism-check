import END_POINTS from '../../../../utils/EndPoints';
import END_POINTS_PRO from '../../../../utils/EndPointPro';
import { BASE_URL_EXTREM, BASE_URL_PRO } from '../../../../utils/BaseUrl';
import { GetMethodDownloadPdf, GetMethod, DeleteMethod, GetMethodDownload } from '../../ApiMethod';
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
        const url = BASE_URL_PRO + END_POINTS_PRO.USER_SUBMISSION + data?.folderId + '/submissions/downloadOriginalFile/' + data?.paperId;
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

export const DownloadSubmissionData = async (url) => {
    return GetMethodDownload(url, 'Submission_List.csv');
};