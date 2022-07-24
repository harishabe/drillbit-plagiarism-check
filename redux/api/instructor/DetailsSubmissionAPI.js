import END_POINTS from '../../../utils/EndPoints';
import { BASE_URL_EXTREM } from '../../../utils/BaseUrl';
import { GetMethod } from './../ApiMethod';

/**
 * API CALL FOR SUBMISSION-GRADING-QNA
 */

export const GetSubmissionGradingQna = async (apiUrl) => {
    const url = BASE_URL_EXTREM + END_POINTS.INSTRUCTOR_SUBMISSION_GRADING_QNA + apiUrl;
    return GetMethod(url);
};
