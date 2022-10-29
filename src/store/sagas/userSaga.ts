/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/unbound-method */
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import {
  call, put, takeEvery,
} from 'redux-saga/effects';
import AuthService from 'services/authService';
import { loginSuccess, loginFailure, LoginValues } from 'store/user';
import { User } from 'types/dataTypes';

function* watchUserLogin({ payload }: PayloadAction<LoginValues>) {
  try {
    const { data }: AxiosResponse<User> = yield call(
      AuthService.login,
      payload.values.email,
      payload.values.password,
    );
    yield put(loginSuccess(data));
    yield payload.navigate('/');
  } catch (err) {
    const result = (err as Error).message;
    yield put(loginFailure(result));
  }
}

function* userSaga() {
  yield takeEvery('user/loginPending', watchUserLogin);
}

export default userSaga;
