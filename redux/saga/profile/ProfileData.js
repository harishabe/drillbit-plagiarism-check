import { takeLatest, put, call } from 'redux-saga/effects';
import * as types from '../../action/ActionType';
import {
    GetProfile,
    UploadLogo,
    ChangePassword
} from '../../api/profile/ProfileAPI';
import toastrValidation from '../../../utils/ToastrValidation';
import { BASE_URL_EXTREM, BASE_URL_PRO } from '../../../utils/BaseUrl';
import END_POINTS from '../../../utils/EndPoints';
import END_POINTS_PRO from '../../../utils/EndPointPro';

/**
 * User Profile
 * @param {*} action
 */

export function* onLoadProfile(action) {
    const { response, error } = yield call(GetProfile, action.url);
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
    const { response, error } = yield call(UploadLogo, action.url, action.query);
    if (response) {
        yield put({ type: types.FETCH_PROFILE_LOGO_SUCCESS, payload: response?.data });
        yield put({
            type: types.FETCH_PROFILE_DATA_START,
            url: action.url.split('/')[3] === 'extreme' ?
                BASE_URL_EXTREM + END_POINTS.PROFILE_DATA + sessionStorage.getItem('role') + '/accountInformation' :
                BASE_URL_PRO + END_POINTS_PRO.ADMIN_PROFILE_DATA,
        });
        toastrValidation(response);
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
    const { response, error } = yield call(ChangePassword, action);
    if (response) {
        yield put({ type: types.FETCH_PROFILE_CHANGE_PASSWORD_SUCCESS, payload: response?.data });
        toastrValidation(response);
    } else {
        yield put({ type: types.FETCH_PROFILE_CHANGE_PASSWORD_FAIL, payload: error });
        toastrValidation(error);
    }
}

export function* profileChangePassword() {
    yield takeLatest(types.FETCH_PROFILE_CHANGE_PASSWORD_START, onLoadChangePassword);
}
