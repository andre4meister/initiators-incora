/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import cn from 'classnames';
import {
  TeamOutlined, UpOutlined, UserOutlined, MailOutlined,
} from '@ant-design/icons';
import {
  FC, useEffect, useRef, useState,
} from 'react';
import { Booking } from 'types/dataTypes';
import { CommonMeetingType } from 'types/CommonTypes';

import styles from './GuestsSelect.module.scss';

interface GuestsSelectProps {
  booking: Booking | CommonMeetingType;
  classes?: string;
}

const GuestsSelect: FC<GuestsSelectProps> = ({ booking, classes = '' }) => {
  const [guestsSelectIsOpen, setGuestsSelectIsOpen] = useState<boolean>(false);
  const guestsSelectListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (guestsSelectListRef.current !== null) {
      const height = guestsSelectListRef.current.scrollHeight;

      if (guestsSelectIsOpen) { guestsSelectListRef.current.style.height = `${height}px`; }
      if (!guestsSelectIsOpen) guestsSelectListRef.current.style.height = '0px';
    }
  }, [guestsSelectIsOpen]);

  const handleToggleGuestsSelect = () => {
    setGuestsSelectIsOpen((prev) => !prev);
  };

  return (
    <div
      className={cn(
        styles.guestsSelect,
        guestsSelectIsOpen && styles.guestsSelectOpen,
        booking.guests.length === 0 && styles.noGuests,
      )}
    >
      <div
        onClick={handleToggleGuestsSelect}
        className={styles.guestsSelectHeader}
      >
        <div className={cn(styles.guestsSelectHeaderLeft, styles.modalPoint)}>
          <TeamOutlined className={cn(styles.modalPointIcon, classes)} />
          <div className={styles.guestsSelectHeaderInfo}>
            {booking.guests.length ? `${booking.guests.length} guests` : 'No guests'}
          </div>
        </div>
        <div className={styles.guestsSelectHeaderRight}>
          {booking.guests.length > 1 && (
            <a
              className={styles.userDataMailLink}
              href={`mailto: ${booking.guests[0].email}
              ?subject=${booking.title} - ${moment(`${booking.meetingDate} ${booking.startTime}`).format('D MMMM H:mm')}&cc=${[...booking.guests].map((guest) => guest.email).splice(1).join(',')}`}
            >
              <MailOutlined
                onClick={(e) => e.stopPropagation()}
                className={styles.guestsSelectHeaderMails}
              />
            </a>
          )}
          {booking.guests.length > 0 && <UpOutlined className={styles.guestsSelectHeaderArrow} />}
        </div>
      </div>
      <div ref={guestsSelectListRef} className={styles.guestsSelectList}>
        {booking.guests.map((guest) => (
          <div key={uuidv4()} className={styles.guestsSelectListItem}>
            <div key={guest.id} className={styles.userData}>
              <div className={styles.userDataLeft}>
                <div className={styles.avatar}>
                  <UserOutlined />
                </div>
                <div className={styles.fullNameAndEmail}>
                  <span>{`${guest.lastName} ${guest.firstName}`}</span>
                  <span>{guest.email}</span>
                </div>
              </div>
              <a
                className={styles.userDataMailLink}
                href={`mailto: ${guest.email}?subject=${booking.title} - ${moment(`${booking.meetingDate} ${booking.startTime}`).format('D MMMM H:mm')}`}
              >
                <MailOutlined />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuestsSelect;
