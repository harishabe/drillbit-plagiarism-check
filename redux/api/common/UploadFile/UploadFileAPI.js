import END_POINTS from '../../../../utils/EndPoints';
import { BASE_URL_UPLOAD } from '../../../../utils/BaseUrl';
import { GetMethod, PostMethod, PostMethodEN } from '../../ApiMethod';

/**
 * API CALL LANGUAGE LIST
 */

export const LanguageListDetail = async () => {
    let url = BASE_URL_UPLOAD + END_POINTS.SUBMISSION_INPUTS
    return GetMethod(url);
};

/**
 * API CALL UPLOAD GOOGLE DRIVE
 */

export const UploadFileDriveDetail = async (url, data) => {
    return PostMethodEN(url, data);
};

/**
 * API CALL UPLOAD NON ENGLISH FILE
 */

export const UploadNonEngFile = async (url, data) => {
    return PostMethodEN(url, data);
};

/**
 * API CALL REPOSITORY UPLOAD
 */

export const RepositoryUploadDetail = async (url, data) => {
    return PostMethod(url, data);
};
