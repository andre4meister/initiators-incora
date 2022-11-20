/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import cn from 'classnames';
import moment from 'moment';
import { FC, WheelEvent } from 'react';
import { Booking } from 'types/dataTypes';

import styles from './Month.module.scss';

interface MonthProps {
  bookings: Booking[]
  selectedDate: moment.Moment
  setSelectedDate: React.Dispatch<React.SetStateAction<moment.Moment>>
  getPrevMonth: () => moment.Moment[]
  getNextMonth: () => moment.Moment[]
  getMonthByDay: () => moment.Moment[]
}

const Month: FC<MonthProps> = ({
  selectedDate,
  setSelectedDate,
  getPrevMonth,
  getNextMonth,
  getMonthByDay,
  bookings,
}) => {
  const horizontalScrollChangeMonth = (e: WheelEvent<HTMLDivElement>) => {
    if (e.deltaY > 0) {
      getNextMonth();
    } else {
      getPrevMonth();
    }
  };

  function setBookingAtDay(day: moment.Moment) {
    return bookings.map((booking) => {
      if (day.format('DDD') !== moment(booking.meetingDate).format('DDD')) return;

      const start = moment(`${booking.meetingDate} ${booking.startTime}`).hour();

      return (
        <li key={booking.id} className={styles.bookingListItem}>
          <div className={styles.bookingListItemInfo}>
            <span className={styles.bookingListItemTime}>{start < 12 ? `${start}am` : `${start - 12}pm`}</span>
            &nbsp;
            <span className={styles.bookingListItemRoom}>{booking.room.name}</span>
          </div>
        </li>
      );
    });
  }

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
            {setBookingAtDay(day)}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Month;
