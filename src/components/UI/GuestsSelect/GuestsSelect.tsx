/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { v4 as uuidv4 } from 'uuid';
import cn from 'classnames';
import {
  TeamOutlined, UpOutlined, UserOutlined, MailOutlined,
} from '@ant-design/icons';
import {
  FC, useEffect, useRef, useState,
} from 'react';
import { User } from 'types/dataTypes';

import styles from './GuestsSelect.module.scss';

interface GuestsSelectProps {
  guests: User[]
}

const GuestsSelect: FC<GuestsSelectProps> = ({ guests }) => {
  const [guestsSelectIsOpen, setGuestsSelectIsOpen] = useState<boolean>(false);
  const guestsSelectListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (guestsSelectListRef.current !== null) {
      const height = guestsSelectListRef.current.scrollHeight;

      if (guestsSelectIsOpen) guestsSelectListRef.current.style.height = `${height}px`;
      if (!guestsSelectIsOpen) guestsSelectListRef.current.style.height = '0px';
    }
  }, [guestsSelectIsOpen]);

  const handleToggleGuestsSelect = () => {
    setGuestsSelectIsOpen((prev) => !prev);
  };

  return (
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
            {`${guests.length} guests`}
          </div>
        </div>
        <UpOutlined className={styles.guestsSelectHeaderArrow} />
      </div>
      <div ref={guestsSelectListRef} className={styles.guestsSelectList}>
        {guests.map((guest) => (
          <div key={uuidv4()} className={styles.guestsSelectListItem}>
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
  );
};

export default GuestsSelect;
