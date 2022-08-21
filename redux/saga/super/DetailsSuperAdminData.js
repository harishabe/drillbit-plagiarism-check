import { takeLatest, put, call } from 'redux-saga/effects';
import * as types from '../../action/ActionType';
import {
    ExtremeRefAccount,
    GetExtremeRefDetail
} from '../../api/super/SuperAdminAPI';
import toastrValidation from '../../../utils/ToastrValidation';

/**
 * Get Extreme Ref Account
 * @param {*} action
 */

export function* onLoadExtremeRef(action) {
    const { response, error } = yield call(GetExtremeRefDetail, action.url);
    if (response) {
        yield put({
            type: types.FETCH_SUPER_ADMIN_EXTREME_REF_SUCCESS,
            payload: response?.data,
        });
        toastrValidation(response)
    } else {
        yield put({
            type: types.FETCH_SUPER_ADMIN_EXTREME_REF_FAIL,
            payload: error,
        });
        toastrValidation(error)
    }
}

export function* GetExtremeRef() {
    yield takeLatest(types.FETCH_SUPER_ADMIN_EXTREME_REF_START, onLoadExtremeRef);
}

/**
 * Create Extreme Ref Account
 * @param {*} action
 */

export function* onLoadCreate(action) {
    const { response, error } = yield call(ExtremeRefAccount, action.url, action.query);
    if (response) {
        yield put({
            type: types.FETCH_SUPER_ADMIN_CREATE_ACCOUNT_SUCCESS,
            payload: response?.data,
        });
        toastrValidation(response)
    } else {
        yield put({
            type: types.FETCH_SUPER_ADMIN_CREATE_ACCOUNT_FAIL,
            payload: error,
        });
        toastrValidation(error)
    }
}

export function* CreateExtremeRefAccount() {
    yield takeLatest(types.FETCH_SUPER_ADMIN_CREATE_ACCOUNT_START, onLoadCreate);
}