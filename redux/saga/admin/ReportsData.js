import { takeLatest, put, call } from 'redux-saga/effects';
import * as types from '../../action/ActionType';
import {
    GetReports,
    DownloadReports,
    ViewDownloadReports,
} from '../../api/admin/DetailsAdminAPI';

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
 * Download csv file format data for instructor and student
 * @param {*} action
 */

export function* onLoadReportDownload(action) {
    const { response, error } = yield call(DownloadReports, action);
    if (response || response === undefined) {
        yield put({
            type: types.FETCH_ADMIN_INSTRUCTOR_STUDENT_DOWNLOAD_SUCCESS,
            payload: response?.data,
        });
    } else {
        yield put({
            type: types.FETCH_ADMIN_INSTRUCTOR_STUDENT_DOWNLOAD_FAIL,
            payload: error,
        });
    }
}

export function* GetReportDataDownload() {
    yield takeLatest(types.FETCH_ADMIN_INSTRUCTOR_STUDENT_DOWNLOAD_START, onLoadReportDownload);
}


/**
 * Get report view & download
 * @param {*} action
 */


export function* onLoadViewDownload(action) {
    const { response, error } = yield call(ViewDownloadReports,action.url);
    if (response) {
        yield put({
            type: types.FETCH_ADMIN_REPORTS_VIEW_DOWNLOAD_SUCCESS,
            payload: response?.data,
        });
    } else {
        yield put({
            type: types.FETCH_ADMIN_REPORTS_VIEW_DOWNLOAD_FAIL,
            payload: error,
        });
    }
}

export function* GetReportViewDownload() {
    yield takeLatest(types.FETCH_ADMIN_REPORTS_VIEW_DOWNLOAD_START, onLoadViewDownload);
}
