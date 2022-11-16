/* eslint-disable no-param-reassign */
import cn from 'classnames';
import moment from 'moment';
import {
  FC, ReactNode, useEffect, useRef, useState,
} from 'react';
import { Booking, Room } from 'types/dataTypes';
import getRequest from 'utils/getRequest';
import DayBookingPoint from './DayBookingPoint/DayBookingPoint';

import styles from './Day.module.scss';

interface FetchBooking {
  rooms: Room[]
}

interface DayProps {
  selectedDate: moment.Moment
}

const Day: FC<DayProps> = ({ selectedDate }) => {
  const [fetchingBooking, setFetchingBooking] = useState<FetchBooking>();
  const hours = Array.from(Array(24).keys());
  const timelineRef = useRef<HTMLDivElement>(null);

  const getBooking = async () => {
    const response = await getRequest<FetchBooking>('http://localhost:5000/booking');
    const body = response.data;
    setFetchingBooking(body);
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getBooking();
  }, []);

  const renderBookingsInLine = (room: number): ReactNode => {
    if (!fetchingBooking) return;

    const bookingAtDay: Booking[] = [];

    fetchingBooking.rooms[room].soonestBookings.forEach((booking) => {
      if (selectedDate.isSame(moment(booking.meetingDate), 'day')) {
        bookingAtDay.push(booking);
      }
    });

    // eslint-disable-next-line array-callback-return, consistent-return
    return bookingAtDay.map((booking) => (
      <DayBookingPoint booking={booking} room={fetchingBooking.rooms[room]} />
    ));
  };

  const checkPosition = () => {
    if (timelineRef.current == null) return;

    const bookingsOnDay: NodeListOf<HTMLDivElement> = timelineRef.current.querySelectorAll('.bookingPoint');

    bookingsOnDay.forEach((checkableBooking, ind) => {
      const checkedBookings: number[] = [];
      const nearbyBooking: HTMLDivElement[] = [];

      if (checkedBookings.includes(ind)) return;

      bookingsOnDay.forEach((booking, index) => {
        if (
          Math.max(
            checkableBooking.getBoundingClientRect().y,
            booking.getBoundingClientRect().y,
          )
          <= Math.min(
            checkableBooking.getBoundingClientRect().y
            + checkableBooking.getBoundingClientRect().height,
            booking.getBoundingClientRect().y + booking.getBoundingClientRect().height,
          )
        ) {
          checkedBookings.push(index);
          nearbyBooking.push(booking);
        }
      });

      if (nearbyBooking.length <= 1) return;

      nearbyBooking.forEach((item, i) => {
        const oneBookingHeght = 100 / nearbyBooking.length;

        if (i === 0) {
          item.style.left = '3px';
        } else item.style.left = `calc(${oneBookingHeght * i}% + 2px)`;

        item.style.width = `calc(${oneBookingHeght}% - 4px)`;
      });
    });
  };

  useEffect(() => {
    checkPosition();
  }, [selectedDate, fetchingBooking]);

  return (
    <div className={styles.container}>
      <h2 className={cn(styles.title, selectedDate.isSame(moment(), 'day') && styles.titleToday)}>
        {selectedDate.format('MMMM')}
        {' '}
        {selectedDate.date()}
      </h2>
      <div className={styles.timeline}>
        <div className={styles.hoursNum}>
          {hours.map((hour) => (
            <div key={hour} className={styles.hour}>
              <div className={styles.hourNum}>{hour}</div>
              <div className={styles.hourLine} />
            </div>
          ))}
        </div>
        <div ref={timelineRef} className={styles.hourLines}>
          {renderBookingsInLine(0)}
          <div>
            {hours.map((hour) => (
              <div key={hour} className={styles.hourLine} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Day;
