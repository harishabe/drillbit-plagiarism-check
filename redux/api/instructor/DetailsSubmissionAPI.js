import END_POINTS from '../../../utils/EndPoints';
import { BASE_URL_EXTREM } from '../../../utils/BaseUrl';
import { PostMethod, PutMethod } from './../ApiMethod';

/**
 * API CALL FOR EDIT-SUBMISSION
 */

export const GetSubmissionGradingQna = async (apiUrl) => {
    const url = BASE_URL_EXTREM + END_POINTS.INSTRUCTOR_SUBMISSION_GRADING_QNA + apiUrl;
    return GetMethod(url);
}

export const EditSubmissionData = async (action) => {
    const url = BASE_URL_EXTREM + END_POINTS.INSTRUCTOR_SUBMISSION_GRADING_QNA + action.clasId + '/assignments/' + action.folder_id;
    return PutMethod(url, action.requestPayload);
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

