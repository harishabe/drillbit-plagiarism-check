import { all, fork } from 'redux-saga/effects';
import { userLogin } from './login/Login';
import { DashboardWidget, TopStudent, TrendAnalysis } from './admin/Dashboard';
import { InsDashboardWidget } from './instructor/Dashboard';
import {
    GetInstructorData,
    CreateInstructor,
    GetStudentData,
    EditData,
    DeleteData,
    DeleteStudentData,
    DeactivateData,
    GetInstructorStudentStats,
    GetCsvReportStats
} from './admin/DetailsAdminData';
import {
    GetReportData,
    GetReportDataDownload,
    GetReportViewDownload,
    GetSubmissionDownload
} from './admin/ReportsData';
import {
    GetClassesData,
    GetMyFolders,
    CreateClass,
    CreateFolder,
    CreateStudent,
    CreateAssignment
} from './instructor/DetailsInstructorData';
import {
    GetStudentClasses,
    GetStudentAssignments,
    GetStudentSubmissions
} from './student/DetailsStudentData';
import {
    profileDetails,
    profileLogoSubmission,
    profileChangePassword
} from './profile/ProfileData';

const saga = [
    fork(userLogin),
    fork(profileDetails),
    fork(profileLogoSubmission),
    fork(profileChangePassword),
    fork(DashboardWidget),
    fork(TopStudent),
    fork(TrendAnalysis),
    fork(GetInstructorData),
    fork(GetInstructorStudentStats),
    fork(GetCsvReportStats),
    fork(CreateInstructor),
    fork(InsDashboardWidget),
    fork(GetReportData),
    fork(GetReportDataDownload),
    fork(GetReportViewDownload),
    fork(GetSubmissionDownload),
    fork(GetClassesData),
    fork(GetStudentClasses),
    fork(GetStudentAssignments),
    fork(GetStudentSubmissions),
    fork(CreateClass),
    fork(CreateStudent),
    fork(CreateAssignment),
    fork(GetMyFolders),
    fork(CreateFolder),
    fork(GetStudentData),
    fork(InsDashboardWidget),
    fork(EditData),
    fork(DeleteData),
    fork(DeleteStudentData),
    fork(DeactivateData),
];

export default function* rootSaga() {
    yield all([...saga]);
}
