import { takeLatest, put, call } from 'redux-saga/effects';
import * as types from '../../action/ActionType';
import {
    GetInstructorDetail
} from '../../api/admin/DetailsDataAPI';

/**
 * Get trend analysis
 * @param {*} action
 */

export function* onLoadInstructor() {
    const { response, error } = yield call(GetInstructorDetail);
    if (response) {
        yield put({ type: types.FETCH_ADMIN_INSTRUCTOR_DATA_SUCCESS, payload: response?.data });
    } else {
        yield put({ type: types.FETCH_ADMIN_INSTRUCTOR_DATA_FAIL, payload: error });
    }
}

export function* GetInstructorData() {
    yield takeLatest(types.FETCH_ADMIN_INSTRUCTOR_DATA_START, onLoadInstructor);
}
