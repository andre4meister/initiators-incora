// This rule disabled for changing extraredusers states
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { InitialLoginValues } from 'types/FormTypes';
import { User } from 'types/dataTypes';
import AuthService from 'services/authService';

interface FetchUser {
  userData: User
  status: boolean
  error: string
}

const initialState: FetchUser = {
  userData: {
    id: 0,
    role: 'guest',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
  },
  status: false,
  error: '',
};

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (data: InitialLoginValues, { rejectWithValue }) => {
    const res = await AuthService.login(data.email, data.password);

    if (!res.ok) {
      return rejectWithValue(res.statusText);
    }

    return res.parsedBody as User;
  },
);

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.status = true;
      });
  },
});

export default user.reducer;
