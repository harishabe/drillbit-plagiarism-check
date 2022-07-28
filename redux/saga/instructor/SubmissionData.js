import { takeLatest, put, call } from 'redux-saga/effects';
import * as types from '../../action/ActionType';
import {
    GetSubmissionGradingQna,
    EditSubmissionData,
    SaveToRepoSubmission,
    InstructorFeedbackData
} from '../../api//instructor/DetailsSubmissionAPI';
import {
    UploadSubmission,
    DeleteSubmission,
} from '../../api//instructor/DetailsInstructorAPI';
import toastrValidation from '../../../utils/ToastrValidation';

/**
 * Get student data
 * My Folder > Submission List
 * 
 * My classes > assignments > submissions
 * Submission-Grading-Qna
 * @param {*} action
 */

export function* onLoadSubmission(action) {
    const { response, error } = yield call(GetSubmissionGradingQna, action.url);
    if (response) {
        yield put({
            type: types.FETCH_INSTRUCTOR_SUBMISSION_LIST_SUCCESS,
            payload: response?.data,
        });
    } else {
        yield put({
            type: types.FETCH_INSTRUCTOR_SUBMISSION_LIST_FAIL,
            payload: error,
        });
    }
}

export function* GetSubmissionData() {
    yield takeLatest(types.FETCH_INSTRUCTOR_SUBMISSION_LIST_START, onLoadSubmission);
}

/**
 * my folder > submission list > upload file
 * myclasses > assignments > submission-upload
 * @param {*} action
 */

export function* onLoadUploadFile(action) {
    const { response, error } = yield call(UploadSubmission, action.clasId, action.folder_id, action.query);
    if (response) {
        yield put({ type: types.FETCH_INSTRUCTOR_SUBMISSION_LIST_UPLOAD_SUCCESS, payload: response?.data });
        yield put({
            type: types.FETCH_INSTRUCTOR_SUBMISSION_LIST_START, url: `${action.clasId}/assignments/${action.folder_id}/submissions?page=0&size=25&field=name&orderBy=desc`
        });
        toastrValidation(response);
    } else {
        yield put({ type: types.FETCH_INSTRUCTOR_SUBMISSION_LIST_UPLOAD_FAIL, payload: error });
        toastrValidation(error);
    }
}

export function* UploadSubmissionFile() {
    yield takeLatest(types.FETCH_INSTRUCTOR_SUBMISSION_LIST_UPLOAD_START, onLoadUploadFile);
}

/**
 * my folder > submission list > delete file
 * @param {*} action
 */

export function* onLoadDeleteFile(action) {
    console.log("actionactionaction", action)
    const { response, error } = yield call(DeleteSubmission, action.clasId, action.folder_id, action.paper_id);
    if (response) {
        yield put({ type: types.FETCH_INSTRUCTOR_SUBMISSION_LIST_DELETE_SUCCESS, payload: response?.data });
        yield put({
            type: types.FETCH_INSTRUCTOR_SUBMISSION_LIST_START, url: `${action.clasId}/assignments/${action.folder_id}/submissions?page=0&size=25&field=name&orderBy=desc`
        });
        toastrValidation(response);
    } else {
        yield put({ type: types.FETCH_INSTRUCTOR_SUBMISSION_LIST_DELETE_FAIL, payload: error });
        toastrValidation(error);
    }
}

export function* DeleteSubmissionFile() {
    yield takeLatest(types.FETCH_INSTRUCTOR_SUBMISSION_LIST_DELETE_START, onLoadDeleteFile);
}

/**
 * Edit Submission
 * @param {*} action
 */
export function* onLoadEditSubmission(action) {
    const { response, error } = yield call(EditSubmissionData, action);
    if (response) {
        yield put({ type: types.FETCH_INSTRUCTOR_SUBMISSIONS_GRADING_QNA_EDIT_SUCCESS, payload: response?.data });
        yield put({ type: types.FETCH_INSTRUCTOR_SUBMISSION_LIST_START, url: `${action.clasId}/assignments/${action.folder_id}/submissions?page=0&size=25&field=name&orderBy=desc` });
        toastrValidation(response)
    } else {
        yield put({
            type: types.FETCH_INSTRUCTOR_SUBMISSIONS_GRADING_QNA_EDIT_FAIL,
            payload: error,
        });
        toastrValidation(error)
    }
}

export function* EditSubmissionDetail() {
    yield takeLatest(types.FETCH_INSTRUCTOR_SUBMISSIONS_GRADING_QNA_EDIT_START, onLoadEditSubmission);
}

/**
 * save to repositary 
 * @param {*} action
 */

export function* onLoadSaveToRepo(action) {
    const { response, error } = yield call(SaveToRepoSubmission, action.clasId, action.folder_id, action.paper_id, action.query);
    if (response) {
        yield put({ type: types.FETCH_INSTRUCTOR_SUBMISSIONS_SAVE_TO_REPOSITARY_SUCCESS, payload: response?.data });
        toastrValidation(response);
    } else {
        yield put({ type: types.FETCH_INSTRUCTOR_SUBMISSIONS_SAVE_TO_REPOSITARY_FAIL, payload: error });
        toastrValidation(error);
    }
}

export function* SaveToRepo() {
    yield takeLatest(types.FETCH_INSTRUCTOR_SUBMISSIONS_SAVE_TO_REPOSITARY_START, onLoadSaveToRepo);
}

/**
 * instructor feedback 
 * @param {*} action
 */

export function* onLoadInstructorFeedback(action) {
    const { response, error } = yield call(InstructorFeedbackData, action.clasId, action.folder_id, action.paper_id, action.query);
    if (response) {
        yield put({ type: types.FETCH_INSTRUCTOR_FEEDBACK_DETAILS_SUCCESS, payload: response?.data });
        toastrValidation(response);
    } else {
        yield put({ type: types.FETCH_INSTRUCTOR_FEEDBACK_DETAILS_FAIL, payload: error });
        toastrValidation(error);
    }
}

export function* InstructorFeedbackDetail() {
    yield takeLatest(types.FETCH_INSTRUCTOR_FEEDBACK_DETAILS_START, onLoadInstructorFeedback);
}