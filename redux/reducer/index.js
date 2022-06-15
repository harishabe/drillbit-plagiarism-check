import { combineReducers } from 'redux';
import LoginReducer from '../reducer/login/LoginReducer';
import DashboardReducer from './admin/DashboardReducer';
import CRUDReducer from './admin/CRUDReducer';
import InsDashboardReducer from './instructor/DashboardReducer';
import DetailsInstructorReducer from './instructor/DetailsInstructorReducer';
import MyFoldersInstructorReducer from './instructor/MyFoldersInstructorReducer';
import DetailsReducer from './admin/DetailsReducer';
import ReportsReducer from './admin/ReportsReducer';
import ProfileReducer from './profile/ProfileReducer';

const rootReducer = combineReducers({
    login: LoginReducer,
    profile: ProfileReducer,
    adminDashboard: DashboardReducer,
    detailsData: DetailsReducer,
    instructorDashboard: InsDashboardReducer,
    instructorClasses: DetailsInstructorReducer,
    instructorMyFolders: MyFoldersInstructorReducer,
    adminCrud: CRUDReducer,
    adminReport: ReportsReducer,
});

export default rootReducer;
