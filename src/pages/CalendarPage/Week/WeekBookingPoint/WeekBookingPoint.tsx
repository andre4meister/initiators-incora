/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import moment from 'moment';
import cn from 'classnames';
import { FC, useCallback, useEffect } from 'react';
import { Booking } from 'types/dataTypes';
import { useAppDispatch } from 'hooks/reduxHooks';
import { setSelectedBooking } from 'store/selectedBooking';
import { toggleModalType } from 'store/modal';

import styles from './WeekBookingPoint.module.scss';

interface WeekBookingPointProps {
  booking: Booking;
}

const WeekBookingPoint: FC<WeekBookingPointProps> = ({ booking }) => {
  const bookingStartMoment = moment(`${booking.meetingDate} ${booking.startTime}`);
  const bookingEndMoment = moment(`${booking.meetingDate} ${booking.endTime}`);
  const dispatch = useAppDispatch();

  const horizontalPosition = useCallback(() => {
    const hourWidth = 150;
    const startHour = bookingStartMoment.hour();
    const startMinute = bookingStartMoment.minute();
    const endHour = bookingEndMoment.hour();
    const endMinute = bookingEndMoment.minute();

    const pointStyle = {
      width: `${(((endHour - startHour) * 60) + (endMinute - startMinute)) * (hourWidth / 60)}px`,
      left: `${((startHour * 60) + startMinute) * (hourWidth / 60)}px`,
    };

    return pointStyle;
  }, [bookingEndMoment, bookingStartMoment]);

  useEffect(() => {
    horizontalPosition();
  }, [horizontalPosition]);

  const handleOpenBookingPoint = () => {
    dispatch(setSelectedBooking(booking));
    dispatch(toggleModalType('BookingInfo'));
  };

  return (
    <div
      onClick={handleOpenBookingPoint}
      style={horizontalPosition()}
      className={cn(
        'timelinePoint',
        styles.timelinePoint,
      )}
    >
      <h3 className={styles.bookingTitle}>{booking.title}</h3>
      <div className={styles.period}>
        {
          `${bookingStartMoment.format('H')}:${bookingStartMoment.format('mm')} - ${bookingEndMoment.format('H')}:${bookingEndMoment.format('mm')}`
        }
      </div>
    </div>
  );
};

export default WeekBookingPoint;
