import { takeLatest, put, call } from 'redux-saga/effects';
import * as types from '../../action/ActionType';
import {
    GetIntegrationDetail
} from '../../api/admin/IntegrationAdminAPI';
import toastrValidation from '../../../utils/ToastrValidation';

/**
 * Get report details
 * @param {*} action
 */

export function* onLoadIntegration() {
    const { response, error } = yield call(GetIntegrationDetail);
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
