/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable no-param-reassign */
import {
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  FormOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import OfficeOutlined from 'assets/Icons/OfficeSVG';
import Button from 'components/UI/Button/Button';
import { useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import { FC, useEffect } from 'react';
import Select from 'react-select';
import { BookingFormValues, SubmitBookingFormValues } from 'types/FormTypes';
import moment, { now } from 'moment';
import yupPattern from 'utils/yupPattern';
import InputError from 'components/InputError/InputError';
import * as Yup from 'yup';
import { validateBookingTime } from 'utils/bookingUtils';
import { createOneTimeBooking, createRecurringBooking } from 'store/booking';
import { weekDays } from 'utils/commonConstants';
import styles from './Booking.module.scss';
import './Booking.scss';

const users = [
  { value: 'incora_initiators@meta.ua', label: 'incora_initiators@meta.ua' },
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

  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      id: Math.floor(Math.random() * 10001),
      title: '',
      guests: [],
      accoundId: 41,
      roomId: chosenRoom,
      startTime: chosenStartTime || moment(now()).format('HH:mm'),
      endTime:
        chosenEndTime || moment(now()).add(30, 'minutes').format('HH:mm'),
      startDate: chosenStartDate || moment(now()).format('YYYY-MM-DD'),
      endDate:
        chosenEndDate || moment(now()).add(1, 'weeks').format('YYYY-MM-DD'),
      meetingDate: chosenMeetingDate || moment(now()).format('YYYY-MM-DD'),
      daysOfWeek: [] as number[],
    },
    validationSchema: Yup.object({
      startTime: yupPattern('startTime'),
      endTime: yupPattern('endTime'),
      title: yupPattern('firstName'),
      ...(isReccuring
        ? {
          startDate: yupPattern('startDate'),
          endDate: yupPattern('endDate'),
          daysOfWeek: yupPattern('daysOfWeek'),
        }
        : { meetingDate: yupPattern('meetingDate') }),
    }),
    onSubmit: (values: Omit<BookingFormValues, 'createdAt'>) => {
      const submitValues: SubmitBookingFormValues = { ...values };
      if (isReccuring) {
        delete submitValues.meetingDate;
        dispatch(createRecurringBooking(submitValues));
        delete submitValues.startDate;
      } else {
        delete submitValues.endDate;
        delete submitValues.daysOfWeek;
        dispatch(createOneTimeBooking(submitValues));
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
        <FormOutlined className={styles.icon} />
        <div className={styles.inputContainer}>
          <input
            placeholder="Title"
            className={styles.titleInput}
            onChange={(e) => setFieldValue('title', e.currentTarget.value)}
            name="title"
            type="text"
            value={values.title}
          />
          {touched.title && errors.title ? (
            <InputError message={errors.title} />
          ) : null}
        </div>
      </div>
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
              <div className={styles.inputContainer}>
                <input
                  type="date"
                  id="startDate"
                  value={values.startDate?.toString()}
                  onChange={handleChange}
                  className={styles.picker}
                />
                {touched.startDate && errors.startDate ? (
                  <InputError message={errors.startDate} />
                ) : null}
              </div>
              <div className={styles.inputContainer}>
                <input
                  type="date"
                  id="endDate"
                  value={values.endDate?.toString()}
                  onChange={handleChange}
                  className={styles.picker}
                />
                {touched.endDate && errors.endDate ? (
                  <InputError message={errors.endDate} />
                ) : null}
              </div>
            </>
          ) : null}
          {!isReccuring ? (
            <div className={styles.inputContainer}>
              <input
                type="date"
                name="meetingDate"
                id="meetingDate"
                value={values.meetingDate.toString()}
                onChange={handleChange}
                className={styles.picker}
              />
              {touched.meetingDate && errors.meetingDate ? (
                <InputError message={errors.meetingDate} />
              ) : null}
            </div>
          ) : null}
          <div className={styles.inputContainer}>
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
            {errors.startTime && touched.startTime && (
              <InputError message={errors.startTime} />
            )}
          </div>
          <div className={styles.inputContainer}>
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
            {errors.endTime && touched.endTime && (
              <InputError message={errors.endTime} />
            )}
          </div>
          {isReccuring && (
            <div className={styles.inputContainer}>
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
              {errors.daysOfWeek && touched.daysOfWeek && (
              <InputError message={errors.daysOfWeek} />
              )}
            </div>
          )}
        </div>
      </div>
      <div className={styles.form_item}>
        <UsergroupAddOutlined className={styles.icon} />
        <div className={styles.content}>
          <div className={styles.inputContainer}>
            <Select
              options={users}
              onChange={(guests) => {
                setFieldValue(
                  'guests',
                  guests.map((guest) => guest.value),
                );
              }}
              className={styles.picker}
              isMulti
              maxMenuHeight={70}
              menuPlacement="bottom"
              classNamePrefix="users"
            />
            {errors.guests && touched.guests && (
              <InputError message={errors.guests?.toString()} />
            )}
          </div>
        </div>
      </div>
      <Button classes={styles.button_submit} handleOnClick={handleSubmit}>
        Create Meeting
      </Button>
    </form>
  );
};

export default CommonBookingForm;
