import * as types from '../../action/ActionType';

const SuperReducer = (state = {}, action) => {
    switch (action.type) {
        case types.FETCH_SUPER_ADMIN_CREATE_ACCOUNT_START:
            return {
                ...state,
                isLoadingCreate: true,
            };
        case types.FETCH_SUPER_ADMIN_CREATE_ACCOUNT_SUCCESS:
            return {
                ...state,
                isLoadingCreate: false,
                createdSuccess: action.payload,
            };
        case types.FETCH_SUPER_ADMIN_CREATE_ACCOUNT_FAIL:
            return {
                ...state,
                isLoadingCreate: false,
                createdError: action.payload,
            };
        default:
            return state;
    }
};

export default SuperReducer;
