import END_POINTS from '../../../utils/EndPoints';
import { BASE_URL_EXTREM } from '../../../utils/BaseUrl';
import { GetMethod } from './../ApiMethod';

/**
 * API CALL FOR INSTRUCTOR DASHBOARD WIDGETS
 */

export const GetWidgetData = (url) => {
    return GetMethod(url);
};

export const GetTopStudentData = async () => {
    const url = BASE_URL_EXTREM + END_POINTS.INSTRUCTOR_TOP_STUDENT;
    return GetMethod(url);
};