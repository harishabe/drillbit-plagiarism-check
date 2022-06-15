import { takeLatest, put, call } from 'redux-saga/effects';
import * as types from '../../action/ActionType';
import {
    GetInstructorDetail,
    CreateInstructorData,
    GetStudentDetail,
    GetReports,
    DownloadReports,
    EditRow,
    DeleteRow,
    DeactivateRow,
} from '../../api/admin/DetailsAdminAPI';

/**
 * Get instructor details
 * @param {*} action
 */

export function* onLoadInstructor(action) {
    const { response, error } = yield call(GetInstructorDetail, action.paginationPayload);
    if (response) {
        yield put({
            type: types.FETCH_ADMIN_INSTRUCTOR_DATA_SUCCESS,
            payload: response?.data,
        });
    } else {
        yield put({
            type: types.FETCH_ADMIN_INSTRUCTOR_DATA_FAIL,
            payload: error,
        });
    }
}

export function* GetInstructorData() {
    yield takeLatest(types.FETCH_ADMIN_INSTRUCTOR_DATA_START, onLoadInstructor);
}

/**
 * create instructor
 * @param {*} action
 */

export function* onLoadCreateInstructor(action) {
    const { response, error } = yield call(CreateInstructorData, action.query);
    if (response) {
        yield put({
            type: types.FETCH_ADMIN_INSTRUCTOR_CREATE_SUCCESS,
            payload: response?.data,
        });
    } else {
        yield put({
            type: types.FETCH_ADMIN_INSTRUCTOR_CREATE_FAIL,
            payload: error,
        });
    }
}

export function* CreateInstructor() {
    yield takeLatest(types.FETCH_ADMIN_INSTRUCTOR_CREATE_START, onLoadCreateInstructor);
}

/**
 * Get student details
 * @param {*} action
 */

export function* onLoadStudent(action) {
    const { response, error } = yield call(GetStudentDetail, action.paginationPayload);
    if (response) {
        yield put({
            type: types.FETCH_ADMIN_STUDENT_DATA_SUCCESS,
            payload: response?.data,
        });
    } else {
        yield put({
            type: types.FETCH_ADMIN_STUDENT_DATA_FAIL,
            payload: error,
        });
    }
}

export function* GetStudentData() {
    yield takeLatest(types.FETCH_ADMIN_STUDENT_DATA_START, onLoadStudent);
}

/**
 * Get report details
 * @param {*} action
 */

export function* onLoadReport() {
    const { response, error } = yield call(GetReports);
    if (response) {
        yield put({
            type: types.FETCH_ADMIN_REPORTS_DATA_SUCCESS,
            payload: response?.data,
        });
    } else {
        yield put({
            type: types.FETCH_ADMIN_REPORTS_DATA_FAIL,
            payload: error,
        });
    }
}

export function* GetReportData() {
    yield takeLatest(types.FETCH_ADMIN_REPORTS_DATA_START, onLoadReport);
}

/**
 * Get report download
 * @param {*} action
 */


export function* onLoadReportDownload() {
    const { response, error } = yield call(DownloadReports);
    if (response) {
        yield put({
            type: types.FETCH_ADMIN_REPORTS_DATA_DOWNLOAD_SUCCESS,
            payload: response?.data,
        });
    } else {
        yield put({
            type: types.FETCH_ADMIN_REPORTS_DATA_DOWNLOAD_FAIL,
            payload: error,
        });
    }
}

export function* GetReportDataDownload() {
    yield takeLatest(types.FETCH_ADMIN_REPORTS_DATA_DOWNLOAD_START, onLoadReportDownload);
}

/**
 * Edit
 * @param {*} action
 */


export function* onLoadEdit() {
    const { response, error } = yield call(EditRow);
    if (response) {
        yield put({
            type: types.FETCH_ADMIN_EDIT_ROW_SUCCESS,
            payload: response?.data,
        });
    } else {
        yield put({
            type: types.FETCH_ADMIN_EDIT_ROW_FAIL,
            payload: error,
        });
    }
}

export function* EditData() {
    yield takeLatest(types.FETCH_ADMIN_EDIT_ROW_START, onLoadEdit);
}


/**
 * Delete
 * @param {*} action
 */


export function* onLoadDelete() {
    const { response, error } = yield call(DeleteRow);
    if (response) {
        yield put({
            type: types.FETCH_ADMIN_DELETE_ROW_SUCCESS,
            payload: response?.data,
        });
    } else {
        yield put({
            type: types.FETCH_ADMIN_DELETE_ROW_FAIL,
            payload: error,
        });
    }
}

export function* DeleteData() {
    yield takeLatest(types.FETCH_ADMIN_DELETE_ROW_START, onLoadDelete);
}

/**
 * Deactivate
 * @param {*} action
 */


export function* onLoadDeactivate(action) {
    const { response, error } = yield call(DeactivateRow, action.query);
    if (response) {
        yield put({
            type: types.FETCH_ADMIN_DEACTIVATE_ROW_SUCCESS,
            payload: response?.data,
        });
    } else {
        yield put({
            type: types.FETCH_ADMIN_DEACTIVATE_ROW_FAIL,
            payload: error,
        });
    }
}

export function* DeactivateData() {
    yield takeLatest(types.FETCH_ADMIN_DEACTIVATE_ROW_START, onLoadDeactivate);
}

