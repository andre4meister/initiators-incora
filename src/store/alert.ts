/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface NotificationsType {
  message: string;
  type: 'success' | 'info' | 'error';
}
export const initialState = {
  alertIsOpen: false,
  notifications: [
    { message: 'Test this success message 1', type: 'success' },
    {
      message: 'End date should be bigger than startDate at least on 2 days',
      type: 'success',
    },
    { message: 'Passwords must match', type: 'error' },
    {
      message: 'Booking period should be less than 3 month',
      type: 'error',
    },
    {
      message: 'Incorrect end time, it should be later than start time',
      type: 'info',
    },
  ] as NotificationsType[],
};

const alert = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    toggleAlertIsOpen: (state, action: PayloadAction<boolean>) => {
      state.alertIsOpen = action.payload;
    },
    addNotification: (state, action: PayloadAction<NotificationsType>) => {
      state.notifications.push(action.payload);
    },
    deleteNotification: (state, action: PayloadAction<NotificationsType>) => {
      state.notifications = state.notifications.filter(
        (n) => n.message !== action.payload.message,
      );
    },
  },
});

export const { toggleAlertIsOpen, addNotification, deleteNotification } = alert.actions;
export default alert.reducer;
