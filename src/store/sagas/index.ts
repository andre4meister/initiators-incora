import { spawn } from 'redux-saga/effects';
import watchUserSaga from './userSaga';

function* rootSaga() {
  yield spawn(watchUserSaga);
}

export default rootSaga;
