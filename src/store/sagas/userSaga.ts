/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/unbound-method */
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import {
  call, put, takeEvery,
} from 'redux-saga/effects';
import AuthService from 'services/authService';
import { loginSuccess, loginFailure, LoginValues } from 'store/user';

interface LoginData {
  token: string
}

function* watchUserLogin({ payload }: PayloadAction<LoginValues>) {
  try {
    const { data }: AxiosResponse<LoginData> = yield call(
      AuthService.login,
      payload.values.email,
      payload.values.password,
    );

    localStorage.setItem('token', JSON.stringify(data.token));
    yield put(loginSuccess()); // USER DATA IT MUST BE HERE
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
