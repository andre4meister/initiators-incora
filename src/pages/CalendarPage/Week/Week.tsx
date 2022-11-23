/* eslint-disable no-param-reassign */
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import {
  FC, WheelEvent, useRef, useEffect, useCallback,
} from 'react';
import useCalendar from 'hooks/useCalendar';
import { Booking } from 'types/dataTypes';
import WeekBookingPoint from './WeekBookingPoint/WeekBookingPoint';

import styles from './Week.module.scss';

interface WeekProps {
  selectedDate: moment.Moment;
  bookings: Booking[];
}

const Week: FC<WeekProps> = ({ selectedDate, bookings }) => {
  const mondayRef = useRef<HTMLDivElement>(null);
  const tuesdayRef = useRef<HTMLDivElement>(null);
  const wednesdayRef = useRef<HTMLDivElement>(null);
  const thursdayRef = useRef<HTMLDivElement>(null);
  const fridayRef = useRef<HTMLDivElement>(null);
  const saturdayRef = useRef<HTMLDivElement>(null);
  const sundayRef = useRef<HTMLDivElement>(null);
  const weekRef = useRef<HTMLDivElement>(null);
  const nowFlag = useRef<HTMLDivElement>(null);
  const hours = Array.from(Array(24).keys());
  const { getWeekByDay } = useCalendar();

  const horizontalScroll = (e: WheelEvent<HTMLDivElement>) => {
    if (weekRef.current === null) return;

    if (e.deltaY > 0) {
      weekRef.current.scrollLeft += 100;
    } else {
      weekRef.current.scrollLeft -= 100;
    }
  };

  const setNowFlag = () => {
    const hourWidth = 150;
    if (!nowFlag.current) return;
    nowFlag.current.style.left = `${((moment().hour() * 60) + moment().minute()) * (hourWidth / 60) - 1}px`;
  };

  useEffect(() => {
    let minute = moment().minute();

    setNowFlag();
    const nowFlagUpdateInterval = setInterval(
      () => {
        if (minute !== moment().minute()) {
          minute = moment().minute();
          setNowFlag();
        }
      },
      1000,
    );

    if (weekRef.current !== null && nowFlag.current !== null) {
      weekRef.current.scrollLeft = +nowFlag.current.style.left.match(/\d*\.\d*|\d*/)![0] - (weekRef.current.clientWidth / 2);
    }

    return () => clearInterval(nowFlagUpdateInterval);
  }, []);

  function renderPoint(weekDay: number): React.ReactNode {
    const bookingDuringTheDay: Booking[] = [];

    bookings.forEach((bookingDay) => {
      if (getWeekByDay(selectedDate)[weekDay].format('DDD') === moment(bookingDay.meetingDate).format('DDD')) {
        bookingDuringTheDay.push(bookingDay);
      }
    });

    return bookingDuringTheDay.map((booking) => (
      <WeekBookingPoint key={uuidv4()} booking={booking} />
    ));
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkPosition = (ref: HTMLDivElement | null) => {
    const checkedBookings: number[] = [];
    let bookingsOnDay: NodeListOf<HTMLDivElement> | null = null;

    if (ref === null) return;

    bookingsOnDay = ref.querySelectorAll('.timelinePoint');

    bookingsOnDay.forEach((checkableBooking, ind) => {
      const bookingPoints: HTMLDivElement[] = [];

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
          bookingPoints.push(booking);
        }
      });

      if (bookingPoints.length <= 1) return;

      bookingPoints.forEach((item, i) => {
        const oneBookingHeght = 100 / bookingPoints.length;

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
  }, [selectedDate, bookings, checkPosition]);

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
            <div ref={nowFlag} className={styles.nowFlag} />
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
              {renderPoint(0)}
            </div>
            <div ref={tuesdayRef} className={styles.dayRow}>
              {renderPoint(1)}
            </div>
            <div ref={wednesdayRef} className={styles.dayRow}>
              {renderPoint(2)}
            </div>
            <div ref={thursdayRef} className={styles.dayRow}>
              {renderPoint(3)}
            </div>
            <div ref={fridayRef} className={styles.dayRow}>
              {renderPoint(4)}
            </div>
            <div ref={saturdayRef} className={styles.dayRow}>
              {renderPoint(5)}
            </div>
            <div ref={sundayRef} className={styles.dayRow}>
              {renderPoint(6)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Week;
