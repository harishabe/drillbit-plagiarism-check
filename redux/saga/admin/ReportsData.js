import { takeLatest, put, call } from 'redux-saga/effects';
import * as types from '../../action/ActionType';
import {
    GetReports,
    DownloadReports
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
