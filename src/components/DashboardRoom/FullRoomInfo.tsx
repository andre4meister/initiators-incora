import { CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import { FC } from 'react';
import { CommonMeetingType } from '../../types/CommonTypes';
import styles from './DashboardRoom.module.scss';

interface FullRoomInfoProps {
  booking: CommonMeetingType;
  isActive: boolean;
}

const FullRoomInfo: FC<FullRoomInfoProps> = ({ booking, isActive }) => {
  const editedCreatedAt: string = moment(booking.createdAt).fromNow();
  const timeFromTo = `${booking.startTime.substring(
    0,
    5,
  )}-${booking.endTime.substring(0, 5)}`;

  return (
    <div className={styles.bookingContainer}>
      <div className={styles.firstLine}>
        <div>
          <div className={styles.id}>{`#${booking.id}`}</div>
        </div>
        <div className={styles.createdAt}>{editedCreatedAt}</div>
      </div>
      <div>
        <CalendarOutlined className={styles.fullInfoIcon} />
        {booking.meetingDate}
      </div>
      <div>
        <ClockCircleOutlined className={styles.fullInfoIcon} />
        {timeFromTo}
      </div>
    </div>
  );
};

export default FullRoomInfo;
