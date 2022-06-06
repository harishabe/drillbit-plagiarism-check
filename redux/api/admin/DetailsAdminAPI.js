import END_POINTS from '../../../utils/EndPoints';
import { GetMethod } from './../ApiMethod';
import { PaginationUrl } from '../../../utils/PaginationUrl';

/**
 * API CALL FOR INSTRUCTOR DATA
 */

export const GetInstructorDetail = async (paginationPayload) => {
    const url = END_POINTS.ADMIN_INSTRUCTOR + PaginationUrl(paginationPayload);
    return GetMethod(url);
};

/**
 * API CALL FOR STUDENT DATA
 */

export const GetStudentDetail = async (paginationPayload) => {
    const url = END_POINTS.ADMIN_STUDENT + PaginationUrl(paginationPayload);
    return GetMethod(url);
};

/**
 * API CALL FOR REPORTS
 */

export const GetReports = async () => {
    const url = END_POINTS.ADMIN_REPORTS;
    return GetMethod(url);
};