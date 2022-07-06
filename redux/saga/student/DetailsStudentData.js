import { takeLatest, put, call } from 'redux-saga/effects';
import * as types from '../../action/ActionType';
import {
    GetDashboardData,
    GetClassesDetail,
    GetAssignmentDetail,
    GetSubmissionDetail,
    SendSubmissionData,
    GetSubmissionHeader,
    DownloadHistory,
    GetQnaDetail,
    GetFeedbackDetail,
    SendAnswerData,
} from '../../api/student/DetailStudentAPI';

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
    const { response, error } = yield call(GetAssignmentDetail, action.class_id, action.paginationPayload);
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
 * Get submissions header data
 * @param {*} action
 */

export function* onLoadHeader(action) {
    const { response, error } = yield call(GetSubmissionHeader, action.class_id, action.folder_id);
    if (response) {
        yield put({
            type: types.FETCH_STUDENTS_SUBMISSION_DETAILS_HEADER_SUCCESS,
            payload: response?.data,
        });
    } else {
        yield put({
            type: types.FETCH_STUDENTS_SUBMISSION_DETAILS_HEADER_FAIL,
            payload: error,
        });
    }
}

export function* GetStudentSubmissionHeader() {
    yield takeLatest(types.FETCH_STUDENTS_SUBMISSION_DETAILS_HEADER_START, onLoadHeader);
}

/**
 * Get submissions data
 * @param {*} action
 */

export function* onLoadSubmissions(action) {
    const { response, error } = yield call(GetSubmissionDetail, action.class_id, action.folder_id);
    if (response) {
        yield put({
            type: types.FETCH_STUDENTS_SUBMISSION_DETAILS_SUCCESS,
            payload: response?.data,
        });
    } else {
        yield put({
            type: types.FETCH_STUDENTS_SUBMISSION_DETAILS_FAIL,
            payload: error,
        });
    }
}

export function* GetStudentSubmissions() {
    yield takeLatest(types.FETCH_STUDENTS_SUBMISSION_DETAILS_START, onLoadSubmissions);
}


/**
 * Download history
 * @param {*} action
 */


export function* onLoadDownload(action) {
    const { response, error } = yield call(DownloadHistory, action.url);
    if (response) {
        yield put({
            type: types.FETCH_STUDENTS_SUBMISSION_HISTORY_DOWNLOAD_SUCCESS,
            payload: response?.data,
        });
    } else {
        yield put({
            type: types.FETCH_STUDENTS_SUBMISSION_HISTORY_DOWNLOAD_FAIL,
            payload: error,
        });
    }
}

export function* DownloadStudentCsv() {
    yield takeLatest(types.FETCH_STUDENTS_SUBMISSION_HISTORY_DOWNLOAD_START, onLoadDownload);
}


/**
 * Get qna data
 * @param {*} action
 */

export function* onLoadQna(action) {
    const { response, error } = yield call(GetQnaDetail, action.class_id, action.folder_id);
    if (response) {
        yield put({
            type: types.FETCH_STUDENTS_QA_DETAILS_SUCCESS,
            payload: response?.data,
        });
    } else {
        yield put({
            type: types.FETCH_STUDENTS_QA_DETAILS_FAIL,
            payload: error,
        });
    }
}

export function* GetStudentQna() {
    yield takeLatest(types.FETCH_STUDENTS_QA_DETAILS_START, onLoadQna);
}

/**
 * Send qna data
 * @param {*} action
 */

export function* onLoadSendAnswer(action) {
    const { response, error } = yield call(SendAnswerData, action.query, action.class_id, action.folder_id);
    if (response) {
        yield put({ type: types.FETCH_STUDENTS_QA_ANSWER_DETAILS_SUCCESS, payload: response?.data, });
        yield put({ type: types.FETCH_STUDENTS_QA_ANSWER_DETAILS_START });
    } else {
        yield put({
            type: types.FETCH_STUDENTS_QA_ANSWER_DETAILS_FAIL,
            payload: error,
        });
    }
}

export function* SendQnaAnswer() {
    yield takeLatest(types.FETCH_STUDENTS_QA_ANSWER_DETAILS_START, onLoadSendAnswer);
}

/**
 * Send qna data
 * @param {*} action
 */

export function* onLoadSendSubmission(action) {
    const { response, error } = yield call(SendSubmissionData, action.query);
    if (response) {
        yield put({ type: types.FETCH_STUDENTS_NEW_SUBMISSION_SUCCESS, payload: response?.data, });
        yield put({ type: types.FETCH_STUDENTS_NEW_SUBMISSION_START });
    } else {
        yield put({
            type: types.FETCH_STUDENTS_NEW_SUBMISSION_FAIL,
            payload: error,
        });
    }
}

export function* SendSubmissionAnswer() {
    yield takeLatest(types.FETCH_STUDENTS_NEW_SUBMISSION_START, onLoadSendSubmission);
}

/**
 * Get feedback data
 * @param {*} action
 */

export function* onLoadFeedback(action) {
    const { response, error } = yield call(GetFeedbackDetail, action.class_id, action.folder_id);
    if (response) {
        yield put({
            type: types.FETCH_STUDENTS_FEEDBACK_DETAILS_SUCCESS,
            payload: response?.data,
        });
    } else {
        yield put({
            type: types.FETCH_STUDENTS_FEEDBACK_DETAILS_FAIL,
            payload: error,
        });
    }
}

export function* GetStudentFeedback() {
    yield takeLatest(types.FETCH_STUDENTS_FEEDBACK_DETAILS_START, onLoadFeedback);
}