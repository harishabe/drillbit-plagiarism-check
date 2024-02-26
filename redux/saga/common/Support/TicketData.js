import {
  CreateTicketProcess,
  GetTicketDetail,
  CreateTicketResponseProcess,
  GetTicketIdDetail,
  DeleteTicketData
} from "../../../api/common/Support/TicketAPI";
import toastrValidation from "../../../../utils/ToastrValidation";
import { takeLatest, put, call } from "redux-saga/effects";
import * as types from "../../../action/CommonActionType";
import { PaginationValue } from "../../../../utils/PaginationUrl";
import END_POINTS from "../../../../utils/EndPoints";
import { BASE_URL_SUPER } from "../../../../utils/BaseUrl";

/**
 * Create Ticket
 * @param {*} action
 */
export function* onCreateTicketData(action) {
  const { response, error } = yield call( CreateTicketProcess, action.url, action.data );
  if (response) {
    yield put({ type: types.FETCH_TICKET_CREATE_DATA_SUCCESS, payload: response?.data });
    yield put({ type: types.FETCH_TICKET_DETAILS_START, 
      url: BASE_URL_SUPER + END_POINTS.USER_TICKET_DETAILS ,
      paginationPayload: PaginationValue,
    });
    toastrValidation(response);
  } else {
    yield put({ type: types.FETCH_TICKET_CREATE_DATA_FAIL, payload: error });
    toastrValidation(error);
  }
}

export function* CreateTicketSubmissionData() {
  yield takeLatest(types.FETCH_TICKET_CREATE_DATA_START, onCreateTicketData);
}

/**
 * Create Response
 * @param {*} action
 */
export function* onCreateTicketResponse(action) {
  const { response, error } = yield call( CreateTicketResponseProcess, action.url, action.data );
  if (response) { 
    yield put({ type: types.FETCH_CREATE_TICKET_RESPONSE_DATA_SUCCESS, payload: response?.data });
    yield put({
      type: types.FETCH_TICKET_DETAILS_START,
      url: 
      action.url.includes('admin')?
      BASE_URL_SUPER + END_POINTS.ADMIN_TICKET_DETAILS + "/" + action.url.split('/')[7] + "/responses" :
      BASE_URL_SUPER + END_POINTS.USER_TICKET_DETAILS + "/" +  action.url.split('/')[7] + "/responses" ,
      paginationPayload: { ...PaginationValue, size: 5000},
    });
    toastrValidation(response);
  } else {
    yield put({
      type: types.FETCH_CREATE_TICKET_RESPONSE_DATA_FAIL,
      payload: error,
    });
    toastrValidation(error);
  }
}

export function* CreateTicketResponseData() {
  yield takeLatest(types.FETCH_CREATE_TICKET_RESPONSE_DATA_START, onCreateTicketResponse);
}

/**
 * Get ticket data 
 * @param {*} action
 */

export function* onLoadAllTickets(action) {
  const { response, error } = yield call(
    GetTicketDetail,
    action.url,
    action.paginationPayload
  );
  if (response) {
    yield put({
      type: types.FETCH_TICKET_DETAILS_SUCCESS,
      payload: response?.data,
    });
    toastrValidation(response);
  } else {
    yield put({
      type: types.FETCH_TICKET_DETAILS_FAIL,
      payload: error,
    });
    toastrValidation(error);
  }
}

export function* GetMyTicket() {
  yield takeLatest(types.FETCH_TICKET_DETAILS_START, onLoadAllTickets);
}

/**
 * Get ticket data id
 * @param {*} action
 */

export function* onLoadAllIdTickets(action) {
  const { response, error } = yield call(
    GetTicketIdDetail,
    action.url,
  );
  if (response) {
    yield put({
      type: types.FETCH_TICKET_DETAILS_ID_SUCCESS,
      payload: response?.data,
    });
    toastrValidation(response);
  } else {
    yield put({
      type: types.FETCH_TICKET_DETAILS_ID_FAIL,
      payload: error,
    });
    toastrValidation(error);
  }
}

export function* GetMyIdTicket() {
  yield takeLatest(types.FETCH_TICKET_DETAILS_ID_START, onLoadAllIdTickets);
}

/**
 * Delete ticket data 
 * @param {*} action
 */

export function* onLoadDeleteTicket(action) {
  const { response, error } = yield call(DeleteTicketData, action.ticketID);
  if (response) {
      yield put({ type: types.FETCH_DELETE_TICKET_DETAILS_SUCCESS, payload: response?.data });
      toastrValidation(response);
  } else {
      yield put({
          type: types.FETCH_DELETE_TICKET_DETAILS_FAIL,
          payload: error,
      });
      toastrValidation(error);
  }
}

export function* DeleteTicketDetails() {
  yield takeLatest(types.FETCH_DELETE_TICKET_DETAILS_START, onLoadDeleteTicket);
}
