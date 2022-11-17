import moment from 'moment';
import { FC, Suspense, useState } from 'react';
import { Await, defer, useLoaderData } from 'react-router-dom';
import Select, { SingleValue } from 'react-select';
import { Booking, FetchingBooking } from 'types/dataTypes';
import useCalendar from 'hooks/useCalendar';
import getRequest from 'utils/getRequest';
import Loader from 'components/UI/Loader/Loader';
import DatePicker from 'components/UI/DatePicker/DatePicker';
import Week from './Week/Week';
import Month from './Month/Month';
import Day from './Day/Day';
import styles from './CalendarPage.module.scss';

type ViewModeType = 'month' | 'week' | 'day';

interface DeferedData {
  bookings: Booking[]
}

const CalendarPage: FC = () => {
  const [selectedDate, setSelectedDate] = useState<moment.Moment>(useCalendar().today);
  const { bookings } = useLoaderData() as DeferedData;
  const {
    getMonthByDay,
    getNextMonth,
    getPrevMonth,
    today,
  } = useCalendar();

  const [viewMode, setViewMode] = useState<ViewModeType>('week');
  const selecOptions = [
    { value: 'month', label: 'Month' },
    { value: 'week', label: 'Week' },
    { value: 'day', label: 'Day' },
  ];

  const handleSetViewMode = (newValue: SingleValue<{ value: string, label: string }>) => {
    if (newValue !== null) setViewMode(newValue.value as ViewModeType);
  };

  return (
    <Suspense fallback={<Loader />}>
      <Await resolve={bookings}>
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
                isSearchable={false}
                defaultValue={{ value: 'week', label: 'Week' }}
                options={selecOptions}
                onChange={handleSetViewMode}
              />
            </div>
            {viewMode === 'day' && <Day bookings={resolvedBookings} selectedDate={selectedDate} />}
            {viewMode === 'week' && <Week bookings={resolvedBookings} selectedDate={selectedDate} />}
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
  const { data } = await getRequest<FetchingBooking>('https://initiators-ua.herokuapp.com/bookings/own');

  return data.data.bookings;
};

export const calendarLoader = () => defer({
  bookings: getBookings(),
});

export default CalendarPage;
