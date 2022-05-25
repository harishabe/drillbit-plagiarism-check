import * as types from '../../action/ActionType';

const DashboardReducer = (state = {}, action) => {
    switch (action.type) {
        case types.FETCH_ADMIN_DASH_WIDGET_START:
            return {
                ...state,
                isLoading: true,
            };
        case types.FETCH_ADMIN_DASH_WIDGET_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload
            };
        case types.FETCH_ADMIN_DASH_WIDGET_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        default:
            return state;
    }
}

export default DashboardReducer;