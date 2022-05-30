import { combineReducers } from 'redux';
import LoginReducer from '../reducer/login/LoginReducer';
import DashboardReducer from './admin/DashboardReducer';
import InsDashboardReducer from './instructor/DashboardReducer';
import DetailsReducer from './admin/DetailsReducer';

const rootReducer = combineReducers({
  login: LoginReducer,
  adminDashboard: DashboardReducer,
  detailsData: DetailsReducer,
  instructorDashboard: InsDashboardReducer,
});

export default rootReducer;
