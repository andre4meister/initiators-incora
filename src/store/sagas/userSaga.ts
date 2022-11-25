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
  NewLoginValues,
  loginPending,
} from 'store/user';
import { User } from 'types/dataTypes';
import { ChangePasswordValues, InitialGetAccessValues } from 'types/FormTypes';

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
    yield put(addNotification({ message: 'Unauthorized', type: 'error' }));
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
    const result = err as AxiosError<{ statusCode: number, message: string }>;
    if (axios.isAxiosError(err)) {
      if (result.response) {
        yield put(addNotification({ message: result.response.data.message, type: 'error' }));
      } else yield put(addNotification({ message: result.message, type: 'error' }));
    }
    yield put(loginFailure(result.message));
    yield put(addNotification({ message: 'Unauthorized', type: 'error' }));
  }
}

function* workerInviteUsers({
  payload,
}: PayloadAction<string[]>) {
  try {
    const { data, statusText }: AxiosResponse<Omit<User, 'firstName' | 'lastName'>[]> = yield call(
      AuthService.invite,
      payload,
    );
    yield put(addNotification({ message: 'Users were invated', type: 'success' }));
  } catch (err) {
    const result = err as AxiosError<{ statusCode: number; message: string }>;
    if (axios.isAxiosError(err)) {
      if (result.response) {
        yield put(
          addNotification({
            message: result.response.data.message,
            type: 'error',
          }),
        );
      } else { yield put(addNotification({ message: result.message, type: 'error' })); }
    }
    yield put(loginFailure(result.message));
    yield put(addNotification({ message: 'Unauthorized', type: 'error' }));
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
    yield put(addNotification({ message: 'Unauthorized', type: 'error' }));
  }
}

function* workerResetPassword({
  payload,
}: PayloadAction<InitialGetAccessValues>) {
  try {
    const response: AxiosResponse<User> = yield call(AuthService.resetPassword, payload);
    if (response.status === 200 || response.status === 201) {
      yield put(addNotification({ message: response.statusText, type: 'success' }));
    }
  } catch (err) {
    const result = err as AxiosError<{ statusCode: number; message: string }>;
    if (axios.isAxiosError(err)) {
      if (result.response) {
        yield put(
          addNotification({
            message: result.response.data.message,
            type: 'error',
          }),
        );
      }
    } else {
      yield put(
        addNotification({ message: 'Error has occured', type: 'error' }),
      );
    }
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
    if (response.status === 200 || response.status === 201) {
      yield put(
        addNotification({ message: 'Password was succesfully changed', type: 'success' }),
      );
    }
  } catch (err) {
    const result = err as AxiosError<{ statusCode: number; message: string }>;
    if (axios.isAxiosError(err)) {
      if (result.response) {
        yield put(
          addNotification({
            message: result.response.data.message,
            type: 'error',
          }),
        );
      }
    } else {
      yield put(
        addNotification({ message: 'Error has occured', type: 'error' }),
      );
    }
  }
}

// function* workerLoginNewPassword({
//   payload,
// }: PayloadAction<NewLoginValues>) {
//   try {
//     const response: AxiosResponse<Pick<TokenInterface, 'token'>> = yield call(
//       AuthService.loginNewPassword,
//       payload.values,
//     );

//     localStorage.setItem('token', JSON.stringify(response.data.token));
//     yield put(getProfile({ navigate: payload.navigate }));

//     if (response.status === 200 || response.status === 201) {
//       yield put(
//         addNotification({ message: response.statusText, type: 'success' }),
//       );
//       payload.navigate('/');
//     }
//   } catch (err) {
//     const result = err as AxiosError<{ statusCode: number; message: string }>;
//     if (axios.isAxiosError(err)) {
//       if (result.response) {
//         yield put(
//           addNotification({
//             message: result.response.data.message,
//             type: 'error',
//           }),
//         );
//       }
//     } else {
//       yield put(
//         addNotification({ message: 'Error has occured', type: 'error' }),
//       );
//     }
//   }
// }

function* watchUserSaga() {
  yield takeEvery('user/loginPending', workerUserLogin);
  yield takeEvery('user/registration', workerUserRegistration);
  yield takeEvery('user/getProfile', workerGetProfile);
  yield takeEvery('user/resetPassword', workerResetPassword);
  yield takeEvery('user/changePassword', workerChangePassword);
  // yield takeEvery('user/loginNewPassword', workerLoginNewPassword);
  yield takeEvery('user/inviteUsers', workerInviteUsers);
}

export default watchUserSaga;
