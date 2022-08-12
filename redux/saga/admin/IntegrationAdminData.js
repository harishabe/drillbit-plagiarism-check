import { takeLatest, put, call } from 'redux-saga/effects';
import * as types from '../../action/ActionType';
import {
    GetIntegrationDetail,
    LmsIntegrationDetail,
    ChangeConfigDetail
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

/**
 * Upload integration details data
 * @param {*} action
 */

export function* onLoadIntegrationDetailsUpload(action) {
    const { response, error } = yield call(LmsIntegrationDetail, action.apiUrl, action.query);
    if (response) {
        yield put({
            type: types.FETCH_ADMIN_INTEGRATION_UPLOAD_DETAILS_SUCCESS,
            payload: response?.data,
        });
        toastrValidation(response)
    } else {
        yield put({
            type: types.FETCH_ADMIN_INTEGRATION_UPLOAD_DETAILS_FAIL,
            payload: error,
        });
        toastrValidation(error)
    }
}

export function* UploadAdminIntegration() {
    yield takeLatest(types.FETCH_ADMIN_INTEGRATION_UPLOAD_DETAILS_START, onLoadIntegrationDetailsUpload);
}

/**
 * change config data
 * @param {*} action
 */

export function* onLoadChangeConfigDetail(action) {
    const { response, error } = yield call(ChangeConfigDetail, action.apiUrl, action.query);
    if (response) {
        yield put({
            type: types.FETCH_ADMIN_INTEGRATION_CHANGE_CONFIG_SUCCESS,
            payload: response?.data,
        });
        yield put({
            type: types.FETCH_ADMIN_INTEGRATION_TYPE_DETAILS_START, apiUrl: action.apiUrl,
            payload: response?.data,
        });
        toastrValidation(response)
    } else {
        yield put({
            type: types.FETCH_ADMIN_INTEGRATION_CHANGE_CONFIG_FAIL,
            payload: error,
        });
        toastrValidation(error)
    }
}

export function* ChangeConfiguration() {
    yield takeLatest(types.FETCH_ADMIN_INTEGRATION_CHANGE_CONFIG_START, onLoadChangeConfigDetail);
}
