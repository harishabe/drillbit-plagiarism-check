import END_POINTS from '../../../utils/EndPoints';
import { GetMethod, PostMethod, PutMethod, DeleteMethod, GetMethodDownload } from './../ApiMethod';
import { PaginationUrl } from '../../../utils/PaginationUrl';
/**
 * API CALL FOR SUBMISSION-GRADING-QNA
 */

export const GetSubmissionGradingQna = async (apiUrl) => {
    const url = END_POINTS.INSTRUCTOR_SUBMISSION_GRADING_QNA + apiUrl;
    return GetMethod(url);
};
