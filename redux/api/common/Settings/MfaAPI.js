import { PutMethod, LoginPostMethod } from "../../ApiMethod";
import { BASE_URL } from "../../../../utils/BaseUrl";
import END_POINTS from '../../../../utils/EndPoints';

export const MfaActivateOption = async (url) => {
    return PutMethod(url);
};

export const MFALoginData = async (data) => {
    const url = BASE_URL + END_POINTS.MFA_LOGIN;
    return LoginPostMethod(url, data);
};