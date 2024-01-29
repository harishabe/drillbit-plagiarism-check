import { all, fork } from 'redux-saga/effects';
import { userLogin, userForgetPassword, userResetPassword } from './login/Login';
import { DocumentChartData, DepartmentChartData } from './common/Dashboard/DashboardData';
import { DashboardWidget, TopStudent, TrendAnalysis, GetRenewalValidity } from './admin/Dashboard';
import {
    GetDownloadFileData,
    GetFolderSubmissionData,
    DeleteFolderSubmissionFile,
    DownloadSubmissionDetail,
    GrammarReportSubmission,
    SaveToRepoBulkDetail,
    GetSubmissionHistoryData,
    GetSubmissionBulkReportDownload,
    GetSubmissionReportDownload,
    GetSubmissionReprocess
} from './common/Submission/DetailSubmissionData';
import {
    LanguageListData,
    UploadFileDriveData,
    UploadFileNonEnglish,
    RepositoryUploadData
} from './common/UploadFile/DetailUploadFile';
import { InsDashboardWidget, InstructorTopStudent } from './instructor/Dashboard';
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
    ChangeConfiguration,
    GetAdminGoogleClassroomData,
    GetAdminGoogleLiveCoursesData,
    GetAdminGoogleImportCoursesData,
    GetAdminGoogleCourseHomeData,
    DeleteIntegration
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
    GetGradingDetail,
    EditSubmissionDetail,
    SaveToRepo,
    InstructorFeedbackDetail,
    InstructorEditFeedback,
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
    DeleteExtremeRefAccount,
    EditExtremeRef,
    SuperDropdownList,
    SuperFolderPathList,
    ExtremeInsListDetail,
    ExtremeStuListDetail,
    EditStudentData,
    GlobalSearchDetail,
    CreateStudentData,
    MakeHimAdminDetail,
    ResendCredentialsDetail
} from './super/DetailsSuperAdminData';
import { MfaActivateData, MFALogin } from './common/Settings/MfaData';
import { AnnouncementsCreateData, GetAnnouncementData, GetMyAnnouncementData} from './common/Announcements/AnnouncementsData';

const saga = [
    fork(userLogin),
    fork(userForgetPassword),
    fork(userResetPassword),
    fork(profileDetails),
    fork(profileLogoSubmission),
    fork(profileChangePassword),
    fork(DashboardWidget),
    fork(DocumentChartData),
    fork(DepartmentChartData),
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
    fork(InstructorTopStudent),
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
    fork(InstructorEditFeedback),
    fork(GetMyFolders),
    fork(CreateFolder),
    fork(EditMyFolderData),
    fork(DeleteMyFolders),
    fork(GetRepoData),
    fork(RepoUploadData),
    fork(RemoveRepositaryInstructorDetails),
    fork(GetSubmissionData),
    fork(GetGradingDetail),
    fork(UploadSubmissionFile),
    fork(UploadExtractedFile),
    fork(DeleteSubmissionFile),
    fork(DownloadSubmissionDetail),
    fork(SaveToRepoBulkDetail),
    fork(GetSubmissionHistoryData),
    fork(GetSubmissionBulkReportDownload),    
    fork(GetSubmissionReportDownload),    
    fork(GetSubmissionReprocess),    
    fork(LanguageListData),
    fork(UploadFileDriveData),
    fork(UploadFileNonEnglish),
    fork(RepositoryUploadData),
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
    fork(DeleteIntegration),
    fork(GetAdminGoogleClassroomData),    
    fork(GetAdminGoogleLiveCoursesData),    
    fork(GetAdminGoogleImportCoursesData),
    fork(GetAdminGoogleCourseHomeData),    
    fork(SuperDashboardWidget),    
    fork(CreateExtremeRefAccount),
    fork(DeleteExtremeRefAccount),
    fork(EditExtremeRef),
    fork(SuperDropdownList),
    fork(SuperFolderPathList),
    fork(ExtremeInsListDetail),
    fork(ExtremeStuListDetail),
    fork(CreateStudentData),
    fork(EditStudentData),
    fork(GlobalSearchDetail),
    fork(MakeHimAdminDetail),
    fork(ResendCredentialsDetail),
    fork(GetExtremeRef),
    fork(GrammarReportSubmission),
    fork(MfaActivateData),
    fork(MFALogin),
    fork(AnnouncementsCreateData),
    fork(GetAnnouncementData),
    fork(GetMyAnnouncementData)
];

export default function* rootSaga() {
    yield all([...saga]);
}
