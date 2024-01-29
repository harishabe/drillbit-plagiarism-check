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
/**
 * Get mY announcement data
 */
export const GetMyAnnouncementsData = (url, paginationPayload) => {
    return {
        type: types.FETCH_MY_ANNOUNCEMENT_DATA_START,url: url, paginationPayload: paginationPayload,
    };
};
