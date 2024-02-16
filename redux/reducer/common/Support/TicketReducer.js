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
        ticketError: action.payload,
      };
      case types.FETCH_CREATE_TICKET_RESPONSE_DATA_START:
        return {
          ...state,
          isLoadingResponse: true,
        };
      case types.FETCH_CREATE_TICKET_RESPONSE_DATA_SUCCESS:
        return {
          ...state,
          isLoadingResponse: false,
          ticketResponse: action.payload,
        };
      case types.FETCH_CREATE_TICKET_RESPONSE_DATA_FAIL:
        return {
          ...state,
          isLoadingResponse: false,
          ticketResponseError: action.payload,
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
        myTicketsData: action.payload,
      };
    case types.FETCH_TICKET_DETAILS_FAIL:
      return {
        ...state,
        isLoading: false,
        myTicketsError: action.payload,
      };
      case types.FETCH_DELETE_TICKET_DETAILS_START:
            return {
                ...state,
                isLoadingRemove: true,
            };
        case types.FETCH_DELETE_TICKET_DETAILS_SUCCESS:
            return {
                ...state,
                isLoadingRemove: false,
                removeData: action.payload,
            };
        case types.FETCH_DELETE_TICKET_DETAILS_FAIL:
            return {
                ...state,
                isLoadingRemove: false,
                removeError: action.payload,
            };
    default:
      return state;
  }
};
export default TicketReducer;
