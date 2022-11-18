/* eslint-disable no-param-reassign */
import { FormikErrors } from 'formik';
import moment, { now } from 'moment';
import { CommonMeetingType, DateTimeType } from 'types/CommonTypes';
import { BookingFormValues } from 'types/FormTypes';

export function getIsBusyNow(soonestBookings: CommonMeetingType[]): boolean {
  const nowTime = moment(now());
  for (let i = 0; i < soonestBookings.length; i += 1) {
    const startMeetingDate = moment(
      `${soonestBookings[i].meetingDate}T${soonestBookings[i].startTime}`,
    );
    const endMeetingDate = moment(
      `${soonestBookings[i].meetingDate}T${soonestBookings[i].endTime}`,
    );
    if (nowTime.isBetween(startMeetingDate, endMeetingDate)) {
      return true;
    }
  }
  return false;
}

export function validateBookingTime(
  errors: FormikErrors<BookingFormValues>,
  endTime: DateTimeType,
  startTime: DateTimeType,
  touchedStartTime: boolean | undefined,
  touchedEndTime: boolean | undefined,
  setFieldError: (arg0: string, arg1: string) => void,
) {
  const [hoursStartTime, minutesStartTime] = startTime.toString().split(':');
  const [hoursEndTime, minutesEndTime] = endTime.toString().split(':');

  const conditionToCreateStartTimeError: boolean = Number(hoursStartTime) >= 22
  || Number(hoursStartTime) < 8;
  if (conditionToCreateStartTimeError && touchedStartTime) {
    errors.startTime = 'Incorrect start time, choose working hours';
  } else {
    setFieldError('startTime', '');
  }

  const conditionToCreateEndTimeError: boolean = hoursEndTime < hoursStartTime
    || (hoursStartTime === hoursEndTime && minutesStartTime >= minutesEndTime);
  const conditionTwoToCreateEndTimeError: boolean = Number(hoursEndTime) > 22
  || Number(hoursEndTime) < 8;

  if (conditionToCreateEndTimeError && touchedEndTime && touchedStartTime) {
    errors.endTime = 'Incorrect end time, it should be later than start time';
  } else if (conditionTwoToCreateEndTimeError && touchedEndTime) {
    errors.endTime = 'Incorrect end time, choose working hours';
  } else {
    setFieldError('endTime', '');
  }
}
