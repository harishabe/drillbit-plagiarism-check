import * as types from "../../CommonActionType";

export const CreateTicket = (data) => {
  return {
    type: types.FETCH_TICKET_CREATE_DATA_START,
    data: data
  };
};

export const GetTicketData = () => {
  return {
      type: types.FETCH_TICKET_DETAILS_START
  };
};