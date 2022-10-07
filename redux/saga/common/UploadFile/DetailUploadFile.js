import { takeLatest, put, call } from 'redux-saga/effects';
import * as types from '../../../action/UploadFileActionType';
import {
    LanguageListDetail,
    UploadFileDriveDetail,
    UploadNonEngFile,
    RepositoryUploadDetail
} from '../../../api/common/UploadFile/UploadFileAPI';
import toastrValidation from '../../../../utils/ToastrValidation';

/**
 * Language List
 * @param {*} action
 */

export function* onLoadLanguageList(action) {
    const { response, error } = yield call(LanguageListDetail, action.url);
    if (response) {
        yield put({
            type: types.FETCH_LANGUAGE_LIST_SUCCESS,
            payload: response?.data,
        });
        toastrValidation(response);
    } else {
        yield put({
            type: types.FETCH_LANGUAGE_LIST_FAIL,
            payload: error,
        });
        toastrValidation(error);
    }
}

export function* LanguageListData() {
    yield takeLatest(types.FETCH_LANGUAGE_LIST_START, onLoadLanguageList);
}

/**
 * Upload google drive
 * @param {*} action
 */

export function* onLoadUploadFileDrive(action) {
    const { response, error } = yield call(UploadFileDriveDetail, action.classId, action.assId, action.query);
    if (response) {
        yield put({
            type: types.FETCH_UPLOAD_GOOGLE_DRIVE_SUCCESS,
            payload: response?.data,
        });
        toastrValidation(response);
    } else {
        yield put({
            type: types.FETCH_UPLOAD_GOOGLE_DRIVE_FAIL,
            payload: error,
        });
        toastrValidation(error);
    }
}

export function* UploadFileDriveData() {
    yield takeLatest(types.FETCH_UPLOAD_GOOGLE_DRIVE_START, onLoadUploadFileDrive);
}

/**
 * Upload file non english
 * @param {*} action
 */

 export function* onLoadUploadFileNonEnglish(action) {
    const { response, error } = yield call(UploadNonEngFile, action.classId, action.assId, action.query);
    if (response) {
        yield put({
            type: types.FETCH_UPLOAD_FILE_NON_ENGLISH_SUCCESS,
            payload: response?.data,
        });
        toastrValidation(response);
    } else {
        yield put({
            type: types.FETCH_UPLOAD_FILE_NON_ENGLISH_FAIL,
            payload: error,
        });
        toastrValidation(error);
    }
}

export function* UploadFileNonEnglish() {
    yield takeLatest(types.FETCH_UPLOAD_FILE_NON_ENGLISH_START, onLoadUploadFileNonEnglish);
}

/**
 * Upload file Repository
 * @param {*} action
 */

export function* onLoadUploadFileRepo(action) {
    const { response, error } = yield call(RepositoryUploadDetail, action.url, action.query);
    if (response) {
        yield put({
            type: types.FETCH_REPO_UPLOAD_FILE_DRIVE_AND_ZIP_SUCCESS,
            payload: response?.data,
        });
        toastrValidation(response);
    } else {
        yield put({
            type: types.FETCH_REPO_UPLOAD_FILE_DRIVE_AND_ZIP_FAIL,
            payload: error,
        });
        toastrValidation(error);
    }
}

export function* RepositoryUploadData() {
    yield takeLatest(types.FETCH_REPO_UPLOAD_FILE_DRIVE_AND_ZIP_START, onLoadUploadFileRepo);
}