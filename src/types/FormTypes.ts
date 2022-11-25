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
// fix from 0 is Sunday
export enum DaysOfWeek {
  Sunday = 0,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
}
export interface BookingFormValues {
  id: number | null;
  accoundId: number;
  roomId: number | null;
  title: string;
  guests: string[];
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
  title: string;
  roomId: number | null;
  startDate?: DateTimeType;
  endDate?: DateTimeType;
  startTime: DateTimeType;
  endTime: DateTimeType;
  daysOfWeek?: DaysOfWeek | DaysOfWeek[];
  meetingDate?: DateTimeType;
  guests: string[];
}

export interface UpdateBookingFormValues {
  title: string;
  roomId: number | null;
  startDate?: DateTimeType;
  endDate?: DateTimeType;
  startTime: DateTimeType;
  endTime: DateTimeType;
  daysOfWeek?: DaysOfWeek | DaysOfWeek[];
  meetingDate?: DateTimeType;
  guests: string[];
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
