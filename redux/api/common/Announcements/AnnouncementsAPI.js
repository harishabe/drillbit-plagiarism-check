import { GetMethod, PostMethod } from "../../ApiMethod";
import { PaginationUrl } from "../../../../utils/PaginationUrl";

/**
 * API CALL FOR CREATE ANNOUNCEMENTS
 */
export const CreateAnnouncements = async ( url,data) => {
    return PostMethod(url, data);
};

export const GetAnnouncementDetail = async (apiUrl, paginationPayload) => {
    const url = apiUrl+ PaginationUrl(paginationPayload);
    return GetMethod(url);
};