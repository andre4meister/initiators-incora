/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/unbound-method */
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { NavigateFunction } from 'react-router-dom';
import { call, put, takeEvery } from 'redux-saga/effects';
import AuthService from 'services/authService';
import {
  loginSuccess,
  loginFailure,
  LoginValues,
  RegistrationValues,
  getProfile,
  loginPending,
} from 'store/user';
import { User } from 'types/dataTypes';
import { ChangePasswordValues, InitialGetAccessValues } from 'types/FormTypes';
import errorSagaHandler from 'utils/errorSagaHandler';
import successSagaHadler from 'utils/successSagaHandler';

export interface TokenInterface {
  token: string
  navigate?: NavigateFunction | (() => void)
}

function* workerUserLogin({ payload }: PayloadAction<LoginValues>) {
  try {
    loginPending('login...');
    const { data }: AxiosResponse<TokenInterface> = yield call(
      AuthService.login,
      payload.values.email,
      payload.values.password,
    );

    localStorage.setItem('token', JSON.stringify(data.token));

    yield put(getProfile({ navigate: payload.navigate }));
  } catch (err) {
    errorSagaHandler(err);
    yield put(loginFailure('Unauthorized'));
  }
}

function* workerUserRegistration({ payload }: PayloadAction<RegistrationValues>) {
  try {
    const { data }: AxiosResponse<TokenInterface> = yield call(
      AuthService.registration,
      payload.values,
    );

    localStorage.setItem('token', JSON.stringify(data.token));

    yield put(getProfile({ navigate: payload.navigate }));
  } catch (err) {
    errorSagaHandler(err);
  }
}

function* workerInviteUsers({
  payload,
}: PayloadAction<string[]>) {
  try {
    const { status }: AxiosResponse<Omit<User, 'firstName' | 'lastName'>[]> = yield call(
      AuthService.invite,
      payload,
    );
    successSagaHadler('Users were invited', status);
  } catch (err) {
    errorSagaHandler(err);
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
    errorSagaHandler(err);
  }
}

function* workerResetPassword({
  payload,
}: PayloadAction<InitialGetAccessValues>) {
  try {
    const response: AxiosResponse<User> = yield call(AuthService.resetPassword, payload);
    successSagaHadler(response.statusText, response.status);
  } catch (err) {
    errorSagaHandler(err);
  }
}

function* workerChangePassword({
  payload,
}: PayloadAction<ChangePasswordValues>) {
  try {
    const response: AxiosResponse<Pick<TokenInterface, 'token'>> = yield call(
      AuthService.changePassword,
      payload,
    );
    successSagaHadler('Password was succesfully changed', response.status);
  } catch (err) {
    errorSagaHandler(err);
  }
}

function* watchUserSaga() {
  yield takeEvery('user/loginPending', workerUserLogin);
  yield takeEvery('user/registration', workerUserRegistration);
  yield takeEvery('user/getProfile', workerGetProfile);
  yield takeEvery('user/resetPassword', workerResetPassword);
  yield takeEvery('user/changePassword', workerChangePassword);
  yield takeEvery('user/inviteUsers', workerInviteUsers);
}

export default watchUserSaga;
