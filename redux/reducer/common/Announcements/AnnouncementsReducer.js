import * as types from '../../../action/CommonActionType';

const AnnouncementsReducer = (state = {}, action) => {
    switch (action.type) {
        case types.FETCH_CREATE_ANNOUNCEMENTS_START:
            return {
                ...state,
                isLoading: true,
            };
        case types.FETCH_CREATE_ANNOUNCEMENTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                announcementsCreateData: action.payload,
            };
        case types.FETCH_CREATE_ANNOUNCEMENTS_FAIL:
            return {
                ...state,
                isLoading: false,
                announcementsCreateData: action.payload,
            };
            case types.FETCH_ANNOUNCEMENT_DATA_START:
            return {
                ...state,
                isLoadingGet: true,
            };
        case types.FETCH_ANNOUNCEMENT_DATA_SUCCESS:
            return {
                ...state,
                isLoadingGet: false,
                announcementsData: action.payload,
            };
        case types.FETCH_ANNOUNCEMENT_DATA_FAIL:
            return {
                ...state,
                isLoadingGet: false,
                announcementsDataError: action.payload,
            };
            
            default:
            return state;
    }
};

export default AnnouncementsReducer;