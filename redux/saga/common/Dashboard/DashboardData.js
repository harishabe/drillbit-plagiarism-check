import { takeLatest, put, call } from 'redux-saga/effects';
import * as types from '../../../action/CommonActionType';
import {
    DocumentChartDetail
} from '../../../api/common/Dashboard/DashboardAPI';
import toastrValidation from '../../../../utils/ToastrValidation';

/**
 * Language List
 * @param {*} action
 */

export function* onLoadDocumentchart(action) {
    const { response, error } = yield call(DocumentChartDetail, action.url);
    if (response) {
        yield put({
            type: types.FETCH_DOCUMENT_TYPE_SUCCESS,
            payload: response?.data,
        });
    } else {
        yield put({
            type: types.FETCH_DOCUMENT_TYPE_FAIL,
            payload: error,
        });
        toastrValidation(error);
    }
}

export function* DocumentChartData() {
    yield takeLatest(types.FETCH_DOCUMENT_TYPE_START, onLoadDocumentchart);
}
