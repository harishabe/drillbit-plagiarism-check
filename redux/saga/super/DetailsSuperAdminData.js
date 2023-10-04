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
    GlobalSearchData,
    SuperCreateStudentData,
    SuperEditStudentData,
    ExtremeRefDeleteAccount,
    FolderPathListData,
    MakeHimAdminData,
    ResendCredentialsData
} from '../../api/super/SuperAdminAPI';
import toastrValidation from '../../../utils/ToastrValidation';
import { SuperAdminPaginationValue, PaginationValue, ConsortiumPaginationValue } from '../../../utils/PaginationUrl';
import { getItemSessionStorage } from '../../../utils/RegExp';
import { BASE_URL_SUPER } from '../../../utils/BaseUrl';
import END_POINTS from '../../../utils/EndPoints';
import { EXTREME, PRO } from '../../../constant/data/Constant';
import END_POINTS_PRO from '../../../utils/EndPointPro';


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
            type: types.FETCH_SUPER_ADMIN_EXTREME_REF_START, url: action.getUrl, paginationPayload: getItemSessionStorage('role') !== 'consortium' ? SuperAdminPaginationValue : ConsortiumPaginationValue,
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
 * Delete Extreme Ref Account
 * @param {*} action
 */

export function* onLoadExtremeRefDelete(action) {
    const { response, error } = yield call(ExtremeRefDeleteAccount, action.licenseId, action.role);
    if (response) {
        yield put({
            type: types.FETCH_SUPER_ADMIN_DELETE_ACCOUNT_SUCCESS, payload: response?.data,
        });
        yield put({
            type: types.FETCH_SUPER_ADMIN_EXTREME_REF_START,
            url: action.role,
            paginationPayload: SuperAdminPaginationValue,
        });
        toastrValidation(response)
    } else {
        yield put({
            type: types.FETCH_SUPER_ADMIN_DELETE_ACCOUNT_FAIL,
            payload: error,
        });
        toastrValidation(error)
    }
}

export function* DeleteExtremeRefAccount() {
    yield takeLatest(types.FETCH_SUPER_ADMIN_DELETE_ACCOUNT_START, onLoadExtremeRefDelete);
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
            type: types.FETCH_SUPER_ADMIN_EXTREME_REF_START, url: action.getUrl, paginationPayload: getItemSessionStorage('role') !== 'consortium' ? SuperAdminPaginationValue : ConsortiumPaginationValue,
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
 * Folderlist Extreme Ref Account
 * @param {*} action
 */
export function* onLoadFolderPath(action) {
    const { response, error } = yield call(FolderPathListData, action.url);
    if (response) {
        yield put({
            type: types.FETCH_SUPER_ADMIN_FOLDER_PATH_LIST_SUCCESS,
            payload: response?.data,
        });
    } else {
        yield put({
            type: types.FETCH_SUPER_ADMIN_FOLDER_PATH_LIST_FAIL,
            payload: error,
        });
        toastrValidation(error);
    }
}

export function* SuperFolderPathList() {
    yield takeLatest(types.FETCH_SUPER_ADMIN_FOLDER_PATH_LIST_START, onLoadFolderPath);
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
 * Create Student
 * @param {*} action
 */

export function* onLoadCreateStudent(action) {
    const { response, error } = yield call(SuperCreateStudentData, action.url, action.query);
    if (response) {
        yield put({
            type: types.FETCH_SUPER_ADMIN_EXT_CREATE_STUDENT_SUCCESS, payload: response?.data,
        });
        yield put({
            type: types.FETCH_SUPER_ADMIN_EXT_STUDENT_LIST_START,
            url: `/extreme/license/${action.url.split('/')[6]}/students`,
            paginationPayload: SuperAdminPaginationValue,
        });
        toastrValidation(response)
    } else {
        yield put({
            type: types.FETCH_SUPER_ADMIN_EXT_CREATE_STUDENT_FAIL,
            payload: error,
        });
        toastrValidation(error)
    }
}

export function* CreateStudentData() {
    yield takeLatest(types.FETCH_SUPER_ADMIN_EXT_CREATE_STUDENT_START, onLoadCreateStudent);
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
        });
        toastrValidation(error)
    }
}

export function* GlobalSearchDetail() {
    yield takeLatest(types.FETCH_SUPER_ADMIN_GLOBAL_SEARCH_START, onLoadGlobalSearch);
}
    

 /* Make him admin (extreme > instructor , pro > user)
 * @param {*} action
 */

export function* onLoadMakeHimAdmin(action) {
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

/**
 * Resend credentials
 * @param {*} action
 */

export function* onLoadResendCredentials(action) {
    const { response, error } = yield call(ResendCredentialsData, action.role, action.data);
    if (response) {
        yield put({
            type: types.FETCH_SUPER_ADMIN_RESEND_CREDENTIALS_SUCCESS,
            payload: response?.data,
        });
        toastrValidation(response)
    } else {
        yield put({
            type: types.FETCH_SUPER_ADMIN_RESEND_CREDENTIALS_FAIL,
        })
        toastrValidation(error)
    }
}

export function* ResendCredentialsDetail() {
    yield takeLatest(types.FETCH_SUPER_ADMIN_RESEND_CREDENTIALS_START, onLoadResendCredentials);
}