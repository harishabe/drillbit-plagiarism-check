import { CreateTicketProcess, GetTicketDetail } from "../../../api/common/Support/TicketAPI";
import toastrValidation from "../../../../utils/ToastrValidation";
import { takeLatest, put, call } from "redux-saga/effects";
import * as types from "../../../action/CommonActionType";

/**
 * Create Ticket
 * @param {*} action
 */
export function* onCreateTicketData(action) {
  const { response, error } = yield call(CreateTicketProcess, action.data);
  if (response) {
    yield put({
      type: types.FETCH_TICKET_CREATE_DATA_SUCCESS,
      payload: response?.data,
    });
  } else {
    yield put({
      type: types.FETCH_TICKET_CREATE_DATA_FAIL,
      payload: error,
    });
    toastrValidation(error);
  }
}

export function* GetTicketSubmissionData() {
  yield takeLatest(types.FETCH_TICKET_CREATE_DATA_START, onCreateTicketData);
}

/**
 * Get folder data analysis
 * @param {*} action
 */

export function* GetAllTickets(action) {
  const { response, error } = yield call(GetTicketDetail, action.url);
  if (response) {
      yield put({
          type: types.FETCH_TICKET_DETAILS_SUCCESS,
          payload: response?.data,
      });
  } else {
      yield put({
          type: types.FETCH_TICKET_DETAILS_FAIL,
          payload: error,
      });
  }
}

export function* GetMyTicket() {
  yield takeLatest(types.FETCH_TICKET_DETAILS_START, GetAllTickets);
}