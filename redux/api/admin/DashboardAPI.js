import END_POINTS from '../../../utils/EndPoints';
import { GetMethod } from './../ApiMethod';

/**
 * API CALL FOR LOGIN 
 */

export const GetWidgetData = () => {
    const url = END_POINTS.ADMIN_DASHBOARD_WIDGET;
    return GetMethod(url);
};
