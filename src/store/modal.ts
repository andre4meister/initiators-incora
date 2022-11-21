/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ModalType =
  | 'BookingFromDashboard'
  | 'RoundMenuBooking'
  | 'BookingInfo';

export const initialState = {
  modalIsOpen: false,
  modalIsLocked: false,
  modalType: 'BookingFromDashboard',
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
    toggleModalType: (state, action: PayloadAction<ModalType>) => {
      state.modalIsOpen = true;
      state.modalType = action.payload;
    },
  },
});

export const { toggleModal, toggleLockModal, toggleModalType } = modal.actions;
export default modal.reducer;
