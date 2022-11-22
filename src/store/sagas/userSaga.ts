/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/unbound-method */
import { PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { NavigateFunction } from 'react-router-dom';
import { call, put, takeEvery } from 'redux-saga/effects';
import AuthService from 'services/authService';
import { addNotification } from 'store/alert';
import {
  loginSuccess,
  loginFailure,
  LoginValues,
  RegistrationValues,
  getProfile,
} from 'store/user';
import { User } from 'types/dataTypes';

export interface TokenInterface {
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

    localStorage.setItem('token', JSON.stringify(data.token));

    yield put(getProfile({ navigate: payload.navigate }));
  } catch (err) {
    const result = err as AxiosError<{ statusCode: number, message: string }>;
    if (axios.isAxiosError(err)) {
      if (result.response) {
        yield put(addNotification({ message: result.response.data.message, type: 'error' }));
      } else yield put(addNotification({ message: result.message, type: 'error' }));
    }
    yield put(loginFailure(result.message));
    yield put(addNotification({ message: 'Unaftorize', type: 'error' }));
  }
}

function* workerUserRegistration({ payload }: PayloadAction<RegistrationValues>) {
  try {
    yield call(
      AuthService.registration,
      payload.values,
    );
  } catch (err) {
    const result = err as AxiosError<{ statusCode: number, message: string }>;
    if (axios.isAxiosError(err)) {
      if (result.response) {
        yield put(addNotification({ message: result.response.data.message, type: 'error' }));
      } else yield put(addNotification({ message: result.message, type: 'error' }));
    }
    yield put(loginFailure(result.message));
    yield put(addNotification({ message: 'Unaftorize', type: 'error' }));
  }
}

function* workerGetProfile({ payload }: PayloadAction<TokenInterface>) {
  try {
    const userProfile: AxiosResponse<User> = yield call(
      AuthService.profile,
    );

    yield put(loginSuccess(userProfile.data));

    if (payload.navigate) {
      yield payload.navigate('/');
    }
  } catch (err) {
    const result = err as AxiosError<{ statusCode: number, message: string }>;
    if (axios.isAxiosError(err)) {
      if (result.response) {
        yield put(addNotification({ message: result.response.data.message, type: 'error' }));
      } else yield put(addNotification({ message: result.message, type: 'error' }));
    }
    yield put(loginFailure(result.message));
    yield put(addNotification({ message: 'Unaftorize', type: 'error' }));
  }
}

function* watchUserSaga() {
  yield takeEvery('user/loginPending', workerUserLogin);
  yield takeEvery('user/registration', workerUserRegistration);
  yield takeEvery('user/getProfile', workerGetProfile);
}

export default watchUserSaga;
