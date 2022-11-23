/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import cn from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch } from 'hooks/reduxHooks';
import moment from 'moment';
import { FC, WheelEvent } from 'react';
import { toggleModalType } from 'store/modal';
import { setSelectedBooking } from 'store/selectedBooking';
import { Booking } from 'types/dataTypes';

import styles from './Month.module.scss';

interface MonthProps {
  bookings: Booking[];
  selectedDate: moment.Moment;
  setSelectedDate: React.Dispatch<React.SetStateAction<moment.Moment>>;
  getPrevMonth: () => moment.Moment[];
  getNextMonth: () => moment.Moment[];
  getMonthByDay: () => moment.Moment[];
}

const Month: FC<MonthProps> = ({
  selectedDate,
  setSelectedDate,
  getPrevMonth,
  getNextMonth,
  getMonthByDay,
  bookings,
}) => {
  const dispatch = useAppDispatch();

  const horizontalScrollChangeMonth = (e: WheelEvent<HTMLDivElement>) => {
    if (e.deltaY > 0) {
      getNextMonth();
    } else {
      getPrevMonth();
    }
  };

  function setBookingAtDay(day: moment.Moment) {
    return bookings.map((booking) => {
      if (day.format('DDD') !== moment(booking.meetingDate).format('DDD')) { return; }

      const start = moment(
        `${booking.meetingDate} ${booking.startTime}`,
      ).hour();

      const handleOpenBookingPoint = () => {
        dispatch(setSelectedBooking(booking));
        dispatch(toggleModalType('BookingInfo'));
      };

      return (
        <li
          key={uuidv4()}
          className={styles.bookingListItem}
          onClick={handleOpenBookingPoint}
        >
          <div className={styles.bookingListItemInfo}>
            <span className={styles.bookingListItemTime}>
              {start < 12 ? `${start}am` : `${start - 12}pm`}
            </span>
            &nbsp;
            <span className={styles.bookingListItemTitle}>{booking.title}</span>
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
          <h2 onClick={() => handleSelectDate(day)} className={styles.dayNum}>
            {day.date()}
          </h2>
          <ul
            onWheel={(e) => e.stopPropagation()}
            className={styles.bookingList}
          >
            {setBookingAtDay(day)}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Month;
