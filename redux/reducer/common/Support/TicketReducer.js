import * as types from "../../../action/CommonActionType";

const TicketReducer = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_TICKET_CREATE_DATA_START:
      return {
        ...state,
        isLoadingTicketProcess: true,
      };
    case types.FETCH_TICKET_CREATE_DATA_SUCCESS:
      return {
        ...state,
        isLoadingTicketProcess: false,
        ticketData: action.payload,
      };
    case types.FETCH_TICKET_CREATE_DATA_FAIL:
      return {
        ...state,
        isLoadingTicketProcess: false,
        ticketData: action.payload,
      };
    case types.FETCH_TICKET_DETAILS_START:
      return {
        ...state,
        isLoading: true,
      };
    case types.FETCH_TICKET_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        myTickets: action.payload,
      };
    case types.FETCH_TICKET_DETAILS_FAIL:
      return {
        ...state,
        isLoading: false,
        myTicketsError: action.payload,
      };
    default:
      return state;
  }
};
export default TicketReducer;
