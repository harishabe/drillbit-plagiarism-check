import { takeLatest, put, call } from 'redux-saga/effects';
import * as types from '../../../action/CommonActionType';
import {
    DownloadOriginalFileData,
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