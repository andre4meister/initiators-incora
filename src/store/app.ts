/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  modalIsOpen: false,
  modalIsLocked: false,
};

const app = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleModal: (state, action: PayloadAction<boolean>) => {
      state.modalIsOpen = action.payload;
    },
    toggleLockModal: (state, action: PayloadAction<boolean>) => {
      state.modalIsLocked = action.payload;
    },
  },
});

export const { toggleModal, toggleLockModal } = app.actions;
export default app.reducer;
