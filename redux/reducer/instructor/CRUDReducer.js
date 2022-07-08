import * as types from '../../action/ActionType';

const CRUDReducer = (state = {}, action) => {
    switch (action.type) {
        case types.FETCH_INSTRUCTOR_EDIT_CLASS_DATA_START:
            return {
                ...state,
                isLoading: true,
            };
        case types.FETCH_INSTRUCTOR_EDIT_CLASS_DATA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            };
        case types.FETCH_INSTRUCTOR_EDIT_CLASS_DATA_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export default CRUDReducer;