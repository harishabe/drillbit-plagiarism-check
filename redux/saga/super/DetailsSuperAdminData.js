import { takeLatest, put, call } from 'redux-saga/effects';
import * as types from '../../action/ActionType';
import {
    GetWidgetData,
    GetExtremeRefDetail,
    ExtremeRefAccount,
    EditExtremeRefAccount,
    DropdownListData,
    ExtremeInstructorListData,
    ExtremeStudentListData,
    SuperEditStudentData,
    MakeHimAdminData
} from '../../api/super/SuperAdminAPI';
import toastrValidation from '../../../utils/ToastrValidation';
import { SuperAdminPaginationValue, PaginationValue } from '../../../utils/PaginationUrl';
import { BASE_URL_SUPER } from '../../../utils/BaseUrl';
import END_POINTS_PRO from '../../../utils/EndPointPro';
import END_POINTS from '../../../utils/EndPoints';

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
 * Extreme (Instructor list)
 * @param {*} action
 */
export function* onLoadExtremeInsList(action) {
    const { response, error } = yield call(ExtremeInstructorListData, action.url, action.paginationPayload);
    if (response) {
        yield put({
            type: types.FETCH_SUPER_ADMIN_EXT_INSTRUCTOR_LIST_SUCCESS,
            payload: response?.data,
        });
    } else {
        yield put({
            type: types.FETCH_SUPER_ADMIN_EXT_INSTRUCTOR_LIST_FAIL,
            payload: error,
        });
        toastrValidation(error);
    }
}

export function* ExtremeInsListDetail() {
    yield takeLatest(types.FETCH_SUPER_ADMIN_EXT_INSTRUCTOR_LIST_START, onLoadExtremeInsList);
}

/**
 * Extreme (students list)
 * @param {*} action
 */
export function* onLoadExtremeStuList(action) {
    const { response, error } = yield call(ExtremeStudentListData, action.url, action.paginationPayload);
    if (response) {
        yield put({
            type: types.FETCH_SUPER_ADMIN_EXT_STUDENT_LIST_SUCCESS,
            payload: response?.data,
        });
    } else {
        yield put({
            type: types.FETCH_SUPER_ADMIN_EXT_STUDENT_LIST_FAIL,
            payload: error,
        });
        toastrValidation(error);
    }
}

export function* ExtremeStuListDetail() {
    yield takeLatest(types.FETCH_SUPER_ADMIN_EXT_STUDENT_LIST_START, onLoadExtremeStuList);
}

/**
 * Edit Student
 * @param {*} action
 */

export function* onLoadEditStudent(action) {
    const { response, error } = yield call(SuperEditStudentData, action.url, action.query);
    if (response) {
        yield put({
            type: types.FETCH_SUPER_ADMIN_EXT_EDIT_STUDENT_SUCCESS, payload: response?.data,
        });
        yield put({
            type: types.FETCH_SUPER_ADMIN_EXT_STUDENT_LIST_START,
            url: `/extreme/license/${action.url.split('/')[6]}/students`,
            paginationPayload: SuperAdminPaginationValue,
        });
        toastrValidation(response)
    } else {
        yield put({
            type: types.FETCH_SUPER_ADMIN_EXT_EDIT_STUDENT_FAIL,
            payload: error,
        });
        toastrValidation(error)
    }
}

export function* EditStudentData() {
    yield takeLatest(types.FETCH_SUPER_ADMIN_EXT_EDIT_STUDENT_START, onLoadEditStudent);
}

/**
 * Make him admin (extreme > instructor , pro > user)
 * @param {*} action
 */

export function* onLoadMakeHimAdmin(action) {
    console.log('action', action)
    const { response, error } = yield call(MakeHimAdminData, action.url, action.paginationPayload);
    if (response) {
        yield put({
            type: types.FETCH_SUPER_ADMIN_MAKE_HIM_ADMIN_SUCCESS, payload: response?.data,
        });
        if (action.url.split('/')[4] === 'pro') {
            yield put({
                type: types.FETCH_ADMIN_INSTRUCTOR_DATA_START,
                url: BASE_URL_SUPER + END_POINTS_PRO.SUPER_ADMIN_USER + `${action.url.split('/')[6]}/users`,
                paginationPayload: PaginationValue
            });
        } else if (action.url.split('/')[4] === 'extreme') {
            yield put({
                type: types.FETCH_SUPER_ADMIN_EXT_INSTRUCTOR_LIST_START,
                url: END_POINTS.SUPER_ADMIN_INSTRUCTOR + `${action.url.split('/')[6]}/instructors`,
                paginationPayload: PaginationValue
            });
        }
        toastrValidation(response)
    } else {
        yield put({
            type: types.FETCH_SUPER_ADMIN_MAKE_HIM_ADMIN_FAIL,
            payload: error,
        });
        toastrValidation(error)
    }
}

export function* MakeHimAdminDetail() {
    yield takeLatest(types.FETCH_SUPER_ADMIN_MAKE_HIM_ADMIN_START, onLoadMakeHimAdmin);
}