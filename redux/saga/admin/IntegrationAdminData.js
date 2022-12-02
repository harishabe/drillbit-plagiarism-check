import { takeLatest, put, call } from 'redux-saga/effects';
import * as types from '../../action/ActionType';
import {
    GetIntegrationDetail,
    LmsIntegrationDetail,
    ChangeConfigDetail,
    GoogleClassroomDetail
} from '../../api/admin/IntegrationAdminAPI';
import toastrValidation from '../../../utils/ToastrValidation';
import { BASE_URL_EXTREM, BASE_URL_PRO } from '../../../utils/BaseUrl';
import END_POINTS from '../../../utils/EndPoints';
import END_POINTS_PRO from '../../../utils/EndPointPro';

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
    const { response, error } = yield call(LmsIntegrationDetail, action.url, action.query);
    if (response) {
        yield put({ type: types.FETCH_ADMIN_INTEGRATION_UPLOAD_DETAILS_SUCCESS, payload: response?.data });
        yield put({
            type: types.FETCH_ADMIN_INTEGRATION_DETAILS_START,
            apiUrl: action.url.split('/')[3] === 'extreme' ?
                BASE_URL_EXTREM + END_POINTS.ADMIN_INTEGRATION_DATA :
                BASE_URL_PRO + END_POINTS_PRO.ADMIN_INTEGRATION_DATA,
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
    const { response, error } = yield call(ChangeConfigDetail, action.url, action.query);
    if (response) {
        yield put({
            type: types.FETCH_ADMIN_INTEGRATION_CHANGE_CONFIG_SUCCESS,
            payload: response?.data,
        });
        yield put({
            type: types.FETCH_ADMIN_INTEGRATION_TYPE_DETAILS_START, apiUrl: action.url,
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

/**
 * Get Google classroom
 * @param {*} action
 */

export function* onLoadGoogleClassroom() {
    const { response, error } = yield call(GoogleClassroomDetail);
    if (response) {
        yield put({
            type: types.FETCH_ADMIN_INTEGRATION_GOOGLECLASSROOM_SUCCESS,
            payload: response?.data,
        });
    } else {
        yield put({
            type: types.FETCH_ADMIN_INTEGRATION_GOOGLECLASSROOM_FAIL,
            payload: error,
        });
    }
}

export function* GetAdminGoogleClassroomData() {
    yield takeLatest(types.FETCH_ADMIN_INTEGRATION_GOOGLECLASSROOM_START, onLoadGoogleClassroom);
}