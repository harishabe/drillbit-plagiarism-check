import { takeLatest, put, call } from 'redux-saga/effects';
import * as types from '../../action/ActionType';
import { GetClassesDetail, GetMyFoldersDetail } from '../../api/instructor/DetailsInstructorAPI';

/**
 * Get classes data
 * @param {*} action
 */

export function* onLoadClasses(action) {
    const { response, error } = yield call(GetClassesDetail, action.paginationPayload);
    if (response) {
        yield put({
            type: types.FETCH_INSTRUCTOR_CLASSES_DATA_SUCCESS,
            payload: response?.data,
        });
    } else {
        yield put({
            type: types.FETCH_INSTRUCTOR_CLASSES_DATA_FAIL,
            payload: error,
        });
    }
}

export function* GetClassesData() {
    yield takeLatest(types.FETCH_INSTRUCTOR_CLASSES_DATA_START, onLoadClasses);
}

/**
 * Get folder data analysis
 * @param {*} action
 */

export function* GetAllFolders(action) {
    const { response, error } = yield call(GetMyFoldersDetail, action.paginationPayload);
    if (response) {
        yield put({
            type: types.FETCH_INSTRUCTOR_MY_FOLDERS_SUCCESS,
            payload: response?.data,
        });
    } else {
        yield put({
            type: types.FETCH_INSTRUCTOR_MY_FOLDERS_FAIL,
            payload: error,
        });
    }
}

export function* GetMyFolders() {
    yield takeLatest(types.FETCH_INSTRUCTOR_MY_FOLDERS_START, GetAllFolders);
}