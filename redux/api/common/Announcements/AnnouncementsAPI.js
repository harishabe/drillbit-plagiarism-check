import { GetMethod, PostMethod } from "../../ApiMethod";
import { PaginationUrl } from "../../../../utils/PaginationUrl";

/**
 * API CALL FOR CREATE ANNOUNCEMENTS
 */
export const CreateAnnouncements = async ( url,data) => {
    return PostMethod(url, data);
};
/**
 * API CALL FOR GET ANNOUNCEMENTS
 */
export const GetAnnouncementDetail = async (apiUrl, paginationPayload) => {
    const url = apiUrl+ PaginationUrl(paginationPayload);
    return GetMethod(url);
};
/**
 * API CALL FOR GET MY ANNOUNCEMENTS
 */
export const GetMyAnnouncementDetail = async (apiUrl, paginationPayload) => {
    const url = apiUrl+ PaginationUrl(paginationPayload);
    return GetMethod(url);
};