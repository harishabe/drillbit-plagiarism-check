import END_POINTS from '../../../utils/EndPoints';
import { GetMethod } from './../ApiMethod';

/**
 * API CALL FOR INSTRUCTOR DATA
 */

export const GetInstructorDetail = async () => {
    const url = END_POINTS.ADMIN_INSTRUCTOR;
    return GetMethod(url);
};

