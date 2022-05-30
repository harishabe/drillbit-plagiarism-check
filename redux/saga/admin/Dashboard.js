import { takeLatest, put, call } from 'redux-saga/effects';
import * as types from '../../action/ActionType';
import {
    GetWidgetData,
    GetTopStudnet,
    GetTrendAnalysis
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



/**
 * Get top student details
 * @param {*} action
 */

 export function* onLoadTopStudent() {
    const { response, error } = yield call(GetTopStudnet);
    if (response) {
        yield put({ type: types.FETCH_ADMIN_DASH_TOP_STUDENT_SUCCESS, payload: response?.data });
    } else {
        yield put({ type: types.FETCH_ADMIN_DASH_TOP_STUDENT_FAIL, payload: error });
        toastrValidation(error);
    }
}

export function* TopStudent() {
    yield takeLatest(types.FETCH_ADMIN_DASH_TOP_STUDENT_START, onLoadTopStudent);
}

/**
 * Get trend analysis
 * @param {*} action
 */

 export function* onLoadTrendAnalysis() {
    const { response, error } = yield call(GetTrendAnalysis);
    if (response) {
        yield put({ type: types.FETCH_ADMIN_DASH_TREND_ANALYSIS_SUCCESS, payload: response?.data });
    } else {
        yield put({ type: types.FETCH_ADMIN_DASH_TREND_ANALYSIS_FAIL, payload: error });
        toastrValidation(error);
    }
}

export function* TrendAnalysis() {
    yield takeLatest(types.FETCH_ADMIN_DASH_TREND_ANALYSIS_START, onLoadTrendAnalysis);
}