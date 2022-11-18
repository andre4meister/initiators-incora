import { spawn } from 'redux-saga/effects';
import watchDashboardSaga from './dashbordSaga';
import watchUserSaga from './userSaga';

function* rootSaga() {
  yield spawn(watchUserSaga);
  yield spawn(watchDashboardSaga);
}

export default rootSaga;
