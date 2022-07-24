import END_POINTS from '../../../utils/EndPoints';
import { BASE_URL_EXTREM } from '../../../utils/BaseUrl';
import { GetMethod } from './../ApiMethod';

/**
 * API CALL FOR INSTRUCTOR DASHBOARD WIDGETS
 */

export const GetWidgetData = () => {
    const url = BASE_URL_EXTREM + END_POINTS.INSTRUCTOR_DASHBOARD_WIDGET;
    return GetMethod(url);
};
