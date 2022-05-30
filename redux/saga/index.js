import { all, fork } from 'redux-saga/effects';

import { userLogin } from './login/Login';
import { DashboardWidget, TopStudent, TrendAnalysis } from './admin/Dashboard';
import {
    InsDashboardWidget,
    TopInstructorStudent,
} from './instructor/Dashboard';
import { GetInstructorData } from './admin/DetailsData';
import { GetClassesData } from './instructor/DetailsInstructorData';
import { GetMyFolders } from './instructor/MyFoldersInstructor';

const saga = [
    fork(userLogin),
    fork(DashboardWidget),
    fork(TopStudent),
    fork(TrendAnalysis),
    fork(GetInstructorData),
    fork(InsDashboardWidget),
    fork(TopInstructorStudent),
    fork(GetClassesData),
    fork(GetMyFolders),
];

export default function* rootSaga() {
    yield all([...saga]);
}
