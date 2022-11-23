/* eslint-disable @typescript-eslint/restrict-template-expressions */
import moment from 'moment';
import { FC, Suspense, useState } from 'react';
import { Await, defer, useLoaderData } from 'react-router-dom';
import Select, { SingleValue, StylesConfig } from 'react-select';
import { Booking, FetchingBooking } from 'types/dataTypes';
import useCalendar from 'hooks/useCalendar';
import Error from 'components/Error/Error';
import getRequest from 'utils/getRequest';
import Loader from 'components/UI/Loader/Loader';
import DatePicker from 'components/UI/DatePicker/DatePicker';
import Week from './Week/Week';
import Month from './Month/Month';
import Day from './Day/Day';
import styles from './CalendarPage.module.scss';

const selectStyles: StylesConfig<{ value: string; label: string }> = {
  option: (provided, { isFocused, isSelected }) => ({
    ...provided,
    color: isSelected ? '#ba2d0b' : '#001f3f',
    fontWeight: '700',
    backgroundColor: isFocused ? '#cfcfcf' : 'transparent',
  }),
  control: (provided) => ({
    ...provided,
    fontWeight: '700',
    borderRadius: '10px',
    boxShadow: 'var(--currentBoxShadowInset)',
    backgroundColor: 'var(--currentTheme)',
    border: 'none',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'var(--currentText)',
  }),
  container: (provided) => ({
    ...provided,
    width: 'fit-content',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: '12px',
    backgroundColor: '#ffffff',
  }),
  menuList: (provided) => ({
    ...provided,
    padding: '0px',
    borderRadius: '10px',
  }),
};

type ViewModeType = 'month' | 'week' | 'day';

interface DeferedData {
  bookings: Booking[];
}

const CalendarPage: FC = () => {
  const [selectedDate, setSelectedDate] = useState<moment.Moment>(
    useCalendar().today,
  );
  const { bookings } = useLoaderData() as DeferedData;
  const {
    getMonthByDay, getNextMonth, getPrevMonth, today,
  } = useCalendar();

  const [viewMode, setViewMode] = useState<ViewModeType>('week');
  const selecOptions = [
    { value: 'month', label: 'Month' },
    { value: 'week', label: 'Week' },
    { value: 'day', label: 'Day' },
  ];

  const handleSetViewMode = (
    option: SingleValue<{ value: string; label: string }>,
  ) => {
    if (option !== null) setViewMode(option.value as ViewModeType);
  };

  return (
    <Suspense fallback={<Loader />}>
      <Await resolve={bookings} errorElement={<Error />}>
        {(resolvedBookings: Booking[]) => (
          <div className={styles.container}>
            <div className={styles.sidebar}>
              <DatePicker
                setSelectedDate={setSelectedDate}
                selectedDate={selectedDate}
                getPrevMonthProp={getPrevMonth}
                getNextMonthProp={getNextMonth}
                getMonthByDayProp={getMonthByDay}
                todayProp={today}
              />
              <Select
                isMulti={false}
                isSearchable={false}
                defaultValue={{ value: 'week', label: 'Week' }}
                options={selecOptions}
                onChange={handleSetViewMode}
                styles={selectStyles}
              />
            </div>
            {viewMode === 'day' && (
              <Day bookings={resolvedBookings} selectedDate={selectedDate} />
            )}
            {viewMode === 'week' && (
              <Week bookings={resolvedBookings} selectedDate={selectedDate} />
            )}
            {viewMode === 'month' && (
              <Month
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                getMonthByDay={getMonthByDay}
                getPrevMonth={getPrevMonth}
                getNextMonth={getNextMonth}
                bookings={resolvedBookings}
              />
            )}
          </div>
        )}
      </Await>
    </Suspense>
  );
};

const getBookings = async (): Promise<Booking[]> => {
  const { data } = await getRequest<FetchingBooking>(
    `${process.env.REACT_APP_API_GET_OWN_BOOKINGS}?page=1&limit=100`,
  );

  return data.data.bookings;
};

export const calendarLoader = () => defer({
  bookings: getBookings(),
});

export default CalendarPage;
