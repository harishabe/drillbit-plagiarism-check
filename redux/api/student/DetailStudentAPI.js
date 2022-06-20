import END_POINTS from '../../../utils/EndPoints';
import { GetMethod } from '../ApiMethod';
import { PaginationUrl } from '../../../utils/PaginationUrl';

/**
 * API CALL FOR CLASSES DATA
 */

export const GetClassesDetail = async (paginationPayload) => {
    const url = END_POINTS.STUDENT_MY_CLASSES + PaginationUrl(paginationPayload);
    return GetMethod(url);
};

/**
 * API CALL FOR ASSIGNMENT DATA
 */

export const GetAssignmentDetail = async (paginationPayload) => {
    const url = END_POINTS.STUDENT_MY_ASSIGNMENTS + PaginationUrl(paginationPayload);
    return GetMethod(url);
};

/**
 * API CALL FOR SUBMISSION DATA
 */

export const GetSubmissionDetail = async () => {
    const url = END_POINTS.STUDENT_MY_ASSIGNMENTS_SUBMISSION;
    return GetMethod(url);
};