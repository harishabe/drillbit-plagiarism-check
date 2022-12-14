import { takeLatest, put, call } from 'redux-saga/effects';
import * as types from '../../action/ActionType';
import {
    GetWidgetData,
    GetExtremeRefDetail,
    ExtremeRefAccount,
    EditExtremeRefAccount,
    DropdownListData,
    ExtremeRefListData
} from '../../api/super/SuperAdminAPI';
import toastrValidation from '../../../utils/ToastrValidation';
import { SuperAdminPaginationValue } from '../../../utils/PaginationUrl';
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
            type: types.FETCH_SUPER_ADMIN_EXTREME_REF_START, url: action.url, paginationPayload: SuperAdminPaginationValue,
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

/**
 * Edit Extreme Ref Account
 * @param {*} action
 */

export function* onLoadEditAccount(action) {
    const { response, error } = yield call(EditExtremeRefAccount, action.url, action.query);
    if (response) {
        yield put({
            type: types.FETCH_SUPER_ADMIN_EDIT_ACCOUNT_SUCCESS, payload: response?.data,
        });
        yield put({
            type: types.FETCH_SUPER_ADMIN_EXTREME_REF_START,
            url: `/${action.url.split('/')[1]}`,
            paginationPayload: SuperAdminPaginationValue,
        });
        toastrValidation(response)
    } else {
        yield put({
            type: types.FETCH_SUPER_ADMIN_EDIT_ACCOUNT_FAIL,
            payload: error,
        });
        toastrValidation(error)
    }
}

export function* EditExtremeRef() {
    yield takeLatest(types.FETCH_SUPER_ADMIN_EDIT_ACCOUNT_START, onLoadEditAccount);
}

/**
 * Dropdownlist Extreme Ref Account
 * @param {*} action
 */
export function* onLoadDropdown(action) {
    const { response, error } = yield call(DropdownListData, action.url);
    if (response) {
        yield put({
            type: types.FETCH_SUPER_ADMIN_DROPDOWN_LIST_SUCCESS,
            payload: response?.data,
        });
    } else {
        yield put({
            type: types.FETCH_SUPER_ADMIN_DROPDOWN_LIST_FAIL,
            payload: error,
        });
        toastrValidation(error);
    }
}

export function* SuperDropdownList() {
    yield takeLatest(types.FETCH_SUPER_ADMIN_DROPDOWN_LIST_START, onLoadDropdown);
}

/**
 * Extreme & Pro (Instructor, students, users list)
 * @param {*} action
 */
export function* onLoadExtremeRefList(action) {
    const { response, error } = yield call(ExtremeRefListData, action.url, action.paginationPayload);
    if (response) {
        yield put({
            type: types.FETCH_SUPER_ADMIN_EXT_PRO_LIST_SUCCESS,
            payload: response?.data,
        });
    } else {
        yield put({
            type: types.FETCH_SUPER_ADMIN_EXT_PRO_LIST_FAIL,
            payload: error,
        });
        toastrValidation(error);
    }
}

export function* ExtremeRefListDetail() {
    yield takeLatest(types.FETCH_SUPER_ADMIN_EXT_PRO_LIST_START, onLoadExtremeRefList);
}