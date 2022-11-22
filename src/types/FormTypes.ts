import { DateTimeType } from './CommonTypes';

export interface InitialLoginValues {
  email: string;
  password: string;
}

export interface InitialRegistrationFormValues {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}

export interface InitialGetAccessValues {
  email: string;
}

export enum DaysOfWeek {
  Monday = 1,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}
export interface BookingFormValues {
  id: number | null;
  accoundId: number;
  roomId: number | null;
  createdAt: DateTimeType;
  startDate: DateTimeType;
  endDate: DateTimeType;
  startTime: DateTimeType;
  endTime: DateTimeType;
  daysOfWeek: DaysOfWeek | DaysOfWeek[];
  meetingDate: DateTimeType;
}
export interface SubmitBookingFormValues {
  id: number | null;
  accoundId: number;
  roomId: number | null;
  createdAt: DateTimeType;
  startDate?: DateTimeType;
  endDate?: DateTimeType;
  startTime: DateTimeType;
  endTime: DateTimeType;
  daysOfWeek?: DaysOfWeek | DaysOfWeek[];
  meetingDate?: DateTimeType;
}
export interface InitialSettingsValue {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}

export interface ChangePasswordValues {
  email: string;
  oldPassword: string;
  newPassword: string;
}

export interface InitialConfirmPasswordValue {
  password: string;
}
