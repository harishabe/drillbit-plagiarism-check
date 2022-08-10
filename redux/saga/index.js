import { all, fork } from 'redux-saga/effects';
import { userLogin, userForgetPassword } from './login/Login';
import { DashboardWidget, TopStudent, TrendAnalysis } from './admin/Dashboard';
import { InsDashboardWidget } from './instructor/Dashboard';
import {
    GetInstructorData,
    CreateInstructor,
    GetDownloadTemplate,
    UploadMultipleInstructor,
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
    GetStudentListData,
    EnrollStudentListData,
    GetClassesAssignmentData,
    GetMyFolders,
    GetRepoData,
    RepoUploadData,
    CreateClass,
    CreateFolder,
    CreateStudent,
    GetDownloadStudentTemplate,
    UploadMultipleStudent,
    CreateAssignmentDetail,
    EditClassesData,
    EditStudentsData,
    EditAssignmentsData,
    EditMyFolderData,
    DeleteClasses,
    DeleteStudents,
    DeleteAssignments,
    DeleteMyFolders,
} from './instructor/DetailsInstructorData';
import { 
    GetSubmissionData,
    EditSubmissionDetail,
    SaveToRepo,
    InstructorFeedbackDetail,
    UploadSubmissionFile,
    DeleteSubmissionFile,
    DownloadSubmissionDetail
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
    fork(userForgetPassword),
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
    fork(GetDownloadTemplate),
    fork(UploadMultipleInstructor),
    fork(InsDashboardWidget),
    fork(GetReportData),
    fork(GetReportDataDownload),
    fork(GetReportViewDownload),
    fork(GetSubmissionDownload),
    fork(GetClassesData),
    fork(GetClassesStudentData),
    fork(GetStudentListData),
    fork(EnrollStudentListData),
    fork(GetClassesAssignmentData),
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
    fork(EditStudentsData),
    fork(EditAssignmentsData),
    fork(DeleteClasses),
    fork(CreateStudent),
    fork(GetDownloadStudentTemplate),
    fork(UploadMultipleStudent),
    fork(CreateAssignmentDetail),
    fork(DeleteStudents),
    fork(DeleteAssignments),
    fork(EditSubmissionDetail),
    fork(SaveToRepo),
    fork(InstructorFeedbackDetail),
    fork(GetMyFolders),
    fork(CreateFolder),
    fork(EditMyFolderData),
    fork(DeleteMyFolders),
    fork(GetRepoData),
    fork(RepoUploadData),
    fork(GetSubmissionData),
    fork(UploadSubmissionFile),
    fork(DeleteSubmissionFile),
    fork(DownloadSubmissionDetail),
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
