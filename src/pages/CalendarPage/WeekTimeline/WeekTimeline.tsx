// Required to set styles for points
/* eslint-disable no-param-reassign */

import moment from 'moment';
import {
  FC, WheelEvent, useRef, useEffect, useState,
} from 'react';
import useCalendar from 'hooks/useCalendar';
import { Booking, Room } from 'types/dataTypes';
import getRequest from 'utils/getRequest';
import Loader from 'components/UI/Loader/Loader';
import TimelinePoint from '../TimelinePoint/TimelinePoint';

import styles from '../CalendarPage.module.scss';

interface FetchBooking {
  rooms: Room[]
}

interface WeekTimelineProps {
  selectedDate: moment.Moment
}

const WeekTimeline: FC<WeekTimelineProps> = ({ selectedDate }) => {
  const mondayRef = useRef<HTMLDivElement>(null);
  const tuesdayRef = useRef<HTMLDivElement>(null);
  const wednesdayRef = useRef<HTMLDivElement>(null);
  const thursdayRef = useRef<HTMLDivElement>(null);
  const fridayRef = useRef<HTMLDivElement>(null);
  const saturdayRef = useRef<HTMLDivElement>(null);
  const sundayRef = useRef<HTMLDivElement>(null);

  const weekRef = useRef<HTMLDivElement>(null);
  const hours = Array.from(Array(24).keys());
  const [fetchingBooking, setFetchingBooking] = useState<FetchBooking | null>(null);
  const { getWeekByDay } = useCalendar();

  const getBooking = async () => {
    const response = await getRequest<FetchBooking>('http://localhost:5000/booking');
    const body = response.data;
    setFetchingBooking(body);
  };

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getBooking();
  }, []);

  const horizontalScroll = (e: WheelEvent<HTMLDivElement>) => {
    if (weekRef.current === null) return;

    if (e.deltaY > 0) {
      weekRef.current.scrollLeft += 100;
    } else {
      weekRef.current.scrollLeft -= 100;
    }
  };

  const renderPoint = (weekDay: number, room: number): React.ReactNode => {
    if (fetchingBooking === null) return;
    const bookingDuringTheDay: Booking[] = [];
    const { soonestBookings, ...roomProp } = fetchingBooking.rooms[room];

    soonestBookings.forEach((bookingDay) => {
      if (getWeekByDay(selectedDate)[weekDay].format('DDD') === moment(bookingDay.meetingDate).format('DDD')) {
        bookingDuringTheDay.push(bookingDay);
      }
    });

    // eslint-disable-next-line consistent-return
    return bookingDuringTheDay.map((booking) => (
      <TimelinePoint key={booking.id} room={roomProp} bookingDate={booking} />
    ));
  };

  const checkPosition = (ref: HTMLDivElement | null) => {
    const checkedBookings: number[] = [];
    let bookingsOnDay: NodeListOf<HTMLDivElement> | null = null;

    if (ref === null) return;

    bookingsOnDay = ref.querySelectorAll('.bokingLine');

    bookingsOnDay.forEach((checkableBooking, ind) => {
      const bookings: HTMLDivElement[] = [];

      if (checkedBookings.includes(ind)) return;
      if (bookingsOnDay === null) return;

      bookingsOnDay.forEach((booking, index) => {
        if (
          Math.max(
            checkableBooking.getBoundingClientRect().x,
            booking.getBoundingClientRect().x,
          )
          <= Math.min(
            checkableBooking.getBoundingClientRect().x
            + checkableBooking.getBoundingClientRect().width,
            booking.getBoundingClientRect().x + booking.getBoundingClientRect().width,
          )
        ) {
          checkedBookings.push(index);
          bookings.push(booking);
        }
      });

      if (bookings.length <= 1) return;

      bookings.forEach((item, i) => {
        const oneBookingHeght = 100 / bookings.length;

        if (i === 0) {
          item.style.top = '3px';
        } else item.style.top = `calc(${oneBookingHeght * i}% + 2px)`;

        item.style.height = `calc(${oneBookingHeght}% - 4px)`;
      });
    });
  };

  useEffect(() => {
    checkPosition(mondayRef.current);
    checkPosition(tuesdayRef.current);
    checkPosition(wednesdayRef.current);
    checkPosition(thursdayRef.current);
    checkPosition(fridayRef.current);
    checkPosition(saturdayRef.current);
    checkPosition(sundayRef.current);
  }, [selectedDate, fetchingBooking]);

  return (
    <>
      <div className={styles.days}>
        {getWeekByDay(selectedDate).map((day) => (
          <div
            key={day.format('DDD')}
            className={styles.day}
          >
            <div className={styles.weekDayName}>{moment.weekdaysShort(day.day())}</div>
            <div className={styles.dayNumOfMonth}>{day.date()}</div>
          </div>
        ))}
      </div>
      <div ref={weekRef} className={styles.calendar} onWheel={horizontalScroll}>
        <div className={styles.timeline}>
          <div className={styles.timelineRow}>
            {hours.map((hour) => (
              <div
                key={hour}
                className={styles.hour}
              >
                {`${hour} : 00`}
              </div>
            ))}
          </div>
          <div className={styles.dayRows}>
            <div ref={mondayRef} className={styles.dayRow}>
              {renderPoint(0, 0)}
            </div>
            <div ref={tuesdayRef} className={styles.dayRow}>
              {renderPoint(1, 0)}
            </div>
            <div ref={wednesdayRef} className={styles.dayRow}>
              {renderPoint(2, 0)}
            </div>
            <div ref={thursdayRef} className={styles.dayRow}>
              {renderPoint(3, 0)}
            </div>
            <div ref={fridayRef} className={styles.dayRow}>
              {renderPoint(4, 0)}
            </div>
            <div ref={saturdayRef} className={styles.dayRow}>
              {renderPoint(5, 0)}
            </div>
            <div ref={sundayRef} className={styles.dayRow}>
              {renderPoint(6, 0)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeekTimeline;
