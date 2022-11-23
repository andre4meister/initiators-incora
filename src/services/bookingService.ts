/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { AxiosResponse } from 'axios';
import {
  OneTimeBookingCreateResponse,
  RecurringBookingCreateResponse,
  User,
} from 'types/dataTypes';
import { SubmitBookingFormValues, UpdateBookingFormValues } from 'types/FormTypes';
import deleteRequest from 'utils/deleteRequest';
import getRequest from 'utils/getRequest';
import postRequest from 'utils/postRequest';
import putRequest from 'utils/putRequest';

export interface DeleteBookingResponse {
  raw: [];
  affected: number;
}

export default class BookingService {
  static async createOneTimeBooking(
    bookingData: SubmitBookingFormValues,
  ): Promise<AxiosResponse> {
    const response = await postRequest<OneTimeBookingCreateResponse>(
      `${process.env.REACT_APP_API_ONE_TIME_BOOKING}`,
      JSON.stringify(bookingData),
    );
    return response;
  }

  static async createRecurringBooking(
    bookingData: SubmitBookingFormValues,
  ): Promise<AxiosResponse> {
    const response = await postRequest<RecurringBookingCreateResponse>(
      `${process.env.REACT_APP_API_RECURRING_BOOKING}`,
      JSON.stringify(bookingData),
    );
    return response;
  }

  static async getOwnBookings(
    page: number,
    limit: number,
  ): Promise<AxiosResponse<OneTimeBookingCreateResponse[]>> {
    const response = getRequest<OneTimeBookingCreateResponse[]>(
      `${process.env.REACT_APP_API_GET_OWN_BOOKINGS}?page=${page}&limit=${limit}`,
    );
    return response;
  }

  static async getBookingsInRange(
    officeId: 1 | 2,
    startDate: string,
    endDate: string,
  ): Promise<AxiosResponse<OneTimeBookingCreateResponse[]>> {
    const response = getRequest<OneTimeBookingCreateResponse[]>(
      `${process.env.REACT_APP_API_GET_BOOKINGS_IN_RANGE}?officeId=${officeId}&startDate=${startDate}5&endDate=${endDate}`,
    );
    return response;
  }

  static async deleteBooking(
    isRecurring: boolean,
    id: number,
  ): Promise<AxiosResponse<DeleteBookingResponse>> {
    const apiEndPoint = isRecurring
      ? process.env.REACT_APP_API_RECURRING_BOOKING
      : process.env.REACT_APP_API_ONE_TIME_BOOKING;

    const response = deleteRequest<DeleteBookingResponse>(
      `${apiEndPoint}/${id}`,
    );
    return response;
  }

  static async updateBooking(
    isRecurring: boolean,
    id: number,
    bookingData: UpdateBookingFormValues,
  ): Promise<AxiosResponse> {
    const apiEndPoint = isRecurring
      ? process.env.REACT_APP_API_RECURRING_BOOKING
      : process.env.REACT_APP_API_ONE_TIME_BOOKING;

    const response = await putRequest<
    RecurringBookingCreateResponse | OneTimeBookingCreateResponse
    >(`${apiEndPoint}/${id}`, JSON.stringify(bookingData));

    return response;
  }

  static async getAllAccounts(): Promise<AxiosResponse<User[]>> {
    const response = getRequest<User[]>(
      `${process.env.REACT_APP_API_ACCOUNTS}`,
    );
    return response;
  }
}
