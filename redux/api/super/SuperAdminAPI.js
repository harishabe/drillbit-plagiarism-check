import END_POINTS from '../../../utils/EndPoints';
import { BASE_URL_SUPER } from '../../../utils/BaseUrl';
import { PostMethod, GetMethod, PutMethod } from '../ApiMethod';
import { PaginationUrl } from '../../../utils/PaginationUrl';

/**
 * 
 * API CALL FOR SUPER ADMIN DASHBOARD WIDGETS
 */

export const GetWidgetData = () => {
    const url = BASE_URL_SUPER + END_POINTS.SUPER_ADMIN_DASHBOARD_WIDGET;
    return GetMethod(url);
};

/**
 * API CALL FOR GET EXTREME AND REF ACCOUNT
 */
export const GetExtremeRefDetail = async (apiUrl, paginationPayload) => {
    const url = BASE_URL_SUPER + apiUrl + '/licenses' + PaginationUrl(paginationPayload);
    return GetMethod(url);
};

/**
 * API CALL FOR CREATE EXTREME AND REF ACCOUNT
 */
export const ExtremeRefAccount = async (endPoint, data) => {
    const url = BASE_URL_SUPER + endPoint + '/license';
    return PostMethod(url, data);
};

/**
 * API CALL FOR CREATE EXTREME AND REF ACCOUNT
 */
export const EditExtremeRefAccount = async (apiUrl, data) => {
    const url = BASE_URL_SUPER + apiUrl;
    return PostMethod(url, data);
};

/**
 * API CALL FOR DROPPDOWN LIST EXTREME AND REF ACCOUNT
 */
export const DropdownListData = async () => {
    const url = BASE_URL_SUPER + END_POINTS.SUPER_ADMIN_DROPDOWN_LIST;
    return GetMethod(url);
};