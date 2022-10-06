import END_POINTS from '../../../../utils/EndPoints';
import { BASE_URL_EXTREM, BASE_URL_UPLOAD } from '../../../../utils/BaseUrl';
import { GetMethod, PostMethod } from '../../ApiMethod';

/**
 * API CALL LANGUAGE LIST
 */

export const LanguageListDetail = async () => {
    let url = BASE_URL_EXTREM + END_POINTS.LANGUAGE_LIST
    return GetMethod(url);
};

/**
 * API CALL UPLOAD GOOGLE DRIVE
 */

export const UploadFileDriveDetail = async (classId, assId, data) => {
    let url = BASE_URL_UPLOAD + `/files/classes/${classId}/assignments/${assId}/drive`
    return PostMethod(url, data);
};
