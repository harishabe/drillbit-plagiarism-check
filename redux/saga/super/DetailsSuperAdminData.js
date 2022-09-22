import { takeLatest, put, call } from 'redux-saga/effects';
import * as types from '../../action/ActionType';
import {
    GetWidgetData,
    ExtremeRefAccount,
    GetExtremeRefDetail
} from '../../api/super/SuperAdminAPI';
import toastrValidation from '../../../utils/ToastrValidation';
import { FolderSubmissionsPaginationValue } from '../../../utils/PaginationUrl';
import { BASE_URL_SUPER } from '../../../utils/BaseUrl';

/**
 * Get Super admin dashboard widget count details
 * No. of institutions
 * No. of user
 * No. of submissions
 * @param {*} action
 */

export function* onLoadDashboardWidget(action) {
    const { response, error } = yield call(GetWidgetData, action.url);
    if (response) {
        yield put({
            type: types.FETCH_SUPER_ADMIN_DASH_WIDGET_SUCCESS,
            payload: response?.data,
        });
    } else {
        yield put({
            type: types.FETCH_SUPER_ADMIN_DASH_WIDGET_FAIL,
            payload: error,
        });
        toastrValidation(error);
    }
}

export function* SuperDashboardWidget() {
    yield takeLatest(types.FETCH_SUPER_ADMIN_DASH_WIDGET_START, onLoadDashboardWidget);
}
/**
 * Get Extreme Ref Account
 * @param {*} action
 */

export function* onLoadExtremeRef(action) {
    const { response, error } = yield call(GetExtremeRefDetail, action.url, action.paginationPayload);
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

export function* onLoadCreateAccount(action) {
    const { response, error } = yield call(ExtremeRefAccount, action.url, action.query);
    if (response) {
        yield put({
            type: types.FETCH_SUPER_ADMIN_CREATE_ACCOUNT_SUCCESS, payload: response?.data,
        });
        yield put({
            type: types.FETCH_SUPER_ADMIN_EXTREME_REF_START, url: action.url, paginationPayload: FolderSubmissionsPaginationValue,
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
    yield takeLatest(types.FETCH_SUPER_ADMIN_CREATE_ACCOUNT_START, onLoadCreateAccount);
}