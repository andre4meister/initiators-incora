/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FetchRoomsProps } from 'services/RoomService';

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
    getRooms: (_, action: PayloadAction<FetchRoomsProps>) => { },
  },
});

export const { toggleActiveRoomId, getRooms } = dashboard.actions;
export default dashboard.reducer;
