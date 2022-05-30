import { all, fork } from 'redux-saga/effects';

import { userLogin } from './login/Login';
import { DashboardWidget, TopStudent, TrendAnalysis } from './admin/Dashboard';
import { InsDashboardWidget } from './instructor/Dashboard';
import { GetInstructorData, GetStudentData } from './admin/DetailsData';


const saga = [
    fork(userLogin),
    fork(DashboardWidget),
    fork(TopStudent),
    fork(TrendAnalysis),
    fork(GetInstructorData),
    fork(GetStudentData),
    fork(InsDashboardWidget)
];

export default function* rootSaga() {
    yield all([...saga]);
}
