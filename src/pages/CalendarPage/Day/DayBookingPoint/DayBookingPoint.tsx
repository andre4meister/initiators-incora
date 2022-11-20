import cn from 'classnames';
import moment from 'moment';
import { FC } from 'react';
import { Booking } from 'types/dataTypes';

import styles from './DayBookingPoint.module.scss';

interface DayBookingPointProps {
  booking: Booking
}

const DayBookingPoint: FC<DayBookingPointProps> = ({ booking }) => {
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

  return (
    <div
      style={verticalPosition()}
      className={cn('bookingPoint', styles.bookingPoint)}
    >
      <h3 className={styles.roomName}>{booking.room.name}</h3>
      <div className={styles.period}>
        {booking.startTime.substring(0, 5)}
        -
        {booking.endTime.substring(0, 5)}
      </div>
    </div>
  );
};

export default DayBookingPoint;
