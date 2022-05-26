import END_POINTS from '../../../utils/EndPoints';
import { GetMethod } from './../ApiMethod';

/**
 * API CALL FOR ADMIN DASHBOARD WIDGETS
 */

export const GetWidgetData = async () => {
    const url = END_POINTS.ADMIN_DASHBOARD_WIDGET;
    return GetMethod(url);
};
