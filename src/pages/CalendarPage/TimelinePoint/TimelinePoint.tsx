import moment from 'moment';
import cn from 'classnames';
import {
  FC, useCallback, useEffect, useRef,
} from 'react';
import { Booking, Room } from 'types/dataTypes';

import styles from '../CalendarPage.module.scss';

interface TimelinePointProps {
  bookingDate: Booking
  room: Omit<Room, 'soonestBookings'>
}

const TimelinePoint: FC<TimelinePointProps> = ({ bookingDate, room }) => {
  const pointRef = useRef<HTMLDivElement>(null);

  const horizontalPosition = useCallback(() => {
    const hourWidth = 150;
    const startHour = moment(`${bookingDate.meetingDate} ${bookingDate.startTime}`).hour();
    const startMinute = moment(`${bookingDate.meetingDate} ${bookingDate.startTime}`).minute();
    const endHour = moment(`${bookingDate.meetingDate} ${bookingDate.endTime}`).hour();
    const endMinute = moment(`${bookingDate.meetingDate} ${bookingDate.endTime}`).minute();

    const pointStyle = {
      width: `${(((endHour - startHour) * 60) + (endMinute - startMinute)) * (hourWidth / 60)}px`,
      left: `${((startHour * 60) + startMinute) * (hourWidth / 60)}px`,
    };

    return pointStyle;
  }, [bookingDate.endTime, bookingDate.meetingDate, bookingDate.startTime]);

  useEffect(() => {
    horizontalPosition();
  }, [horizontalPosition]);

  return (
    <div ref={pointRef} style={horizontalPosition()} className={cn('bokingLine', styles.bokingLine)}>
      <h3 className={styles.roomName}>{room.name}</h3>
      <div className={styles.period}>
        {bookingDate.startTime.substring(0, 5)}
        -
        {bookingDate.endTime.substring(0, 5)}
      </div>
    </div>
  );
};

export default TimelinePoint;
