import END_POINTS from '../../../utils/EndPoints';
import { BASE_URL_SUPER } from '../../../utils/BaseUrl';
import { PostMethod, GetMethod, PutMethod, DeleteMethod } from '../ApiMethod';
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
 * API CALL FOR DELETE EXTREME AND REF ACCOUNT
 */
export const ExtremeRefDeleteAccount = async (licenseId, role) => {
    const url = BASE_URL_SUPER + END_POINTS.SUPER_ADMIN_DELETE_ACCOUNT + licenseId;
    return DeleteMethod(url);
};

/**
 * API CALL FOR CREATE EXTREME AND REF ACCOUNT
 */
export const EditExtremeRefAccount = async (apiUrl, data) => {
    const url = BASE_URL_SUPER + apiUrl;
    return PutMethod(url, data);
};

/**
 * API CALL FOR DROPPDOWN LIST EXTREME AND REF ACCOUNT
 */
export const DropdownListData = async (url) => {
    // const url = BASE_URL_SUPER + END_POINTS.SUPER_ADMIN_DROPDOWN_LIST;
    return GetMethod(url);
};

/**
 * API CALL FOLDER PATH LIST
 */
export const FolderPathListData = async () => {
    let url = BASE_URL_SUPER + END_POINTS.SUPER_ADMIN_FOLDER_PATH_LIST
    return GetMethod(url);
};

/**
 * API CALL EXTREME (INSTRUCTOR LISTS)
 */
export const ExtremeInstructorListData = async (apiUrl, paginationPayload) => {
    const url = BASE_URL_SUPER + apiUrl + PaginationUrl(paginationPayload);
    return GetMethod(url);
};

/**
 * API CALL EXTREME (STUDENT LISTS)
 */
export const ExtremeStudentListData = async (apiUrl, paginationPayload) => {
    const url = BASE_URL_SUPER + apiUrl + PaginationUrl(paginationPayload);
    return GetMethod(url);
};

/**
 * API CALL CREATE STUDENT
 */
export const SuperCreateStudentData = async (url, data) => {
    return PostMethod(url, data);
};

/**
 * API CALL EDIT STUDENT
 */
export const SuperEditStudentData = async (url, data) => {
    return PutMethod(url, data);
};

/**
 * API CALL FOR GLOBAL SEARCH SUPER ADMIN
 */
export const GlobalSearchData = async (url) => {
    return GetMethod(url);
}

 * API CALL MAKE HIM ADMIN
 */
export const MakeHimAdminData = async (apiUrl, paginationPayload) => {
    const url = apiUrl + PaginationUrl(paginationPayload);
    return PutMethod(url);
};