/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import cn from 'classnames';
import moment from 'moment';
import { FC, MouseEvent } from 'react';
import {
  EnvironmentOutlined,
  MailOutlined,
  SolutionOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useAppSelector } from 'hooks/reduxHooks';
import GuestsSelect from 'components/UI/GuestsSelect/GuestsSelect';

import styles from './BookingPointModal.module.scss';

const BookingPointModal: FC = () => {
  const booking = useAppSelector((state) => state.selectedBooking.booking);
  const bookingStartMoment = moment(`${booking.meetingDate} ${booking.startTime}`);
  const bookingEndMoment = moment(`${booking.meetingDate} ${booking.endTime}`);
  const endDate = moment(`${booking.endDate} ${booking.endTime}`);
  const daysOfWeek = booking.daysOfWeek ? booking.daysOfWeek : [];
  const guests = booking.guests ? booking.guests : [];
  const room = booking.room ? booking.room : { name: '', floor: 0 };
  const owner = booking.owner ? booking.owner : { lastName: '', firstName: '', email: '' };

  return (
    <div
      onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      className={styles.pointModal}
    >
      <div className={styles.pointModalHeader}>
        <h2 className={styles.bookingTitle}>
          {booking.title}
        </h2>
        <div className={styles.bookingDate}>
          {`${bookingStartMoment.format('dddd')}, ${bookingStartMoment.format('D')} ${bookingStartMoment.format('MMMM')}`}
          <span className={styles.bookingDateSeparator}>
            &#183;
          </span>
          {`${bookingStartMoment.format('H')}:${bookingStartMoment.format('mm')} - ${bookingEndMoment.format('H')}:${bookingEndMoment.format('mm')}`}
        </div>
        {
          booking.isRecurring
          && (
            <div className={styles.recuringDays}>
              {'Weekly - '}
              {daysOfWeek.map((day, ind): string => (
                `${moment.weekdays()[day]}${daysOfWeek.length - 1 !== ind ? ', ' : ''}`
              ))}
              {`, until the ${endDate.format('D')} ${endDate.format('MMM')} ${endDate.format('YYYY')}`}
            </div>
          )
        }
      </div>
      <abbr style={{ textDecoration: 'none' }} title="Booking room">
        <div className={cn(styles.bookingRoom, styles.modalPoint)}>
          <EnvironmentOutlined className={styles.modalPointIcon} />
          <div className={styles.bookingRoomData}>
            <h3 className={styles.bookingRoomName}>
              {room.name}
            </h3>
            <div className={styles.bookingRoomFloor}>
              {`Floor: ${room.floor}`}
            </div>
          </div>

        </div>
      </abbr>
      <abbr style={{ textDecoration: 'none' }} title="Author">
        <div className={cn(styles.owner, styles.modalPoint)}>
          <SolutionOutlined className={styles.modalPointIcon} />
          <div className={styles.userData}>
            <div className={styles.userDataLeft}>
              <div className={styles.avatar}>
                <UserOutlined />
              </div>
              <div className={styles.fullNameAndEmail}>
                <span>
                  {`${owner.lastName} ${owner.firstName}`}
                </span>
                <span>
                  {owner.email}
                </span>
              </div>
            </div>
            <a className={styles.userDataMailLink} href={`mailto: ${owner.email}`}>
              <MailOutlined />
            </a>
          </div>
        </div>
      </abbr>
      <GuestsSelect guests={guests} />
    </div>
  );
};

export default BookingPointModal;
