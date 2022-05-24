import { takeLatest, all, put, fork, call, select } from 'redux-saga/effects';
import * as types from '../action/ActionType';
import {
    login
} from '../api/index';

/**
 * User Login
 * @param {*} action 
 */

export function* onLoadLogin(action) {
    try {
        const response = yield call(login, action.query);
        yield put({ type: types.FETCH_LOGIN_SUCCESS, payload: response });
    } catch (error) {
        yield put({ type: types.FETCH_LOGIN_FAIL, payload: error });
    }
}

export function* userLogin() {
    yield takeLatest(types.FETCH_LOGIN_START, onLoadLogin);
}

const saga = [
    fork(userLogin),
]

export default function* rootSaga() {
    yield all([...saga]);
}