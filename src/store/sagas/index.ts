import { spawn } from 'redux-saga/effects';
import userSaga from './userSaga';

function* rootSaga() {
  yield spawn(userSaga);
}

export default rootSaga;
