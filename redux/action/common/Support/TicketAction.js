import * as types from "../../CommonActionType";

export const CreateTicket = ( url, data) => {
  return {
    type: types.FETCH_TICKET_CREATE_DATA_START,
    url: url,
    data: data
  };
};

export const CreateTicketResponse = ( url, data) => {
  return {
    type: types.FETCH_CREATE_TICKET_RESPONSE_DATA_START,
    url: url,
    data: data
  };
};

export const GetTicketData = ( url, paginationPayload) => {
  return {
      type: types.FETCH_TICKET_DETAILS_START,url: url, paginationPayload: paginationPayload
  };
};

export const GetTicketIdData = ( url) => {
  return {
      type: types.FETCH_TICKET_DETAILS_ID_START,url: url,
  };
};

/**
 * Remove ticket
 */
export const DeleteTicket = (ticketID) => {
  return {
      type: types.FETCH_DELETE_TICKET_DETAILS_START,ticketID: ticketID
  };
};