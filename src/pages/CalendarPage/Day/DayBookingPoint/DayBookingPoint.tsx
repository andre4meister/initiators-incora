/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import cn from 'classnames';
import { useAppDispatch } from 'hooks/reduxHooks';
import moment from 'moment';
import { FC } from 'react';
import { toggleModalType } from 'store/modal';
import { setSelectedBooking } from 'store/selectedBooking';
import { Booking } from 'types/dataTypes';

import styles from './DayBookingPoint.module.scss';

interface DayBookingPointProps {
  booking: Booking
}

const DayBookingPoint: FC<DayBookingPointProps> = ({ booking }) => {
  const dispatch = useAppDispatch();

  const verticalPosition = () => {
    const start = moment(`${booking.meetingDate} ${booking.startTime}`);
    const end = moment(`${booking.meetingDate} ${booking.endTime}`);

    const pointStyle = {
      top: ((start.hour() * 60) + start.minute()) * (50 / 60),
      height: (
        ((end.hour() - start.hour()) * 60)
        + (end.minute() - start.minute())
      ) * (50 / 60),
    };

    return pointStyle;
  };

  const handleOpenBookingPoint = () => {
    dispatch(setSelectedBooking(booking));
    dispatch(toggleModalType('BookingInfo'));
  };

  return (
    <div
      style={verticalPosition()}
      className={cn('bookingPoint', styles.bookingPoint)}
      onClick={handleOpenBookingPoint}
    >
      <h3 className={styles.bookingTitle}>{booking.title}</h3>
      <div className={styles.period}>
        {booking.startTime.substring(0, 5)}
        -
        {booking.endTime.substring(0, 5)}
      </div>
    </div>
  );
};

export default DayBookingPoint;
