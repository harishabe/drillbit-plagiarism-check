import { PostFormData,GetMethod } from "../../ApiMethod";
import { BASE_URL_SUPER } from "../../../../utils/BaseUrl";
import END_POINTS from "../../../../utils/EndPoints";
import { PaginationUrl } from "../../../../utils/PaginationUrl";

/**
 * API CALL CREATE TICKET
*/

export const CreateTicketProcess = async (data) => {
  return PostFormData(BASE_URL_SUPER + END_POINTS.CREATE_TICKETING_SYSTEM, data);
};

/**
 * API GET CREATE TICKET
*/

export const GetTicketDetail = async ( paginationPayload) => {
  const url = BASE_URL_SUPER + END_POINTS.TICKET_DETAILS + PaginationUrl(paginationPayload);
  return GetMethod( url );
};
