import END_POINTS from '../../../utils/EndPoints';
import { BASE_URL_EXTREM } from '../../../utils/BaseUrl';
import { GetMethod } from './../ApiMethod';

/**
 * API CALL FOR ADMIN DASHBOARD WIDGETS
 */

export const GetWidgetData = async () => {
    const url = BASE_URL_EXTREM + END_POINTS.ADMIN_DASHBOARD_WIDGET;
    return GetMethod(url);
};

export const GetTopStudnet = async () => {
    const url = BASE_URL_EXTREM + END_POINTS.ADMIN_TOP_STUDENT;
    return GetMethod(url);
};

export const GetTrendAnalysis = async () => {
    const url = BASE_URL_EXTREM + END_POINTS.ADMIN_TREND_ANALYSIS;
    return GetMethod(url);
};


