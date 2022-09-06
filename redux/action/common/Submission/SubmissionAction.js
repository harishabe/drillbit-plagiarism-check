import * as types from '../../CommonActionType';

/**
 * Get Download Original File data
 */
export const DownloadOriginalFile = (data) => {
    return {
        type: types.FETCH_DOWNLOAD_ORIGINAL_FILE_START, data: data
    };
};