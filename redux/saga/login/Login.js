import { takeLatest, put, call } from 'redux-saga/effects';
import * as types from '../../action/ActionType';
import {
    login
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
