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
    RemoveRepositaryData,
    GlobalSearchData
} from '../../api/super/SuperAdminAPI';
import toastrValidation from '../../../utils/ToastrValidation';
import { SuperAdminPaginationValue, FolderSubmissionsPaginationValue } from '../../../utils/PaginationUrl';
import { BASE_URL_SUPER } from '../../../utils/BaseUrl';
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
            url: END_POINTS.SUPER_ADMIN_INSTRUCTOR + `${action.url.split('/')[6]}/students`,
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
 * Remove Repository
 * @param {*} action
 */

export function* onLoadRemoveRepository(action) {
    const { response, error } = yield call(RemoveRepositaryData, action.url);
    if (response) {
        yield put({
            type: types.FETCH_SUPER_ADMIN_REMOVE_REPOSITORY_SUCCESS, payload: response?.data,
        });
        yield put({
            type: types.FETCH_ADMIN_REPOSITARY_DETAILS_START,
            url: BASE_URL_SUPER + END_POINTS.SUPER_ADMIN_REPOSITORY + `${action.url.split('/')[6]}/repository`,
            paginationPayload: FolderSubmissionsPaginationValue,
        });
        toastrValidation(response)
    } else {
        yield put({
            type: types.FETCH_SUPER_ADMIN_REMOVE_REPOSITORY_FAIL,
            payload: error,
        });
        toastrValidation(error)
    }
}

export function* RemoveRepositoryData() {
    yield takeLatest(types.FETCH_SUPER_ADMIN_REMOVE_REPOSITORY_START, onLoadRemoveRepository);
}

/**
 * Global search super admin
 * @param {*} action
 */

export function* onLoadGlobalSearch(action) {
    const { response, error } = yield call(GlobalSearchData, action.url);
    if (response) {
        yield put({
            type: types.FETCH_SUPER_ADMIN_GLOBAL_SEARCH_SUCCESS,
            payload: response?.data,
        });
    } else {
        yield put({
            type: types.FETCH_SUPER_ADMIN_GLOBAL_SEARCH_FAIL,
            payload: error,
        });
        toastrValidation(error)
    }
}

export function* GlobalSearchDetail() {
    yield takeLatest(types.FETCH_SUPER_ADMIN_GLOBAL_SEARCH_START, onLoadGlobalSearch);
}