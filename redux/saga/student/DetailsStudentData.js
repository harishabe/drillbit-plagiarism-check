import { takeLatest, put, call } from 'redux-saga/effects';
import * as types from '../../action/ActionType';
import { GetDashboardData, GetClassesDetail, GetAssignmentDetail, GetSubmissionDetail } from '../../api/student/DetailStudentAPI';

/**
 * Get classes data
 * @param {*} action
 */

export function* onLoadDashboard() {
    const { response, error } = yield call(GetDashboardData);
    if (response) {
        yield put({
            type: types.FETCH_STUDENT_DASHBOARD_WIDGET_SUCCESS,
            payload: response?.data,
        });
    } else {
        yield put({
            type: types.FETCH_STUDENT_DASHBOARD_WIDGET_FAIL,
            payload: error,
        });
    }
}

export function* GetStudentDashboard() {
    yield takeLatest(types.FETCH_STUDENT_DASHBOARD_WIDGET_START, onLoadDashboard);
}

/**
 * Get classes data
 * @param {*} action
 */

export function* onLoadClasses(action) {
    const { response, error } = yield call(GetClassesDetail, action.paginationPayload);
    if (response) {
        yield put({
            type: types.FETCH_STUDENTS_CLASSES_DATA_SUCCESS,
            payload: response?.data,
        });
    } else {
        yield put({
            type: types.FETCH_STUDENTS_CLASSES_DATA_FAIL,
            payload: error,
        });
    }
}

export function* GetStudentClasses() {
    yield takeLatest(types.FETCH_STUDENTS_CLASSES_DATA_START, onLoadClasses);
}


/**
 * Get assignments data
 * @param {*} action
 */

export function* onLoadAssignments(action) {
    const { response, error } = yield call(GetAssignmentDetail, action.paginationPayload);
    if (response) {
        yield put({
            type: types.FETCH_STUDENTS_ASSIGNMENT_DATA_SUCCESS,
            payload: response?.data,
        });
    } else {
        yield put({
            type: types.FETCH_STUDENTS_ASSIGNMENT_DATA_FAIL,
            payload: error,
        });
    }
}

export function* GetStudentAssignments() {
    yield takeLatest(types.FETCH_STUDENTS_ASSIGNMENT_DATA_START, onLoadAssignments);
}


/**
 * Get submissions data
 * @param {*} action
 */

export function* onLoadSubmissions() {
    const { response, error } = yield call(GetSubmissionDetail);
    if (response) {
        yield put({
            type: types.FETCH_STUDENTS_SUBMISSION_DATA_SUCCESS,
            payload: response?.data,
        });
    } else {
        yield put({
            type: types.FETCH_STUDENTS_SUBMISSION_DATA_FAIL,
            payload: error,
        });
    }
}

export function* GetStudentSubmissions() {
    yield takeLatest(types.FETCH_STUDENTS_SUBMISSION_DATA_START, onLoadSubmissions);
}