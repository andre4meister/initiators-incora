import moment from 'moment';
import cn from 'classnames';
import { FC, useCallback, useEffect } from 'react';
import { Booking } from 'types/dataTypes';

import styles from './WeekBookingPoint.module.scss';

interface WeekBookingPointProps {
  booking: Booking
}

const WeekBookingPoint: FC<WeekBookingPointProps> = ({ booking }) => {
  const horizontalPosition = useCallback(() => {
    const hourWidth = 150;
    const startHour = moment(`${booking.meetingDate} ${booking.startTime}`).hour();
    const startMinute = moment(`${booking.meetingDate} ${booking.startTime}`).minute();
    const endHour = moment(`${booking.meetingDate} ${booking.endTime}`).hour();
    const endMinute = moment(`${booking.meetingDate} ${booking.endTime}`).minute();

    const pointStyle = {
      width: `${(((endHour - startHour) * 60) + (endMinute - startMinute)) * (hourWidth / 60)}px`,
      left: `${((startHour * 60) + startMinute) * (hourWidth / 60)}px`,
    };

    return pointStyle;
  }, [booking.endTime, booking.meetingDate, booking.startTime]);

  useEffect(() => {
    horizontalPosition();
  }, [horizontalPosition]);

  return (
    <div style={horizontalPosition()} className={cn('timelinePoint', styles.timelinePoint)}>
      <h3 className={styles.roomName}>{booking.room.name}</h3>
      <div className={styles.period}>
        {booking.startTime.substring(0, 5)}
        -
        {booking.endTime.substring(0, 5)}
      </div>
    </div>
  );
};

export default WeekBookingPoint;
