/* eslint-disable @typescript-eslint/restrict-template-expressions */
import moment from 'moment';
import {
  FC, Suspense, useState, useEffect,
} from 'react';
import { Await, defer, useLoaderData } from 'react-router-dom';
import Select, { SingleValue, StylesConfig } from 'react-select';
import { Booking, FetchingBooking } from 'types/dataTypes';
import useCalendar from 'hooks/useCalendar';
import Error from 'components/Error/Error';
import getRequest from 'utils/getRequest';
import Loader from 'components/UI/Loader/Loader';
import DatePicker from 'components/UI/DatePicker/DatePicker';
import RoomService from 'services/RoomService';
import Week from './Week/Week';
import Month from './Month/Month';
import Day from './Day/Day';
import styles from './CalendarPage.module.scss';

const selectStyles: StylesConfig<{ value: string; label: string }> = {
  option: (provided, { isFocused, isSelected }) => ({
    ...provided,
    color: isSelected ? '#ba2d0b' : '#var(--currentText)',
    fontWeight: '700',
    backgroundColor: isFocused ? 'grey' : 'transparent',
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
    minWidth: '100px',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: '12px',
  }),
  menuList: (provided) => ({
    ...provided,
    padding: '0px',
    borderRadius: '10px',
    backgroundColor: 'var(--secondTheme)',
    width: '100%',
  }),
};

export type ViewModeType = 'Month' | 'Week' | 'Day';

interface DeferedData {
  bookings: Booking[];
}

const CalendarPage: FC = () => {
  const [selectedDate, setSelectedDate] = useState<moment.Moment>(useCalendar().today);
  // eslint-disable-next-line max-len
  const [selectOptionsRooms, setSelectOptionsRooms] = useState<{ value: string, label: string }[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<string>('allRooms');
  const { bookings } = useLoaderData() as DeferedData;
  const {
    getMonthByDay, getNextMonth, getPrevMonth, today,
  } = useCalendar();

  const [viewMode, setViewMode] = useState<ViewModeType>('Week');
  const selecOptions = [
    { value: 'Month', label: 'Month' },
    { value: 'Week', label: 'Week' },
    { value: 'Day', label: 'Day' },
  ];

  const getRoomsForSelect = async () => {
    const rooms = await RoomService.fetchRooms({ officeId: 1, soonestBookingsDays: 1 });
    const selecOptionsRoms = rooms.data.data.rooms;
    setSelectOptionsRooms([{ value: 'allRooms', label: 'All rooms' }, ...selecOptionsRoms.map((room) => ({ value: room.name, label: room.name }))]);
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getRoomsForSelect();
  }, [bookings]);

  const handleSetViewMode = (option: SingleValue<{ value: string, label: string }>) => {
    if (option !== null) setViewMode(option.value as ViewModeType);
  };

  const handleSetRoom = (option: SingleValue<{ value: string, label: string }>) => {
    if (option !== null) setSelectedRoom(option.value);
  };

  return (
    <div className={styles.container}>
      <Suspense fallback={<Loader />}>
        <Await resolve={bookings} errorElement={<Error />}>
          {(resolvedBookings: Booking[]) => (
            <>
              <div className={styles.sidebar}>
                <div className={styles.controls}>
                  <Select
                    isMulti={false}
                    isSearchable={false}
                    defaultValue={{ value: 'Week', label: 'Week' }}
                    options={selecOptions}
                    onChange={handleSetViewMode}
                    styles={selectStyles}
                    value={{
                      value: viewMode, label: viewMode,
                    }}
                  />
                  {
                    selectOptionsRooms.length > 0 && (
                      <Select
                        isMulti={false}
                        isSearchable={false}
                        defaultValue={{ value: 'allRooms', label: 'All rooms' }}
                        options={selectOptionsRooms}
                        onChange={handleSetRoom}
                        styles={selectStyles}
                      />
                    )
                  }
                </div>
                <DatePicker
                  setSelectedDate={setSelectedDate}
                  selectedDate={selectedDate}
                  getPrevMonthProp={getPrevMonth}
                  getNextMonthProp={getNextMonth}
                  getMonthByDayProp={getMonthByDay}
                  todayProp={today}
                />
              </div>
              {viewMode === 'Day' && (
                <Day
                  selectedRoom={selectedRoom}
                  bookings={resolvedBookings}
                  selectedDate={selectedDate}
                />
              )}
              {viewMode === 'Week' && (
                <Week
                  setViewMode={setViewMode}
                  selectedRoom={selectedRoom}
                  bookings={resolvedBookings}
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                />
              )}
              {viewMode === 'Month' && (
                <Month
                  setViewMode={setViewMode}
                  selectedRoom={selectedRoom}
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  getMonthByDay={getMonthByDay}
                  getPrevMonth={getPrevMonth}
                  getNextMonth={getNextMonth}
                  bookings={resolvedBookings}
                />
              )}
            </>
          )}
        </Await>
      </Suspense>
    </div>
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
