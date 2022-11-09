/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/unbound-method */
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import {
  call, put, takeEvery,
} from 'redux-saga/effects';
import AuthService from 'services/authService';
import {
  loginSuccess, loginFailure, LoginValues, RegistrationValues,
} from 'store/user';
import { User } from 'types/dataTypes';

interface LoginData {
  token: string
}

function* workerUserLogin({ payload }: PayloadAction<LoginValues>) {
  try {
    const { data }: AxiosResponse<LoginData> = yield call(
      AuthService.login,
      payload.values.email,
      payload.values.password,
    );

    localStorage.setItem('token', JSON.stringify(data.token));

    const userProfile: AxiosResponse<User> = yield call(
      AuthService.profile,
    );

    yield put(loginSuccess(userProfile.data));
    yield payload.navigate('/');
  } catch (err) {
    const result = (err as Error).message;
    yield put(loginFailure(result));
  }
}

function* workerUserRegistration({ payload }: PayloadAction<RegistrationValues>) {
  try {
    const { data }: AxiosResponse<LoginData> = yield call(AuthService.registration, payload.values);

    localStorage.setItem('token', JSON.stringify(data.token));

    const userProfile: AxiosResponse<User> = yield call(
      AuthService.profile,
    );

    yield put(loginSuccess(userProfile.data));
    yield payload.navigate('/');
  } catch (err) {
    const result = (err as Error).message;
    yield put(loginFailure(result));
  }
}

function* watchUserSaga() {
  yield takeEvery('user/loginPending', workerUserLogin);
  yield takeEvery('user/registration', workerUserRegistration);
}

export default watchUserSaga;
