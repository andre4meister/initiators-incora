/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  modalIsOpen: false,
  modalIsLocked: false,
};

const modal = createSlice({
  name: 'modal',
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

export const { toggleModal, toggleLockModal } = modal.actions;
export default modal.reducer;
