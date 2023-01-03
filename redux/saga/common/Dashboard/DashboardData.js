import { takeLatest, put, call } from 'redux-saga/effects';
import * as types from '../../../action/CommonActionType';
import {
    DocumentChartDetail,
    DepartmentChartDetail
} from '../../../api/common/Dashboard/DashboardAPI';
import toastrValidation from '../../../../utils/ToastrValidation';

/**
 * Document List
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

/**
 * Department List
 * @param {*} action
 */

export function* onLoadDepartmentchart(action) {
    const { response, error } = yield call(DepartmentChartDetail, action.url);
    if (response) {
        yield put({
            type: types.FETCH_DEPARTMENT_TYPE_SUCCESS,
            payload: response?.data,
        });
    } else {
        yield put({
            type: types.FETCH_DEPARTMENT_TYPE_FAIL,
            payload: error,
        });
        toastrValidation(error);
    }
}

export function* DepartmentChartData() {
    yield takeLatest(types.FETCH_DEPARTMENT_TYPE_START, onLoadDepartmentchart);
}
