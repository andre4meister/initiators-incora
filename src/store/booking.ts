/* eslint-disable no-param-reassign */
import { SubmitBookingFormValues } from 'types/FormTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DateTimeType, RoomType } from '../types/CommonTypes';
import { UpdateBookingType } from './sagas/bookingSaga';

export const initialState = {
  chosenOffice: null as number | null,
  chosenRoom: null as number | null,
  chosenStartTime: '' as DateTimeType,
  chosenEndTime: '' as DateTimeType,
  chosenStartDate: '' as DateTimeType,
  chosenEndDate: '' as DateTimeType,
  chosenMeetingDate: '' as DateTimeType,
  isReccuring: false,
  offices: [
    { id: 1, name: 'Office1', adress: 'Bohdana 116' },
    { id: 2, name: 'Office2', adress: 'Bohdana 117' },
    { id: 3, name: 'Office3', adress: 'Bohdana 118' },
  ],
  rooms: [] as RoomType[],
};

const booking = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    toggleChosenOffice: (state, action: PayloadAction<null | number>) => {
      state.chosenOffice = action.payload;
    },
    toggleChosenRoom: (state, action: PayloadAction<null | number>) => {
      state.chosenRoom = action.payload;
    },
    toggleChosenStartTime: (state, action: PayloadAction<DateTimeType>) => {
      state.chosenStartTime = action.payload;
    },
    toggleChosenEndTime: (state, action: PayloadAction<DateTimeType>) => {
      state.chosenEndDate = action.payload;
    },
    toggleChoseStartDate: (state, action: PayloadAction<DateTimeType>) => {
      state.chosenStartTime = action.payload;
    },
    toggleChosenEndDate: (state, action: PayloadAction<DateTimeType>) => {
      state.chosenEndTime = action.payload;
    },
    toggleChosenMeetingDate: (state, action: PayloadAction<DateTimeType>) => {
      state.chosenMeetingDate = action.payload;
    },
    setRooms: (state, action: PayloadAction<RoomType[]>) => {
      state.rooms = action.payload;
    },
    toggleIsRecurring: (state, action: PayloadAction<boolean>) => {
      state.isReccuring = action.payload;
    },
    createOneTimeBooking: (state, action: PayloadAction<SubmitBookingFormValues>) => {},
    createRecurringBooking: (state, action: PayloadAction<SubmitBookingFormValues>) => {},
    updateBooking: (state, action: PayloadAction<UpdateBookingType>) => {},
    deleteBooking: (state, action: PayloadAction<Pick<UpdateBookingType, 'isRecurring'>>) => {},
  },
});

export const {
  toggleChosenOffice,
  toggleChosenRoom,
  toggleChoseStartDate,
  toggleChosenEndDate,
  toggleChosenEndTime,
  toggleChosenStartTime,
  setRooms,
  toggleIsRecurring,
  createOneTimeBooking,
  createRecurringBooking,
  deleteBooking,
  updateBooking,
} = booking.actions;

export default booking.reducer;
