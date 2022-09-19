import END_POINTS from '../../../utils/EndPoints';
import { BASE_URL_EXTREM, BASE_URL_UPLOAD } from '../../../utils/BaseUrl';
import {
    PostMethod, PutMethod, GetMethod, DeleteMethod, PostFormData, GetMethodDownload, PostMethodEN,
} from './../ApiMethod';

/**
 * API CALL FOR MY FOLDER > SUBMISSION DATA
 * API CALL FOR MY CLASSES > ASSIGNMENTS > SUBMISSION
 */
export const GetSubmissionGradingQna = async (apiUrl) => {
    const url = BASE_URL_EXTREM + END_POINTS.INSTRUCTOR_SUBMISSION_GRADING_QNA + apiUrl;
    return GetMethod(url);
}

/**
 * API CALL FOR MY FOLDER > SUBMISSION DATA > UPLOAD FILE
 * API CALL FOR MY CLASSES > ASSIGNMENTS > SUBMISSION > UPLOAD FILE
 */

export const UploadSubmission = async (apiUrl, data) => {
    const url = BASE_URL_UPLOAD + END_POINTS.INSTRUCTOR_SUBMISSION_UPLOAD + apiUrl;
    if (apiUrl.includes('confirmZipFile')) {
        return PostMethodEN(url, data);
    } else {
        return PostFormData(url, data);
    }
};

/**
 * API CALL FOR MY FOLDER > SUBMISSION DATA > DELETE
 * API CALL FOR MY CLASSES > ASSIGNMENTS > DELETE
 */

export const DeleteSubmission = async (apiUrl) => {
    const url = BASE_URL_EXTREM + END_POINTS.INSTRUCTOR_SUBMISSION_GRADING_QNA + apiUrl;
    return DeleteMethod(url);
};

/**
 * API CALL FOR EDIT-SUBMISSION
 */
export const EditSubmissionData = async (action) => {
    const url = BASE_URL_EXTREM + END_POINTS.INSTRUCTOR_SUBMISSION_GRADING_QNA + action.clasId + '/assignments/' + action.folder_id;
    return PutMethod(url, action.requestPayload);
};

/**
 * API CALL FOR DOWNLOAD CSV
 */

export const DownloadSubmissionData = async (url) => {
    return GetMethodDownload(url, 'Submission_List.csv');
};

/**
 * API CALL FOR SAVE TO REPOSITARY
 */

export const SaveToRepoSubmission = async (clasId, folder_id, paper_id, data) => {
    const url = BASE_URL_EXTREM + END_POINTS.INSTRUCTOR_SUBMISSION_GRADING_QNA + clasId + '/assignments/' + folder_id + '/repository?paperId=' + paper_id;
    return PostMethod(url, data);
};

/**
 * API CALL FOR INSTRUCTOR FEEDBACK
 */

export const InstructorFeedbackData = async (clasId, folder_id, paper_id, data) => {
    const url = BASE_URL_EXTREM + END_POINTS.INSTRUCTOR_SUBMISSION_GRADING_QNA + clasId + '/assignments/' + folder_id + '/submissions/' + paper_id + '/feedback';
    return PostMethod(url, data);
};

