import { takeLatest, put, call } from 'redux-saga/effects';
import * as types from '../../../action/UploadFileActionType';
import {
    LanguageListDetail
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