import { spawn } from 'redux-saga/effects';
import watchBookingSaga from './bookingSaga';
import watchDashboardSaga from './dashbordSaga';
import watchUserSaga from './userSaga';

function* rootSaga() {
  yield spawn(watchUserSaga);
  yield spawn(watchDashboardSaga);
  yield spawn(watchBookingSaga);
}

export default rootSaga;
