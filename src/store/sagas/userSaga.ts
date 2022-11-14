/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/unbound-method */
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { NavigateFunction } from 'react-router-dom';
import {
  call, put, takeEvery,
} from 'redux-saga/effects';
import AuthService from 'services/authService';
import {
  loginSuccess, loginFailure, LoginValues, RegistrationValues, getProfile,
} from 'store/user';
import { User } from 'types/dataTypes';

interface TokenInterface {
  token: string
  navigate?: NavigateFunction | (() => void)
}

function* workerUserLogin({ payload }: PayloadAction<LoginValues>) {
  try {
    const { data }: AxiosResponse<TokenInterface> = yield call(
      AuthService.login,
      payload.values.email,
      payload.values.password,
    );

    yield put(getProfile({ token: data.token, navigate: payload.navigate }));
  } catch (err) {
    const result = (err as Error).message;
    yield put(loginFailure(result));
  }
}

function* workerUserRegistration({ payload }: PayloadAction<RegistrationValues>) {
  try {
    const { data }: AxiosResponse<TokenInterface> = yield call(
      AuthService.registration,
      payload.values,
    );

    yield put(getProfile({ token: data.token, navigate: payload.navigate }));
  } catch (err) {
    const result = (err as Error).message;
    yield put(loginFailure(result));
  }
}

function* warkerGetProfile({ payload }: PayloadAction<TokenInterface>) {
  localStorage.setItem('token', JSON.stringify(payload.token));

  const userProfile: AxiosResponse<User> = yield call(
    AuthService.profile,
  );

  yield put(loginSuccess(userProfile.data));

  if (payload.navigate) {
    yield payload.navigate('/');
  }
}

function* watchUserSaga() {
  yield takeEvery('user/loginPending', workerUserLogin);
  yield takeEvery('user/registration', workerUserRegistration);
  yield takeEvery('user/getProfile', warkerGetProfile);
}

export default watchUserSaga;
