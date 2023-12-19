import * as types from '../../../action/CommonActionType';

const MfaReducer = (state = {}, action) => {
    switch (action.type) {
        case types.FETCH_MFA_ACTIVATION_START:
            return {
                ...state,
                isLoadingDocument: true,
            };
        case types.FETCH_MFA_ACTIVATION_SUCCESS:
            return {
                ...state,
                isLoadingDocument: false,
                DocumentTypeData: action.payload,
            };
        case types.FETCH_MFA_ACTIVATION_FAIL:
            return {
                ...state,
                isLoadingDocument: false,
                DocumentTypeData: action.payload,
            };
            case types.FETCH_MFA_LOGIN_START:
                return {
                    ...state,
                    isLoadingMfa: true,
                };
            case types.FETCH_MFA_LOGIN_SUCCESS:
                return {
                    ...state,
                    isLoadingMfa: false,
                    mfaData: action.payload
                };
            case types.FETCH_MFA_LOGIN_FAIL:
                return {
                    ...state,
                    isLoadingMfa: false,
                    mfaData: action.payload
                };
            default:
            return state;
    }
};

export default MfaReducer;