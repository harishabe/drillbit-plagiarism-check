import { takeLatest, put, call } from 'redux-saga/effects';
import * as types from '../../action/ActionType';
import {
    login,
    forgetPassword
} from '../../api/LoginAPI';
import toastrValidation from '../../../utils/ToastrValidation';

/**
 * User Login
 * @param {*} action
 */

export function* onLoadLogin(action) {
    const { response, error } = yield call(login, action.query);
    if (response) {
        yield put({ type: types.FETCH_LOGIN_SUCCESS, payload: response?.data });
    } else {
        yield put({ type: types.FETCH_LOGIN_FAIL, payload: error });
        toastrValidation(error);
    }
}

export function* userLogin() {
    yield takeLatest(types.FETCH_LOGIN_START, onLoadLogin);
}

/**
 * User Login
 * @param {*} action
 */

export function* onLoadforgetPassword(action) {
    const { response, error } = yield call(forgetPassword, action.query);
    if (response) {
        yield put({ type: types.FETCH_FORGET_PASSWORD_SUCCESS, payload: response?.data });
        toastrValidation(response);
    } else {
        yield put({ type: types.FETCH_FORGET_PASSWORD_FAIL, payload: error });
        toastrValidation(error);
    }
}

export function* userForgetPassword() {
    yield takeLatest(types.FETCH_FORGET_PASSWORD_START, onLoadforgetPassword);
}
