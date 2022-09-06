import END_POINTS from '../../../../utils/EndPoints';
import { BASE_URL_EXTREM } from '../../../../utils/BaseUrl';
import { GetMethodDownloadPdf } from '../../ApiMethod';

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
    }
};