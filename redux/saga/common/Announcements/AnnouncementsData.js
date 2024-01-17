import { takeLatest, put, call } from "redux-saga/effects";
import * as types from "../../../action/CommonActionType";
import { CreateAnnouncements, GetAnnouncementDetail } from "../../../api/common/Announcements/AnnouncementsAPI";
import toastrValidation from "../../../../utils/ToastrValidation";
import { PaginationValue } from "../../../../utils/PaginationUrl";

/**
 * create announcements
 * @param {*} action
 */
export function* onCreateAnnouncements(action) {
    const { response, error } = yield call(CreateAnnouncements, action.url, action.query);
    if (response) {
        yield put({ type: types.FETCH_CREATE_ANNOUNCEMENTS_SUCCESS, payload: response?.data });
        // yield put({ type: types.FETCH_ANNOUNCEMENT_DATA_START, paginationPayload:{ ...PaginationValue, field:'title'} });
        toastrValidation(response);
    } else {
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


