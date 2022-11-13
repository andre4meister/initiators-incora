/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const initialState = {
  activeRoomId: null as number | null,
};

const dashboard = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    toggleActiveRoomId: (state, action: PayloadAction<number | null>) => {
      state.activeRoomId = action.payload;
    },
  },
});

export const { toggleActiveRoomId } = dashboard.actions;
export default dashboard.reducer;
