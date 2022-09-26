import { all, fork } from 'redux-saga/effects';
import { userLogin, userForgetPassword } from './login/Login';
import { DashboardWidget, TopStudent, TrendAnalysis, GetRenewalValidity } from './admin/Dashboard';
import {
    GetDownloadFileData,
    GetFolderSubmissionData,
    DeleteFolderSubmissionFile,
    DownloadSubmissionDetail,
} from './common/Submission/DetailSubmissionData';
import { InsDashboardWidget } from './instructor/Dashboard';
import {
    GetInstructorData,
    CreateInstructor,
    GetDownloadTemplate,
    UploadMultipleInstructor,
    GetStudentData,
    GetAdminRepoData,
    RepoAdminUploadData,
    RemoveRepositaryDetails,
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
    GetAdminIntegrationData,
    GetAdminIntegrationType,
    UploadAdminIntegration,
    ChangeConfiguration
} from './admin/IntegrationAdminData';
import {
    GetClassesData,
    GetClassesStudentData,
    GetStudentListData,
    EnrollStudentListData,
    GetClassesAssignmentData,
    GetMyFolders,
    GetRepoData,
    RepoUploadData,
    RemoveRepositaryInstructorDetails,
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
    DeleteMyFolders    
} from './instructor/DetailsInstructorData';
import { 
    GetSubmissionData,
    EditSubmissionDetail,
    SaveToRepo,
    InstructorFeedbackDetail,
    UploadSubmissionFile,
    UploadExtractedFile,
    DeleteSubmissionFile,
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
    GetDownloadAssignmentInstructions
} from './student/DetailsStudentData';
import {
    profileDetails,
    profileLogoSubmission,
    profileChangePassword
} from './profile/ProfileData';
import {
    SuperDashboardWidget,
    GetExtremeRef,
    CreateExtremeRefAccount,
    SuperDropdownList
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
    fork(GetRenewalValidity),
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
    fork(GetDownloadFileData),
    fork(GetFolderSubmissionData),
    fork(DeleteFolderSubmissionFile),
    fork(GetDownloadAssignmentInstructions),
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
    fork(RemoveRepositaryInstructorDetails),
    fork(GetSubmissionData),
    fork(UploadSubmissionFile),
    fork(UploadExtractedFile),
    fork(DeleteSubmissionFile),
    fork(DownloadSubmissionDetail),
    fork(GetStudentData),
    fork(GetAdminRepoData),
    fork(RepoAdminUploadData),
    fork(RemoveRepositaryDetails),
    fork(EditData),
    fork(DeleteData),
    fork(DeleteStudentData),
    fork(DeactivateData),
    fork(GetAdminIntegrationData),
    fork(GetAdminIntegrationType),    
    fork(UploadAdminIntegration),
    fork(ChangeConfiguration),    
    fork(SuperDashboardWidget),    
    fork(CreateExtremeRefAccount),
    fork(SuperDropdownList),
    fork(GetExtremeRef),
];

export default function* rootSaga() {
    yield all([...saga]);
}
