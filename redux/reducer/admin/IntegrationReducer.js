import * as types from '../../action/ActionType';

const IntegrationReducer = (state = {}, action) => {
    switch (action.type) {
        case types.FETCH_ADMIN_INTEGRATION_DETAILS_START:
            return {
                ...state,
                isLoading: true,
            };
        case types.FETCH_ADMIN_INTEGRATION_DETAILS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                integrationData: action.payload,
            };
        case types.FETCH_ADMIN_INTEGRATION_DETAILS_FAIL:
            return {
                ...state,
                isLoading: false,
                integrationDataError: action.payload,
            };
        default:
            return state;
    }
}

export default IntegrationReducer;