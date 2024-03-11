import { PostFormData,GetMethod, DeleteMethod, PutMethod } from "../../ApiMethod";
import { PaginationUrl } from "../../../../utils/PaginationUrl";
import { BASE_URL_SUPER } from "../../../../utils/BaseUrl";
import END_POINTS from "../../../../utils/EndPoints";

/**
 * API CALL CREATE TICKET
*/

export const CreateTicketProcess = async (url, data) => {
  return PostFormData(url, data);
};

/**
 * API CALL CREATE TICKET RESPONSE
*/

export const CreateTicketResponseProcess = async (url, data) => {
  return PostFormData(url, data);
};

/**
 * API GET  TICKET DATA
*/

export const GetTicketDetail = async ( apiUrl, paginationPayload) => {
  const url = apiUrl+ PaginationUrl(paginationPayload);
  return GetMethod(url);
};

/**
 * API GET  TICKET ID DATA
*/

export const GetTicketIdDetail = async ( url) => {
  return GetMethod(url);
};
/**
 * API DELETE  TICKET
*/

export const DeleteTicketData = async (ticketID) => {
  const url = BASE_URL_SUPER + END_POINTS.ADMIN_TICKET_DETAILS + ticketID;
  return DeleteMethod(url);
};

/**
 * API CLOSE  TICKET
*/
export const CloseTicketDetail = async (url, data) => {
  return PutMethod(url, data);
};
