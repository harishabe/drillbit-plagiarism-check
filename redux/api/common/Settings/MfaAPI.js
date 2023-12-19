import { PutMethod, PostMethod } from "../../ApiMethod";
import { BASE_URL_LOGIN_MFA } from "../../../../utils/BaseUrl";
import END_POINTS from '../../../../utils/EndPoints';

export const MfaActivateOption = async (url) => {
    return PutMethod(url);
};

export const MFALoginData = async () => {
    const url = BASE_URL_LOGIN_MFA + END_POINTS.MFA_LOGIN;
    return PostMethod(url);
};