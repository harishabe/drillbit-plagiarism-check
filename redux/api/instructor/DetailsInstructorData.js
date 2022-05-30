import END_POINTS from '../../../utils/EndPoints';
import { GetMethod } from './../ApiMethod';

/**
 * API CALL FOR CLASSES DATA
 */

export const GetClassesDetail = async () => {
    const url = END_POINTS.INSTRUCTOR_MY_CLASSES;
    return GetMethod(url);
};
