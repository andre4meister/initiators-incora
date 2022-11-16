/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import cn from 'classnames';
import useCalendar from 'hooks/useCalendar';
import moment from 'moment';
import {
  FC, ReactNode, useEffect, useState, WheelEvent,
} from 'react';
import { Room } from 'types/dataTypes';
import getRequest from 'utils/getRequest';

import styles from './Month.module.scss';

interface FetchBooking {
  rooms: Room[]
}

interface MonthProps {
  selectedDate: moment.Moment
  setSelectedDate: React.Dispatch<React.SetStateAction<moment.Moment>>
  getPrevMonth: () => moment.Moment[]
  getNextMonth: () => moment.Moment[]
  getMonthByDay: () => moment.Moment[]
  today: moment.Moment
}

const Month: FC<MonthProps> = ({
  selectedDate,
  setSelectedDate,
  getPrevMonth,
  getNextMonth,
  getMonthByDay,
  today,
}) => {
  const [fetchBooking, setFetchBooking] = useState<FetchBooking>();
  // const { today } = useCalendar();

  const getBooking = async () => {
    const response = await getRequest<FetchBooking>('http://localhost:5000/booking');
    const body = response.data;
    setFetchBooking(body);
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getBooking();
  }, []);

  const horizontalScrollChangeMonth = (e: WheelEvent<HTMLDivElement>) => {
    if (e.deltaY > 0) {
      getNextMonth();
    } else {
      getPrevMonth();
    }
  };

  const setBookingAtDay = (day: moment.Moment, room: number): ReactNode => {
    if (!fetchBooking) return;

    // eslint-disable-next-line consistent-return, array-callback-return
    return fetchBooking.rooms[room].soonestBookings.map((booking) => {
      if (day.format('DDD') === moment(booking.meetingDate).format('DDD')) {
        const start = moment(`${booking.meetingDate} ${booking.startTime}`).hour();

        return (
          <li key={booking.id} className={styles.bookingListItem}>
            <div className={styles.bookingListItemInfo}>
              <span className={styles.bookingListItemTime}>{start < 12 ? `${start}am` : `${start - 12}pm`}</span>
              &nbsp;
              <span className={styles.bookingListItemRoom}>{fetchBooking.rooms[room].name}</span>
            </div>
          </li>
        );
      }
    });
  };

  const handleSelectDate = (day: moment.Moment) => {
    setSelectedDate(day);
  };

  return (
    <div onWheel={horizontalScrollChangeMonth} className={styles.container}>
      {getMonthByDay().map((day) => (
        <div
          key={day.format('DDD')}
          className={cn(
            styles.day,
            day.isSame(moment(), 'day') && styles.today,
            day.isSame(selectedDate, 'day') && styles.selected,
          )}
        >
          <h2 onClick={() => handleSelectDate(day)} className={styles.dayNum}>{day.date()}</h2>
          <ul onWheel={(e) => e.stopPropagation()} className={styles.bookingList}>
            {setBookingAtDay(day, 0)}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Month;
