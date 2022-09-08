import { takeLatest, put, call } from 'redux-saga/effects';
import * as types from '../../../action/CommonActionType';
import {
    DownloadOriginalFileData,
    GetFolderSubmission,
    DeletefolderSubmission
} from '../../../api/common/Submission/SubmissionAPI';
import toastrValidation from '../../../../utils/ToastrValidation';

/**
 * Get Download Original File data
 * @param {*} action
 */

export function* onLoadDownloadFile(action) {
    const { response, error } = yield call(DownloadOriginalFileData, action.data);
    if (response) {
        yield put({
            type: types.FETCH_DOWNLOAD_ORIGINAL_FILE_SUCCESS,
            payload: response?.data,
        });
        toastrValidation(response);
    } else {
        yield put({
            type: types.FETCH_DOWNLOAD_ORIGINAL_FILE_FAIL,
            payload: error,
        });
        toastrValidation(error);
    }
}

export function* GetDownloadFileData() {
    yield takeLatest(types.FETCH_DOWNLOAD_ORIGINAL_FILE_START, onLoadDownloadFile);
}

/**
 * Get Folder submission data
 * My Folder > Submission List
 * @param {*} action
 */

export function* onLoadSubmission(action) {
    const { response, error } = yield call(GetFolderSubmission, action.url);
    if (response) {
        yield put({
            type: types.FETCH_INSTRUCTOR_FOLDER_SUBMISSION_LIST_SUCCESS,
            payload: response?.data,
        });
    } else {
        yield put({
            type: types.FETCH_INSTRUCTOR_FOLDER_SUBMISSION_LIST_FAIL,
            payload: error,
        });
    }
}

export function* GetFolderSubmissionData() {
    yield takeLatest(types.FETCH_INSTRUCTOR_FOLDER_SUBMISSION_LIST_START, onLoadSubmission);
}

/**
 * Get myfolder > submissionList > delete
 * @param {*} action
 */

export function* onLoadDeleteFile(action) {
    const { response, error } = yield call(DeletefolderSubmission, action.url);
    if (response) {
        yield put({ type: types.FETCH_INSTRUCTOR_FOLDER_SUBMISSION_LIST_DELETE_SUCCESS, payload: response?.data });
        yield put({ type: types.FETCH_INSTRUCTOR_FOLDER_SUBMISSION_LIST_START, url: `myFolder/${action.url.split('/')[1]}/submissions?page=0&size=6&field=name&orderBy=asc` });
    } else {
        yield put({
            type: types.FETCH_INSTRUCTOR_FOLDER_SUBMISSION_LIST_DELETE_FAIL,
            payload: error,
        });
    }
}

export function* DeleteFolderSubmissionFile() {
    yield takeLatest(types.FETCH_INSTRUCTOR_FOLDER_SUBMISSION_LIST_DELETE_START, onLoadDeleteFile);
}