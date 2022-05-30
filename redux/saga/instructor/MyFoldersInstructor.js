import { takeLatest, put, call } from 'redux-saga/effects';
import * as types from '../../action/ActionType';
import { GetMyFoldersDetail } from '../../api/instructor/MyFoldersAPI';

/**
 * Get trend analysis
 * @param {*} action
 */

export function* GetAllFolders() {
    const { response, error } = yield call(GetMyFoldersDetail);
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
