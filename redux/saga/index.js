import { all, fork } from 'redux-saga/effects';

import { userLogin } from './login/Login';
import { DashboardWidget } from './admin/Dashboard';
import { InsDashboardWidget } from './instructor/Dashboard';

const saga = [fork(userLogin), fork(DashboardWidget), fork(InsDashboardWidget)];

export default function* rootSaga() {
  yield all([...saga]);
}
