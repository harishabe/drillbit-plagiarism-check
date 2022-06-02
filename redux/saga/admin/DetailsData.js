import { takeLatest, put, call } from 'redux-saga/effects';
import * as types from '../../action/ActionType';
import {
    GetInstructorDetail,
    GetStudentDetail,
    GetReports,
} from '../../api/admin/DetailsDataAPI';

/**
 * Get trend analysis
 * @param {*} action
 */

export function* onLoadInstructor() {
    const { response, error } = yield call(GetInstructorDetail);
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
 * Get student details
 * @param {*} action
 */

export function* onLoadStudent() {
    const { response, error } = yield call(GetStudentDetail);
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
