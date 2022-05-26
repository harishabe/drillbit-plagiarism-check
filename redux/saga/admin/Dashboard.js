import { takeLatest, put, call } from 'redux-saga/effects';
import * as types from '../../action/ActionType';
import {
    GetWidgetData
} from '../../api/admin/DashboardAPI';
import toastrValidation from '../../../utils/ToastrValidation';

/**
 * Get admin dashboard widget count details
 * No. of instructor
 * No. of student
 * No. of submissions
 * @param {*} action
 */

export function* onLoadDashboardWidget() {
    const { response, error } = yield call(GetWidgetData);
    if (response) {
        yield put({ type: types.FETCH_ADMIN_DASH_WIDGET_SUCCESS, payload: response?.data });
    } else {
        yield put({ type: types.FETCH_ADMIN_DASH_WIDGET_FAIL, payload: error });
        toastrValidation(error);
    }
}

export function* DashboardWidget() {
    yield takeLatest(types.FETCH_ADMIN_DASH_WIDGET_START, onLoadDashboardWidget);
}
