import { combineReducers } from 'redux';
import LoginReducer from '../reducer/login/LoginReducer';
import DashboardReducer from './admin/DashboardReducer';
import InsDashboardReducer from './instructor/DashboardReducer';

const rootReducer = combineReducers({
  login: LoginReducer,
  adminDashboard: DashboardReducer,
  instructorDashboard: InsDashboardReducer,
});

export default rootReducer;
