import END_POINTS from '../../../utils/EndPoints';
import { GetMethod } from './../ApiMethod';
import PaginationUrl from '../../../utils/PaginationUrl';

/**
 * API CALL FOR CLASSES DATA
 */

export const GetClassesDetail = async (paginationPayload) => {
    const url = END_POINTS.INSTRUCTOR_MY_CLASSES + PaginationUrl(paginationPayload);
    return GetMethod(url);
};
