import { takeLatest, put, call } from 'redux-saga/effects';
import * as types from '../../../action/CommonActionType';
import {
    DownloadOriginalFileData,
    GetFolderSubmission,
    DeletefolderSubmission,
    DownloadSubmissionData
} from '../../../api/common/Submission/SubmissionAPI';
import toastrValidation from '../../../../utils/ToastrValidation';
import { FolderSubmissionsPaginationValue } from '../../../../utils/PaginationUrl';
import { BASE_URL_EXTREM, BASE_URL_PRO } from '../../../../utils/BaseUrl';
import END_POINTS from '../../../../utils/EndPoints';
import END_POINTS_PRO from '../../../../utils/EndPointPro'

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
    const { response, error } = yield call(GetFolderSubmission, action.url, action.paginationPayload);
    if (response) {
        yield put({
            type: types.FETCH_FOLDER_SUBMISSION_LIST_SUCCESS,
            payload: response?.data,
        });
    } else {
        yield put({
            type: types.FETCH_FOLDER_SUBMISSION_LIST_FAIL,
            payload: error,
        });
    }
}

export function* GetFolderSubmissionData() {
    yield takeLatest(types.FETCH_FOLDER_SUBMISSION_LIST_START, onLoadSubmission);
}

/**
 * Get myfolder > submissionList > delete
 * @param {*} action
 */

export function* onLoadDeleteFile(action) {
    console.log("action", action.url.split('/'))
    const { response, error } = yield call(DeletefolderSubmission, action.url);
    if (response) {
        yield put({ type: types.FETCH_FOLDER_SUBMISSION_LIST_DELETE_SUCCESS, payload: response?.data });
        yield put({
            type: types.FETCH_FOLDER_SUBMISSION_LIST_START,
            url: action.url.split('/')[3] === 'extreme' ?
                BASE_URL_EXTREM + END_POINTS.INSTRUCTOR_SUBMISSION_GRADING_QNA + `myFolder/${action.url.split('/')[5]}/submissions` :
                BASE_URL_PRO + END_POINTS_PRO.USER_SUBMISSION + `${action.url.split('/')[5]}/submissions`,
            paginationPayload: FolderSubmissionsPaginationValue
        });
        toastrValidation(response);
    } else {
        yield put({
            type: types.FETCH_FOLDER_SUBMISSION_LIST_DELETE_FAIL,
            payload: error,
        });
        toastrValidation(error);
    }
}

export function* DeleteFolderSubmissionFile() {
    yield takeLatest(types.FETCH_FOLDER_SUBMISSION_LIST_DELETE_START, onLoadDeleteFile);
}

/**
 * Download CSV
 * @param {*} action
 */


export function* onLoadDownload(action) {
    const { response, error } = yield call(DownloadSubmissionData, action.url);
    if (response) {
        yield put({
            type: types.FETCH_DOWNLOAD_CSV_SUCCESS,
            payload: response?.data,
        });
    } else {
        yield put({
            type: types.FETCH_DOWNLOAD_CSV_FAIL,
            payload: error,
        });
    }
}

export function* DownloadSubmissionDetail() {
    yield takeLatest(types.FETCH_DOWNLOAD_CSV_START, onLoadDownload);
}