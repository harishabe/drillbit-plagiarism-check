import { combineReducers } from 'redux';
import LoginReducer from '../reducer/login/LoginReducer';
import DashboardReducer from './admin/DashboardReducer';

const rootReducer = combineReducers({
    login: LoginReducer,
    adminDashboard: DashboardReducer
});

export default rootReducer;