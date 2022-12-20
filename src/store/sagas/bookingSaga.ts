/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/unbound-method */
import { PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import BookingService, { DeleteBookingResponse } from 'services/bookingService';
import { addNotification } from 'store/alert';
import { toggleModal } from 'store/modal';
import { OneTimeBookingCreateResponse, RecurringBookingCreateResponse } from 'types/dataTypes';
import { SubmitBookingFormValues, UpdateBookingFormValues } from 'types/FormTypes';

export interface UpdateBookingType {
  id: number,
  bookingData: UpdateBookingFormValues;
  isRecurring: boolean;
}

export interface DeleteBookingType {
  id: number;
  isRecurring: boolean;
}

function* workerCreateOneTimeBooking({
  payload,
}: PayloadAction<SubmitBookingFormValues>) {
  try {
    const response: AxiosResponse<OneTimeBookingCreateResponse> = yield call(
      BookingService.createOneTimeBooking,
      payload,
    );
    if (response.status === 201) {
      yield put(addNotification({ message: 'Booking was created', type: 'success' }));
      yield put(toggleModal(false));
    }
  } catch (err) {
    const result = err as AxiosError<{ statusCode: number; message: string }>;

    if (axios.isAxiosError(err)) {
      if (result.message) {
        yield put(
          addNotification({
            message: result.message,
            type: 'error',
          }),
        );
      }
      if (result.response) {
        yield put(
          addNotification({
            message: result.response.data.message,
            type: 'error',
          }),
        );
      }
    } else {
      yield put(addNotification({ message: 'Error, this time is reserved by other meeting', type: 'error' }));
    }
  }
}

function* workerCreateRecurringBooking({
  payload,
}: PayloadAction<SubmitBookingFormValues>) {
  try {
    const response: AxiosResponse<RecurringBookingCreateResponse> = yield call(
      BookingService.createRecurringBooking,
      payload,
    );
    if (response.status === 201) {
      yield put(addNotification({ message: 'Booking was created', type: 'success' }));
      yield put(toggleModal(false));
    }
  } catch (err) {
    const result = err as AxiosError<{ statusCode: number; message: string }>;
    if (axios.isAxiosError(err)) {
      if (result.response) {
        yield put(
          addNotification({
            message: result.response.data.message,
            type: 'error',
          }),
        );
      }
    } else {
      yield put(
        addNotification({
          message: 'Error, this time is reserved by other meeting',
          type: 'error',
        }),
      );
    }
  }
}

function* workerUpdateBooking({ payload }: PayloadAction<UpdateBookingType>) {
  try {
    const response: AxiosResponse<RecurringBookingCreateResponse> = yield call(
      BookingService.updateBooking,
      payload.isRecurring,
      payload.id,
      payload.bookingData,
    );
    if (response.status === 201) {
      yield put(toggleModal(false));
      yield put(
        addNotification({ message: 'Booking was updated', type: 'success' }),
      );
    }

    if (response.status === 400) {
      throw new Error(response.statusText);
    } else if (response.status === 404) {
      throw new Error(response.statusText);
    }
  } catch (err) {
    const result = (err as Error).message;
    yield put(addNotification({ message: result, type: 'error' }));
  }
}

function* workerDeleteBooking({ payload }: PayloadAction<DeleteBookingType>) {
  try {
    const response: AxiosResponse<DeleteBookingResponse> = yield call(
      BookingService.deleteBooking,
      payload.isRecurring,
      payload.id,
    );

    if (response.status === 201) {
      yield put(
        addNotification({ message: 'Booking was updated', type: 'success' }),
      );
    } else if (response.status === 400 || response.status === 404) {
      throw new Error(response.statusText);
    }
  } catch (err) {
    const result = (err as Error).message;
    yield put(addNotification({ message: result, type: 'error' }));
  }
}

function* watchBookingSaga() {
  yield takeEvery('booking/createOneTimeBooking', workerCreateOneTimeBooking);
  yield takeEvery('booking/createRecurringBooking', workerCreateRecurringBooking);
  yield takeEvery('booking/updateBooking', workerUpdateBooking);
  yield takeEvery('booking/deleteBooking', workerDeleteBooking);
}

export default watchBookingSaga;
