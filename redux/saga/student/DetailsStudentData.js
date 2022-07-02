import { takeLatest, put, call } from 'redux-saga/effects';
import * as types from '../../action/ActionType';
import {
    GetDashboardData,
    GetClassesDetail,
    GetAssignmentDetail,
    GetSubmissionDetail,
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
 * Get feedback data
 * @param {*} action
 */

export function* onLoadFeedback(action) {
    const { response, error } = yield call(GetFeedbackDetail, action.class_id, action.folder_id, action.paper_id);
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