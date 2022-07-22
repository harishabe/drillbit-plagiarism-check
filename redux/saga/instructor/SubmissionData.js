import { takeLatest, put, call } from 'redux-saga/effects';
import * as types from '../../action/ActionType';
import {
    GetSubmissionGradingQna
} from '../../api//instructor/DetailsSubmissionAPI';
import toastrValidation from '../../../utils/ToastrValidation';

/**
 * Get report view & download
 * @param {*} action
 */


export function* onLoadSubmissionGrading(action) {
    const { response, error } = yield call(GetSubmissionGradingQna, action.url);
    if (response) {
        yield put({
            type: types.FETCH_INSTRUCTOR_SUBMISSIONS_GRADING_QNA_SUCCESS,
            payload: response?.data,
        });
        toastrValidation(response)
    } else {
        yield put({
            type: types.FETCH_INSTRUCTOR_SUBMISSIONS_GRADING_QNA_FAIL,
            payload: error,
        });
        toastrValidation(error)
    }
}

export function* GetSubmissionQnaGrading() {
    yield takeLatest(types.FETCH_INSTRUCTOR_SUBMISSIONS_GRADING_QNA_START, onLoadSubmissionGrading);
}