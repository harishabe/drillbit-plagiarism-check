import { combineReducers } from 'redux';
import LoginReducer from '../reducer/login/LoginReducer';
import DashboardReducer from './admin/DashboardReducer';
import InsDashboardReducer from './instructor/DashboardReducer';
import DetailsInstructorReducer from './instructor/DetailsInstructorReducer';
import MyFoldersInstructorReducer from './instructor/MyFoldersInstructorReducer';
import DetailsReducer from './admin/DetailsReducer';

const rootReducer = combineReducers({
    login: LoginReducer,
    adminDashboard: DashboardReducer,
    detailsData: DetailsReducer,
    instructorDashboard: InsDashboardReducer,
    instructorClasses: DetailsInstructorReducer,
    instructorMyFolders: MyFoldersInstructorReducer,
});

export default rootReducer;
