import END_POINTS from '../../../utils/EndPoints';
import { GetMethod } from './../ApiMethod';

/**
 * API CALL FOR INSTRUCTOR DATA
 */

export const GetInstructorDetail = async () => {
    const url = END_POINTS.ADMIN_INSTRUCTOR;
    return GetMethod(url);
};

/**
 * API CALL FOR STUDENT DATA
 */

export const GetStudentDetail = async () => {
    const url = END_POINTS.ADMIN_STUDENT;
    return GetMethod(url);
};

/**
 * API CALL FOR REPORTS
 */

export const GetReports = async () => {
    const url = END_POINTS.ADMIN_REPORTS;
    return GetMethod(url);
};