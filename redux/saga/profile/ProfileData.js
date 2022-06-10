import { takeLatest, put, call } from 'redux-saga/effects';
import * as types from '../../action/ActionType';
import {
    GetProfile,
    SubmitLogo,
    ChangePassword
} from '../../api/profile/ProfileAPI';
import toastrValidation from '../../../utils/ToastrValidation';

/**
 * User Profile
 * @param {*} action
 */

export function* onLoadProfile() {
    const { response, error } = yield call(GetProfile);
    if (response) {
        yield put({ type: types.FETCH_PROFILE_DATA_SUCCESS, payload: response?.data });
    } else {
        yield put({ type: types.FETCH_PROFILE_DATA_FAIL, payload: error });
        toastrValidation(error);
    }
}

export function* profileDetails() {
    yield takeLatest(types.FETCH_PROFILE_DATA_START, onLoadProfile);
}


/**
 * User Profile - Logo Submission
 * @param {*} action
 */

export function* onLoadProfileLogo(action) {
    const { response, error } = yield call(SubmitLogo, action.query);
    if (response) {
        yield put({ type: types.FETCH_PROFILE_LOGO_SUCCESS, payload: response?.data });
    } else {
        yield put({ type: types.FETCH_PROFILE_LOGO_FAIL, payload: error });
        toastrValidation(error);
    }
}

export function* profileLogoSubmission() {
    yield takeLatest(types.FETCH_PROFILE_LOGO_START, onLoadProfileLogo);
}


/**
 * User Profile - Change Password
 * @param {*} action
 */

export function* onLoadChangePassword(action) {
    const { response, error } = yield call(ChangePassword, action.query);
    if (response) {
        yield put({ type: types.FETCH_PROFILE_CHANGE_PASSWORD_SUCCESS, payload: response?.data });
    } else {
        yield put({ type: types.FETCH_PROFILE_CHANGE_PASSWORD_FAIL, payload: error });
        toastrValidation(error);
    }
}

export function* profileChangePassword() {
    yield takeLatest(types.FETCH_PROFILE_CHANGE_PASSWORD_START, onLoadChangePassword);
}
