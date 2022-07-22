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
    GetClassesStudentData,
    GetMyFolders,
    GetFolderSubmissionData,
    CreateClass,
    CreateFolder,
    CreateStudent,
    CreateAssignment,
    EditClassesData,
    EditMyFolderData,
    DeleteClasses,
    DeleteMyFolders,
    UploadSubmissionFile,
    DeleteSubmissionFile
} from './instructor/DetailsInstructorData';
import {
    GetStudentDashboard,
    GetStudentClasses,
    GetStudentAssignments,
    GetStudentSubmissions,
    GetStudentSubmissionHeader,
    DownloadStudentCsv,
    GetStudentQna,
    GetStudentFeedback,
    SendQnaAnswer,
    SendSubmissionAnswer,
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
    fork(GetClassesStudentData),
    fork(GetStudentDashboard),
    fork(GetStudentClasses),
    fork(GetStudentAssignments),
    fork(GetStudentSubmissions),
    fork(GetStudentSubmissionHeader),
    fork(DownloadStudentCsv),
    fork(GetStudentQna),
    fork(GetStudentFeedback),
    fork(SendQnaAnswer),
    fork(SendSubmissionAnswer),
    fork(CreateClass),
    fork(EditClassesData),
    fork(DeleteClasses),
    fork(CreateStudent),
    fork(CreateAssignment),
    fork(GetMyFolders),
    fork(CreateFolder),
    fork(EditMyFolderData),
    fork(DeleteMyFolders),
    fork(GetFolderSubmissionData),
    fork(UploadSubmissionFile),
    fork(DeleteSubmissionFile),
    fork(GetStudentData),
    fork(EditData),
    fork(DeleteData),
    fork(DeleteStudentData),
    fork(DeactivateData),
];

export default function* rootSaga() {
    yield all([...saga]);
}
