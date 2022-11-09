// This rule disabled for changing extraredusers states
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'types/dataTypes';
import { NavigateFunction } from 'react-router-dom';
import { InitialRegistrationFormValues } from 'types/FormTypes';

type LoadingType = 'pending' | 'succses' | 'failure' | null;

export interface FetchUser {
  userData: User | null
  loading: LoadingType
  error: string
}

export type LoginValues = {
  values: {
    email: string
    password: string
  }
  navigate: NavigateFunction | (() => void)
};

export type RegistrationValues = {
  values: InitialRegistrationFormValues
  navigate: NavigateFunction | (() => void)
};

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
  },
});

export const {
  loginPending,
  loginSuccess,
  loginFailure,
  registration,
} = user.actions;

export default user.reducer;
