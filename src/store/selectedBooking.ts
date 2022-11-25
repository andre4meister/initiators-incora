/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Booking } from 'types/dataTypes';

interface SelectedBookingInterface {
  booking: Booking
}

const initialState: SelectedBookingInterface = {
  booking: {
    title: '',
    daysOfWeek: [],
    startDate: '',
    endDate: '',
    id: 0,
    createdAt: '',
    isRecurring: false,
    meetingDate: '',
    startTime: '',
    endTime: '',
    room: {
      id: '',
      name: '',
      floor: 0,
      devices: [],
      maxPeople: 0,
      minPeople: 0,
    },
    guests: [],
    owner: {
      id: 0,
      approved: false,
      role: '',
      email: '',
      firstName: '',
      lastName: '',
      createdAt: '',
    },
  },
};

const selectedBooking = createSlice({
  name: 'selectBooking',
  initialState,
  reducers: {
    setSelectedBooking: (state, action: PayloadAction<Booking>) => {
      state.booking = action.payload;
    },
  },
});

export const { setSelectedBooking } = selectedBooking.actions;

export default selectedBooking.reducer;
