/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import cn from 'classnames';
import moment from 'moment';
import {
  FC,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  EnvironmentOutlined,
  MailOutlined,
  SolutionOutlined,
  TeamOutlined,
  UpOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Booking } from 'types/dataTypes';

import styles from './BookingPointModal.module.scss';

interface BookingPointModalProps {
  booking: Booking
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const BookingPointModal: FC<BookingPointModalProps> = ({ booking, setIsOpen }) => {
  const [guestsSelectIsOpen, setGuestsSelectIsOpen] = useState<boolean>(false);
  const guestsSelectListRef = useRef<HTMLDivElement>(null);
  const bookingStartMoment = moment(`${booking.meetingDate} ${booking.startTime}`);
  const bookingEndMoment = moment(`${booking.meetingDate} ${booking.endTime}`);
  const endDate = moment(`${booking.endDate} ${booking.endTime}`);

  useEffect(() => {
    if (guestsSelectListRef.current !== null) {
      const height = guestsSelectListRef.current.scrollHeight;

      if (guestsSelectIsOpen) guestsSelectListRef.current.style.height = `${height}px`;
      if (!guestsSelectIsOpen) guestsSelectListRef.current.style.height = '0px';
    }
  }, [guestsSelectIsOpen]);

  const handleCloseBookingPoint = () => {
    document.body.style.overflow = 'unset';
    setIsOpen(false);
  };

  const handleToggleGuestsSelect = () => {
    setGuestsSelectIsOpen((prev) => !prev);
  };

  return (
    <div onClick={handleCloseBookingPoint} className={styles.pointModalContainer}>
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
                {booking.daysOfWeek.map((day, ind): string => (
                  `${moment.updateLocale(
                    'en',
                    {
                      week: { dow: 1 },
                      weekdays: [
                        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
                      ],
                    },
                  ).weekdays()[day - 1]}${booking.daysOfWeek.length - 1 !== ind ? ', ' : ''}`
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
                {booking.room.name}
              </h3>
              <div className={styles.bookingRoomFloor}>
                {`Floor: ${booking.room.floor}`}
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
                    {`${booking.owner.lastName} ${booking.owner.firstName}`}
                  </span>
                  <span>
                    {booking.owner.email}
                  </span>
                </div>
              </div>
              <a className={styles.userDataMailLink} href={`mailto: ${booking.owner.email}`}>
                <MailOutlined />
              </a>
            </div>
          </div>
        </abbr>
        <div className={cn(
          styles.guestsSelect,
          guestsSelectIsOpen && styles.guestsSelectOpen,
        )}
        >
          <div
            onClick={handleToggleGuestsSelect}
            className={styles.guestsSelectHeader}
          >
            <div className={cn(styles.guestsSelectHeaderLeft, styles.modalPoint)}>
              <TeamOutlined className={styles.modalPointIcon} />
              <div className={styles.guestsSelectHeaderInfo}>
                {`${booking.guests.length} guests`}
              </div>
            </div>
            <UpOutlined className={styles.guestsSelectHeaderArrow} />
          </div>
          <div ref={guestsSelectListRef} className={styles.guestsSelectList}>
            {booking.guests.map((guest) => (
              <div className={styles.guestsSelectListItem}>
                <div key={guest.id} className={styles.userData}>
                  <div className={styles.userDataLeft}>
                    <div className={styles.avatar}>
                      <UserOutlined />
                    </div>
                    <div className={styles.fullNameAndEmail}>
                      <span>
                        {`${guest.lastName} ${guest.firstName}`}
                      </span>
                      <span>
                        {guest.email}
                      </span>
                    </div>
                  </div>
                  <a className={styles.userDataMailLink} href={`mailto: ${guest.email}`}>
                    <MailOutlined />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPointModal;
