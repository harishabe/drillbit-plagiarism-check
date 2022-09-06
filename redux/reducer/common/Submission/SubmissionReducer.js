import * as types from '../../../action/CommonActionType';

const SubmissionReducer = (state = {}, action) => {
    switch (action.type) {
        case types.FETCH_DOWNLOAD_ORIGINAL_FILE_START:
            return {
                ...state,
                isLoadingDownloadFile: true,
            };
        case types.FETCH_DOWNLOAD_ORIGINAL_FILE_SUCCESS:
            return {
                ...state,
                isLoadingDownloadFile: false,
                downloadFileData: action.payload,
            };
        case types.FETCH_DOWNLOAD_ORIGINAL_FILE_FAIL:
            return {
                ...state,
                isLoadingDownloadFile: false,
                downloadFileError: action.payload,
            };
        default:
            return state;
    }
};

export default SubmissionReducer;