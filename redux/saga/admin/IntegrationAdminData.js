import { takeLatest, put, call } from 'redux-saga/effects';
import * as types from '../../action/ActionType';
import {
    GetIntegrationDetail
} from '../../api/admin/IntegrationAdminAPI';
import toastrValidation from '../../../utils/ToastrValidation';

/**
 * Get integration data
 * @param {*} action
 */

export function* onLoadIntegration(action) {
    const { response, error } = yield call(GetIntegrationDetail,action.apiUrl);
    if (response) {
        yield put({
            type: types.FETCH_ADMIN_INTEGRATION_DETAILS_SUCCESS,
            payload: response?.data,
        });
    } else {
        yield put({
            type: types.FETCH_ADMIN_INTEGRATION_DETAILS_FAIL,
            payload: error,
        });
    }
}

export function* GetAdminIntegrationData() {
    yield takeLatest(types.FETCH_ADMIN_INTEGRATION_DETAILS_START, onLoadIntegration);
}


/**
 * Get integration details type data
 * @param {*} action
 */

 export function* onLoadIntegrationDetails(action) {
    const { response, error } = yield call(GetIntegrationDetail,action.apiUrl);
    if (response) {
        yield put({
            type: types.FETCH_ADMIN_INTEGRATION_TYPE_DETAILS_SUCCESS,
            payload: response?.data,
        });
    } else {
        yield put({
            type: types.FETCH_ADMIN_INTEGRATION_TYPE_DETAILS_FAIL,
            payload: error,
        });
    }
}

export function* GetAdminIntegrationType() {
    yield takeLatest(types.FETCH_ADMIN_INTEGRATION_TYPE_DETAILS_START, onLoadIntegrationDetails);
}
