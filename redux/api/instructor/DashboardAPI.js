import END_POINTS from '../../../utils/EndPoints';
import { GetMethod } from './../ApiMethod';

/**
 * API CALL FOR INSTRUCTOR DASHBOARD WIDGETS
 */

export const GetWidgetData = () => {
    const url = END_POINTS.INSTRUCTOR_DASHBOARD_WIDGET;
    return GetMethod(url);
};
