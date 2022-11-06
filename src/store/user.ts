// This rule disabled for changing extraredusers states
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'types/dataTypes';
import { NavigateFunction } from 'react-router-dom';

export interface FetchUser {
  userData: User | null
  loading: boolean
  error: string
}

export type LoginValues = {
  values: {
    email: string
    password: string
  }
  navigate: NavigateFunction | (() => void)
};

const initialState: FetchUser = {
  userData: JSON.parse(localStorage.getItem('userData') || 'null') as User,
  loading: true,
  error: '',
};

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginPending: (state, action) => {
      state.loading = true;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.userData = action.payload;
      state.loading = false;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.userData = null;
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { loginPending, loginSuccess, loginFailure } = user.actions;

export default user.reducer;
