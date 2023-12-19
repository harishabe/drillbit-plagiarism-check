import { takeLatest, put, call } from 'redux-saga/effects';
import * as types from '../../../action/CommonActionType';
import { MfaActivateOption, MFALoginData } from '../../../api/common/Settings/MfaAPI';
import toastrValidation from '../../../../utils/ToastrValidation';

export function* onLoadMfaActivation(action) {
    const { response, error } = yield call(MfaActivateOption, action.url);
    if (response) {
        yield put({
            type: types.FETCH_MFA_ACTIVATION_SUCCESS,
            payload: response?.data,
        });
        toastrValidation(response);
    } else {
        yield put({
            type: types.FETCH_MFA_ACTIVATION_FAIL,
            payload: error,
        });
        toastrValidation(error);
    }
}

export function* MfaActivateData() {
    yield takeLatest(types.FETCH_MFA_ACTIVATION_START, onLoadMfaActivation);
}


export function* onLoadMFALogin(action) {
    const { response, error } = yield call(MFALoginData, action.query);
    if (response) {
        yield put({ type: types.FETCH_MFA_LOGIN_SUCCESS, payload: response?.data });
    } else {
        yield put({ type: types.FETCH_MFA_LOGIN_FAIL, payload: error });
        toastrValidation(error);
    }
}

export function* MFALogin() {
    yield takeLatest(types.FETCH_MFA_LOGIN_START, onLoadMFALogin);
}
