import { PostFormData,GetMethod, DeleteMethod } from "../../ApiMethod";
import { PaginationUrl } from "../../../../utils/PaginationUrl";

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
 * API GET CREATE TICKET
*/

export const GetTicketDetail = async ( apiUrl, paginationPayload) => {
  const url = apiUrl+ PaginationUrl(paginationPayload);
  return GetMethod(url);
};
/**
 * API DELETE  TICKET
*/

export const DeleteTicketData = async (url) => {
  return DeleteMethod(url);
};