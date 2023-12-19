import { combineReducers } from 'redux';
import LoginReducer from '../reducer/login/LoginReducer';
import DashboardReducer from './admin/DashboardReducer';
import CRUDReducer from './admin/CRUDReducer';
import InstructorCRUDReducer from './instructor/CRUDReducer';
import InsDashboardReducer from './instructor/DashboardReducer';
import DetailsInstructorReducer from './instructor/DetailsInstructorReducer';
import DetailsStudentReducer from './student/DetailsStudentReducer';
import MyFoldersInstructorReducer from './instructor/MyFoldersInstructorReducer';
import InstructorSubmissionReducer from './instructor/InstructorSubmissionReducer';
import DetailsReducer from './admin/DetailsReducer';
import ReportsReducer from './admin/ReportsReducer';
import IntegrationReducer from './admin/IntegrationReducer';
import ProfileReducer from './profile/ProfileReducer';
import SuperReducer from './super/SuperReducer';
import DocumnentChartReducer from './common/Dashboard/DashboardReducer';
import SubmissionReducer from './common/Submission/SubmissionReducer';
import UploadFileReducer from './common/UploadFile/UploadFileReducer';
import MfaReducer from './common/Settings/MfaReducer';

const rootReducer = combineReducers({
    login: LoginReducer,
    profile: ProfileReducer,
    adminDashboard: DashboardReducer,
    detailsData: DetailsReducer,
    adminIntegrationData: IntegrationReducer,
    instructorDashboard: InsDashboardReducer,
    instructorClasses: DetailsInstructorReducer,
    instructorMyFolders: MyFoldersInstructorReducer,
    instructorSubmissionGrading: InstructorSubmissionReducer,
    adminCrud: CRUDReducer,
    instructorCrud: InstructorCRUDReducer,
    adminReport: ReportsReducer,
    studentClasses: DetailsStudentReducer,
    superAdmin: SuperReducer,
    documentChart: DocumnentChartReducer,
    submission: SubmissionReducer,
    uploadFile: UploadFileReducer,
    MfaActivation: MfaReducer
});

export default rootReducer;
