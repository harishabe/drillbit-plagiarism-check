import * as types from '../../CommonActionType';

/**
 * Create announcements
 */
export const AnnouncementsField = (url,data) => {
    return {
        type: types.FETCH_CREATE_ANNOUNCEMENTS_START,url:url, query: data
    };
};

/**
 * Get announcement data
 */
export const GetAnnouncementsData = (url, paginationPayload) => {
    return {
        type: types.FETCH_ANNOUNCEMENT_DATA_START,url: url, paginationPayload: paginationPayload,
    };
};
