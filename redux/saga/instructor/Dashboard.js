import { takeLatest, put, call } from 'redux-saga/effects';
import * as types from '../../action/ActionType';
import {
    GetWidgetData,
    GetTopStudent,
} from '../../api/instructor/DashboardAPI';
import toastrValidation from '../../../utils/ToastrValidation';

/**
 * Get instructor dashboard widget count details
 * No. of instructor
 * No. of student
 * No. of submissions
 * @param {*} action
 */

export function* onLoadDashboardWidget(action) {
    const { response, error } = yield call(GetWidgetData, action.query);
    if (response) {
        yield put({
            type: types.FETCH_INSTRUCTOR_DASH_WIDGET_SUCCESS,
            payload: response?.data,
        });
    } else {
        yield put({
            type: types.FETCH_INSTRUCTOR_DASH_WIDGET_FAIL,
            payload: error,
        });
        toastrValidation(error);
    }
}

export function* InsDashboardWidget() {
    yield takeLatest(
        types.FETCH_INSTRUCTOR_DASH_WIDGET_START,
        onLoadDashboardWidget
    );
}

/**
 * Get top student details
 * @param {*} action
 */

export function* onLoadTopStudent() {
    const { response, error } = yield call(GetTopStudent);
    if (response) {
        yield put({
            type: types.FETCH_INSTRUCTOR_DASH_TOP_STUDENT_SUCCESS,
            payload: response?.data,
        });
    } else {
        yield put({
            type: types.FETCH_INSTRUCTOR_DASH_TOP_STUDENT_FAIL,
            payload: error,
        });
        toastrValidation(error);
    }
}

export function* TopInstructorStudent() {
    yield takeLatest(
        types.FETCH_INSTRUCTOR_DASH_TOP_STUDENT_START,
        onLoadTopStudent
    );
}
