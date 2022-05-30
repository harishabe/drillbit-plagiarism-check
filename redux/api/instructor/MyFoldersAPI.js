import END_POINTS from '../../../utils/EndPoints';
import { GetMethod } from './../ApiMethod';

/**
 * API CALL FOR CLASSES DATA
 */

export const GetMyFoldersDetail = async () => {
    const url = END_POINTS.INSTRUCTOR_MY_FOLDERS;
    return GetMethod(url);
};
