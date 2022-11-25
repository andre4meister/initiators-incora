/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable jsx-a11y/img-redundant-alt */
import cn from 'classnames';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { FC, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  SettingOutlined, LogoutOutlined, BulbOutlined, ClockCircleOutlined,
} from '@ant-design/icons';
import AuthService from 'services/authService';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import { Booking, FetchingBooking } from 'types/dataTypes';
import getRequest from 'utils/getRequest';
import { toggleModalType } from 'store/modal';
import { setSelectedBooking } from 'store/selectedBooking';
import { useTheme } from '../../hoc/ThemeProvider';
import styles from './Sidebar.module.scss';

moment.updateLocale('en', {
  week: { dow: 1 },
  weekdays: [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
  ],
});
interface NearestBookingProps {
  booking: Booking
}

const NearestBooking: FC<NearestBookingProps> = ({ booking }) => {
  const dispatch = useAppDispatch();
  const date = moment(`${booking.meetingDate} ${booking.startTime}`);
  const [subtract, setSubtract] = useState<moment.Moment>(date.clone().subtract(moment.duration(moment().format('DDD HH:mm'))));

  useEffect(() => {
    let minute = moment().minute();

    const interval = setInterval(() => {
      if (minute !== moment().minute()) {
        minute = moment().minute();

        setSubtract(date.clone().subtract(moment.duration(moment().format('DDD HH:mm'))));
      }
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpenBookingPoint = (openedBooking: Booking) => {
    dispatch(setSelectedBooking(openedBooking));
    dispatch(toggleModalType('BookingInfo'));
  };

  return (
    <div
      className={styles.nearestsBookingsListItem}
      onClick={() => handleOpenBookingPoint(booking)}
    >
      <ClockCircleOutlined className={cn(
        styles.itemIcon,
        subtract.hour() <= 1 && styles.itemIconVerySoon,
        (subtract.hour() > 1 && subtract.hour() <= 4) && styles.itemIconSoon,
        subtract.hour() > 4 && styles.itemIconNotSoon,
      )}
      />
      <div className={styles.itemData}>
        <div className={styles.title}>
          {booking.title}
        </div>
        <div>
          {moment().isSame(date, 'day') && 'today'}
          {moment().clone().add(1, 'day').isSame(date, 'day') && 'tomorrow'}
          {(moment().isSame(date, 'week') && !moment().isSame(date, 'day') && !moment().clone().add(1, 'day').isSame(date, 'day')) && `this week - ${moment.weekdays()[date.weekday()]}`}
          {moment().clone().add(1, 'week').isSame(date, 'week') && `next week - ${moment.weekdays()[date.weekday()]}`}
          {date.isAfter(moment().clone().add(1, 'week')) && date.format('D MMMM')}
        </div>
        <div className={styles.allDate}>
          <div className={styles.date}>
            {date.format('H:mm')}
          </div>
          <div className={styles.dateIn}>
            {`in ${date.diff(moment(), 'day') > 0 ? `${date.diff(moment(), 'day')} days` : ''} ${subtract.format('HH:mm')}`}
          </div>
        </div>
      </div>
    </div>
  );
};

const Sidebar: FC = () => {
  const [nearestsBookings, setNearestBookings] = useState<Booking[]>([]);
  const themeContext = useTheme();
  const [toggle, setToggle] = useState<boolean>(themeContext.theme !== 'light');
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.userData);

  const handleChangeTheme = () => {
    setToggle((prev) => !prev);
    if (toggle) {
      themeContext.handleChangeTheme('light');
    } else {
      themeContext.handleChangeTheme('dark');
    }
  };

  const getNearestBookings = async () => {
    const { data } = await getRequest<FetchingBooking>(
      `${process.env.REACT_APP_API_GET_BOOKINGS_IN_RANGE}?officeId=1&startDate=${moment().format('YYYY-MM-DD')}&endDate=${moment().add(1, 'year').format('YYYY-MM-DD')}`,
    );

    const nearestsFiveBookings: Booking[] = [];

    data.data.bookings.forEach((booking) => {
      if (nearestsFiveBookings.length >= 5) return;
      if (moment().isBefore(moment(`${booking.meetingDate} ${booking.startTime}`))) {
        nearestsFiveBookings.push(booking);
      }
    });

    setNearestBookings(nearestsFiveBookings);
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getNearestBookings();
  }, []);

  const handleLogout = () => {
    navigate('login', { replace: true });
    AuthService.logout();
  };

  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <div className={styles.avatar}><img alt="user photo" src="https://vjoy.cc/wp-content/uploads/2020/10/0eb3a788b4c27f0fc56931421e810eea.jpg" /></div>
        <div className={styles.userContrlos}>
          <NavLink className={({ isActive }) => cn(styles.settings, isActive && styles.settings_active)} to="settings"><SettingOutlined /></NavLink>
          <LogoutOutlined className={styles.logout} onClick={handleLogout} />
          <BulbOutlined className={styles.theme} onClick={handleChangeTheme} />
        </div>
        <div className={styles.fullName}>
          <div className={styles.firstName}>{user && user.firstName}</div>
          <div className={styles.lastName}>{user && user.lastName}</div>
        </div>
      </div>

      {nearestsBookings.length > 0 && (
        <div className={styles.nearestsBookings}>
          <div className={styles.nearestsBookingsList}>
            {nearestsBookings.map((booking) => (
              <NearestBooking key={uuidv4()} booking={booking} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
