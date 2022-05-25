import { all, fork } from 'redux-saga/effects';

import { userLogin } from './login/Login';
import { DashboardWidget } from './admin/Dashboard';

const saga = [
    fork(userLogin),
    fork(DashboardWidget)
]

export default function* rootSaga() {
    yield all([...saga]);
}