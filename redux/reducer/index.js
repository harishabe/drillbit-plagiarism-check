import { combineReducers } from 'redux';
import LoginReducer from '../reducer/login/LoginReducer';

const rootReducer = combineReducers({
    login: LoginReducer
});

export default rootReducer;