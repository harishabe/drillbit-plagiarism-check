import { all, fork } from 'redux-saga/effects';
import { userLogin } from './login/Login';
import { DashboardWidget, TopStudent, TrendAnalysis } from './admin/Dashboard';
import { InsDashboardWidget } from './instructor/Dashboard';
import {
    GetInstructorData,
    GetStudentData,
} from './admin/DetailsAdminData';
import {
    GetReportData,
    GetReportDataDownload,
    GetReportViewDownload,
} from './admin/ReportsData';
import { GetClassesData,GetMyFolders } from './instructor/DetailsInstructorData';
import { profileDetails, profileLogoSubmission, profileChangePassword } from './profile/ProfileData';

const saga = [
    fork(userLogin),
    fork(profileDetails),
    fork(profileLogoSubmission),
    fork(profileChangePassword),
    fork(DashboardWidget),
    fork(TopStudent),
    fork(TrendAnalysis),
    fork(GetInstructorData),
    fork(InsDashboardWidget),
    fork(GetReportData),
    fork(GetReportDataDownload),
    fork(GetReportViewDownload),
    fork(GetClassesData),
    fork(GetMyFolders),
    fork(GetStudentData),
    fork(InsDashboardWidget),
];

export default function* rootSaga() {
    yield all([...saga]);
}
