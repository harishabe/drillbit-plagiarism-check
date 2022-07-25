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
    CreateClass,
    CreateFolder,
    CreateStudent,
    CreateAssignment,
    EditClassesData,
    EditMyFolderData,
    DeleteClasses,
    DeleteStudents,
    DeleteMyFolders,
} from './instructor/DetailsInstructorData';
import { 
    GetSubmissionData,
    EditSubmissionDetail,
    SaveToRepo,
    InstructorFeedbackDetail,
    UploadSubmissionFile,
    DeleteSubmissionFile
} from './instructor/SubmissionData'
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
import {
    GetExtremeRef,
    CreateExtremeRefAccount,
} from './super/DetailsSuperAdminData';

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
    fork(DeleteStudents),
    fork(EditSubmissionDetail),
    fork(SaveToRepo),
    fork(InstructorFeedbackDetail),
    fork(GetMyFolders),
    fork(CreateFolder),
    fork(EditMyFolderData),
    fork(DeleteMyFolders),
    fork(GetSubmissionData),
    fork(UploadSubmissionFile),
    fork(DeleteSubmissionFile),
    fork(GetStudentData),
    fork(EditData),
    fork(DeleteData),
    fork(DeleteStudentData),
    fork(DeactivateData),
    fork(CreateExtremeRefAccount),
    fork(GetExtremeRef),
];

export default function* rootSaga() {
    yield all([...saga]);
}
