/* eslint-disable no-param-reassign */
import { v4 as uuidv4 } from 'uuid';
import { FC, useEffect, useRef } from 'react';
import cn from 'classnames';
import moment from 'moment';
import { Booking } from 'types/dataTypes';
import DayBookingPoint from './DayBookingPoint/DayBookingPoint';

import styles from './Day.module.scss';

interface DayProps {
  selectedDate: moment.Moment
  bookings: Booking[]
  selectedRoom: string
}

const Day: FC<DayProps> = ({ selectedDate, bookings, selectedRoom }) => {
  const hours = Array.from(Array(24).keys());
  const timelineRef = useRef<HTMLDivElement>(null);

  function sortBookingsByRooms() {
    return bookings.filter((booking) => {
      if (selectedRoom === 'allRooms') return booking;
      if (booking.room.name === selectedRoom) return booking;
      return false;
    });
  }

  function renderBookingsInLine(): JSX.Element[] {
    const bookingAtDay: Booking[] = [];

    sortBookingsByRooms().forEach((booking) => {
      if (selectedDate.isSame(moment(booking.meetingDate), 'day')) {
        bookingAtDay.push(booking);
      }
    });

    return bookingAtDay.map((booking) => (
      <DayBookingPoint key={uuidv4()} booking={booking} />
    ));
  }

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
  }, [selectedDate, bookings, selectedRoom]);

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
          {renderBookingsInLine()}
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
