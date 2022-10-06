import * as types from '../../../action/UploadFileActionType';

const UploadFileReducer = (state = {}, action) => {
    switch (action.type) {
        case types.FETCH_LANGUAGE_LIST_START:
            return {
                ...state,
                isLoading: true,
            };
        case types.FETCH_LANGUAGE_LIST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            };
        case types.FETCH_LANGUAGE_LIST_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default UploadFileReducer;