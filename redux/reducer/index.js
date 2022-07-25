import { combineReducers } from 'redux';
import LoginReducer from '../reducer/login/LoginReducer';
import DashboardReducer from './admin/DashboardReducer';
import CRUDReducer from './admin/CRUDReducer';
import InstructorCRUDReducer from './instructor/CRUDReducer';
import InsDashboardReducer from './instructor/DashboardReducer';
import DetailsInstructorReducer from './instructor/DetailsInstructorReducer';
import DetailsStudentReducer from './student/DetailsStudentReducer';
import MyFoldersInstructorReducer from './instructor/MyFoldersInstructorReducer';
import SubmissionReducer from './instructor/SubmissionReducer';
import DetailsReducer from './admin/DetailsReducer';
import ReportsReducer from './admin/ReportsReducer';
import ProfileReducer from './profile/ProfileReducer';
import SuperReducer from './super/SuperReducer';

const rootReducer = combineReducers({
    login: LoginReducer,
    profile: ProfileReducer,
    adminDashboard: DashboardReducer,
    detailsData: DetailsReducer,
    instructorDashboard: InsDashboardReducer,
    instructorClasses: DetailsInstructorReducer,
    instructorMyFolders: MyFoldersInstructorReducer,
    instructorSubmissionGrading: SubmissionReducer,
    adminCrud: CRUDReducer,
    instructorCrud: InstructorCRUDReducer,
    adminReport: ReportsReducer,
    studentClasses: DetailsStudentReducer,
    superAdmin: SuperReducer
});

export default rootReducer;
