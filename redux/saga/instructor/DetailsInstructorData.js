import { takeLatest, put, call } from 'redux-saga/effects';
import * as types from '../../action/ActionType';
import { GetClassesDetail } from '../../api/instructor/DetailsInstructorData';

/**
 * Get trend analysis
 * @param {*} action
 */

export function* onLoadClasses(action) {
    const { response, error } = yield call(GetClassesDetail,  action.paginationPayload);
    if (response) {
        yield put({
            type: types.FETCH_INSTRUCTOR_CLASSES_DATA_SUCCESS,
            payload: response?.data,
        });
    } else {
        yield put({
            type: types.FETCH_INSTRUCTOR_CLASSES_DATA_FAIL,
            payload: error,
        });
    }
}

export function* GetClassesData() {
    yield takeLatest(types.FETCH_INSTRUCTOR_CLASSES_DATA_START, onLoadClasses);
}
