import { PostFormData,GetMethod } from "../../ApiMethod";
import { BASE_URL_TICKETING_SYSTEM } from "../../../../utils/BaseUrl";
import END_POINTS from "../../../../utils/EndPoints";

/**
 * API CALL CREATE TICKET
*/

export const CreateTicketProcess = async (data) => {
  return PostFormData(BASE_URL_TICKETING_SYSTEM + END_POINTS.CREATE_TICKETING_SYSTEM, data);
};

export const GetTicketDetail = async () => {
  return GetMethod(BASE_URL_TICKETING_SYSTEM + END_POINTS.TICKET_DETAILS);
};
