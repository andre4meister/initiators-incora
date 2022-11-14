/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable no-param-reassign */
import { ClockCircleOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import OfficeOutlined from 'assets/Icons/OfficeSVG';
import Button from 'components/UI/Button/Button';
import { useFormik } from 'formik';
import { useAppSelector } from 'hooks/reduxHooks';
import { FC, useEffect } from 'react';
import Select from 'react-select';
import { BookingFormValues, SubmitBookingFormValues } from 'types/FormTypes';
import moment, { now } from 'moment';
import yupPattern from 'utils/yupPattern';
import * as Yup from 'yup';
import {
  validateBookingTime,
} from 'utils/bookingUtils';
import weekDays from 'utils/commonConstants';
import styles from './Booking.module.scss';
import './Booking.scss';

const users = [
  { value: 1, label: 'doter@incorainc.com' },
  { value: 2, label: 'andrii@incorainc.com' },
  { value: 3, label: 'max@incorainc.com' },
  { value: 4, label: 'slavik@incorainc.com' },
  { value: 5, label: 'roma@incorainc.com' },
  { value: 6, label: 'bodya@incorainc.com' },
  { value: 7, label: 'rover@incorainc.com' },
  { value: 8, label: 'freshman@incorainc.com' },
];

const CommonBookingForm: FC = () => {
  const {
    chosenRoom,
    chosenEndTime,
    chosenStartTime,
    chosenMeetingDate,
    chosenStartDate,
    chosenEndDate,
    isReccuring,
    rooms,
  } = useAppSelector((state) => state.booking);

  const formik = useFormik({
    initialValues: {
      id: Math.floor(Math.random() * 10001),
      accoundId: 41,
      roomId: chosenRoom,
      startTime: chosenStartTime || moment(now()).format('HH:mm'),
      endTime:
        chosenEndTime || moment(now()).add(30, 'minutes').format('HH:mm'),
      createdAt: '',
      startDate: chosenStartDate || moment(now()).format('YYYY-MM-DD'),
      endDate:
        chosenEndDate || moment(now()).add(1, 'weeks').format('YYYY-MM-DD'),
      meetingDate: chosenMeetingDate || moment(now()).format('YYYY-MM-DD'),
      daysOfWeek: [moment(now()).get('weekday')] as number[],
    },
    validationSchema: Yup.object({
      startTime: yupPattern('startTime'),
      endTime: yupPattern('endTime'),
      ...(isReccuring
        ? {
          startDate: yupPattern('startDate'),
          endDate: yupPattern('endDate'),
          daysOfWeek: yupPattern('daysOfWeek'),
        }
        : { meetingDate: yupPattern('meetingDate') }),
    }),
    onSubmit: (values: BookingFormValues) => {
      values.createdAt = moment(now()).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
      const submitValues: SubmitBookingFormValues = { ...values };
      if (isReccuring) {
        delete submitValues.meetingDate;
        console.log(JSON.stringify(submitValues));
      } else {
        delete submitValues.startDate;
        delete submitValues.endDate;
        delete submitValues.daysOfWeek;
        console.log(JSON.stringify(submitValues));
      }
    },
  });

  const {
    handleSubmit,
    values,
    errors,
    touched,
    handleChange,
    setFieldValue,
    setFieldError,
  } = formik;

  useEffect(() => {
    validateBookingTime(
      errors,
      values.endTime,
      values.startTime,
      touched.startTime,
      touched.endTime,
      setFieldError,
    );
    console.log(errors);
  }, [
    errors,
    values.endTime,
    values.startTime,
    touched.startTime,
    touched.endTime,
    setFieldError,
  ]);

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.form_item}>
        <OfficeOutlined />
        <div className={styles.content}>
          <Select
            id="roomId"
            value={rooms.find((room) => room.id === values.roomId)}
            onChange={(value) => {
              setFieldValue('roomId', value?.id);
            }}
            options={rooms}
            getOptionLabel={(room) => room.name}
            getOptionValue={(room) => room.id.toString()}
            className={styles.picker}
            maxMenuHeight={100}
          />
        </div>
      </div>
      <div className={styles.form_item}>
        <ClockCircleOutlined className={styles.icon} />
        <div className={styles.content}>
          {isReccuring ? (
            <>
              <input
                type="date"
                id="startDate"
                value={values.startDate?.toString()}
                onChange={handleChange}
                className={styles.picker}
              />
              <input
                type="date"
                id="endDate"
                value={values.endDate?.toString()}
                onChange={handleChange}
                className={styles.picker}
              />
            </>
          ) : null}
          {!isReccuring ? (
            <input
              type="date"
              name="meetingDate"
              id="meetingDate"
              value={values.meetingDate.toString()}
              onChange={handleChange}
              className={styles.picker}
            />
          ) : null}
          <input
            type="time"
            value={values.startTime.toString()}
            onChange={(value: React.ChangeEvent<HTMLInputElement>) => {
              setFieldValue('startTime', value.target.value);
            }}
            className={styles.picker}
            max="22:00"
            min="08:00"
          />
          <input
            type="time"
            value={values.endTime.toString()}
            onChange={(value: React.ChangeEvent<HTMLInputElement>) => {
              setFieldValue('endTime', value.target.value);
            }}
            className={styles.picker}
            max="22:00"
            min="08:00"
          />
          {isReccuring && (
            <Select
              placeholder="Choose days of week"
              options={weekDays}
              className={styles.picker}
              name="daysOfWeek"
              maxMenuHeight={70}
              menuPlacement="bottom"
              classNamePrefix="users"
              isMulti
              onChange={(days) => {
                setFieldValue(
                  'daysOfWeek',
                  days.map((day) => day.value),
                );
              }}
            />
          )}
        </div>
      </div>
      <div className={styles.form_item}>
        <UsergroupAddOutlined className={styles.icon} />
        <div className={styles.content}>
          <Select
            options={users}
            className={styles.picker}
            isMulti
            maxMenuHeight={70}
            menuPlacement="bottom"
            classNamePrefix="users"
          />
        </div>
      </div>
      <Button classes={styles.button_submit} handleOnClick={handleSubmit}>
        Create Meeting
      </Button>
    </form>
  );
};

export default CommonBookingForm;
