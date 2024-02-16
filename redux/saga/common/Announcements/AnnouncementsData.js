import { takeLatest, put, call } from "redux-saga/effects";
import * as types from "../../../action/CommonActionType";
import { CreateAnnouncements, GetAnnouncementDetail, GetMyAnnouncementDetail } from "../../../api/common/Announcements/AnnouncementsAPI";
import toastrValidation from "../../../../utils/ToastrValidation";
import { PaginationValue } from "../../../../utils/PaginationUrl";
import { BASE_URL_EXTREM, BASE_URL_PRO, BASE_URL } from '../../../../utils/BaseUrl';
import END_POINTS from '../../../../utils/EndPoints';
import END_POINTS_PRO from '../../../../utils/EndPointPro'

/**
 * create announcements
 * @param {*} action
 */
export function* onCreateAnnouncements(action) {
    const { response, error } = yield call(CreateAnnouncements, action.url, action.query);
    if (response) {
        yield put({ type: types.FETCH_CREATE_ANNOUNCEMENTS_SUCCESS, payload: response?.data });
        yield put({
            type: types.FETCH_MY_ANNOUNCEMENT_DATA_START,
            url:
              action.url.includes('extreme/instructor') ?
                 BASE_URL_EXTREM + END_POINTS.GET_INSTRUCTOR_MY_ANNOUNCEMENTS :
                 action.url.includes('consortium') ?
                 BASE_URL + END_POINTS.GET_CONSORTIUM_MY_ANNOUNCEMENTS :
                 action.url.includes('/extreme/admin') ?
                 BASE_URL_EXTREM + END_POINTS.GET_ADMIN_MY_ANNOUNCEMENTS :
                 action.url.includes('/pro/admin') ?
                 BASE_URL_PRO + END_POINTS_PRO.GET_ADMIN_MY_ANNOUNCEMENTS : '',
            paginationPayload: { ...PaginationValue, field: 'ann_id' } 
          });
          toastrValidation(response);
        }
           else {
        yield put({ type: types.FETCH_CREATE_ANNOUNCEMENTS_FAIL, payload: error });
        toastrValidation(error);
    }
}

export function* AnnouncementsCreateData() {
    yield takeLatest(types.FETCH_CREATE_ANNOUNCEMENTS_START, onCreateAnnouncements);
}

/**
 * Get announcements details
 * @param {*} action
 */

export function* onLoadAnnouncements(action) {
    const { response, error } = yield call(GetAnnouncementDetail, action.url, action.paginationPayload);
    if (response) {
        yield put({
            type: types.FETCH_ANNOUNCEMENT_DATA_SUCCESS,
            payload: response?.data,
        });
    } else {
        yield put({
            type: types.FETCH_ANNOUNCEMENT_DATA_FAIL,
            payload: error,
        });
    }
}

export function* GetAnnouncementData() {
    yield takeLatest(types.FETCH_ANNOUNCEMENT_DATA_START, onLoadAnnouncements);
}

export function* onLoadMyAnnouncements(action) {
    const { response, error } = yield call(GetMyAnnouncementDetail, action.url, action.paginationPayload);
    if (response) {
        yield put({
            type: types.FETCH_MY_ANNOUNCEMENT_DATA_SUCCESS,
            payload: response?.data,
        });
    } else {
        yield put({
            type: types.FETCH_MY_ANNOUNCEMENT_DATA_FAIL,
            payload: error,
        });
    }
}

export function* GetMyAnnouncementData() {
    yield takeLatest(types.FETCH_MY_ANNOUNCEMENT_DATA_START, onLoadMyAnnouncements);
}


