import END_POINTS from '../../../../utils/EndPoints';
import { BASE_URL_EXTREM } from '../../../../utils/BaseUrl';
import { GetMethod } from '../../ApiMethod';

/**
 * API CALL LANGUAGE LIST
 */

export const LanguageListDetail = async () => {
    let url = BASE_URL_EXTREM + END_POINTS.LANGUAGE_LIST
    return GetMethod(url);
};
