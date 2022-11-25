/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface NotificationsType {
  message: string;
  type: 'success' | 'info' | 'error';
}
export const initialState = {
  alertIsOpen: false,
  notifications: [] as NotificationsType[],
};

const alert = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    toggleAlertIsOpen: (state, action: PayloadAction<boolean>) => {
      state.alertIsOpen = action.payload;
    },
    addNotification: (state, action: PayloadAction<NotificationsType>) => {
      const isTheSameMessage = state.notifications.find(
        (n) => n.message === action.payload.message,
      );
      if (isTheSameMessage) {
        state.notifications = [...state.notifications
          .filter((n) => n.message !== action.payload.message), action.payload];
      } else {
        state.notifications.push(action.payload);
      }
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
