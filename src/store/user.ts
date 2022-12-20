/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'types/dataTypes';
import { NavigateFunction } from 'react-router-dom';
import {
  ChangePasswordValues,
  InitialGetAccessValues,
  InitialRegistrationFormValues,
} from 'types/FormTypes';

type LoadingType = 'pending' | 'succses' | 'failure' | null;

interface NavigateType {
  navigate: NavigateFunction | (() => void);
}

export interface FetchUser {
  userData: User | null;
  loading: LoadingType;
  error: string;
}

export interface LoginValues extends NavigateType {
  values: {
    email: string;
    password: string;
  };
}

export interface NewLoginValues extends NavigateType {
  values: {
    email: string;
    newPassword: string;
  };
}

export interface RegistrationValues extends NavigateType {
  values: InitialRegistrationFormValues;
}

const initialState: FetchUser = {
  userData: JSON.parse(localStorage.getItem('user') || 'null') as User,
  loading: null,
  error: '',
};

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginPending: (state, action) => {
      state.loading = 'pending';
      state.error = '';
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.userData = action.payload;
      state.loading = 'succses';
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.userData = null;
      state.error = action.payload;
      state.loading = 'failure';
    },
    registration: (state, action) => {
      state.loading = 'pending';
    },
    getProfile: (_, action) => {},
    resetPassword: (_, action: PayloadAction<InitialGetAccessValues>) => {},
    changePassword: (_, action: PayloadAction<ChangePasswordValues>) => {},
    loginNewPassword: (_, action: PayloadAction<NewLoginValues>) => {},
    inviteUsers: (_, action: PayloadAction<string[]>) => {},
  },
});

export const {
  loginPending,
  loginSuccess,
  loginFailure,
  registration,
  getProfile,
  changePassword,
  loginNewPassword,
  resetPassword,
  inviteUsers,
} = user.actions;

export default user.reducer;
