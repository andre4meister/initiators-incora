/* eslint-disable react-hooks/exhaustive-deps */
import CheckBox from 'components/UI/CheckBox/CheckBox';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import { useEffect } from 'react';
import { toggleIsRecurring } from 'store/booking';
import { getRooms } from 'store/dashboard';
import styles from './Booking.module.scss';
import CommonBookingForm from './CommonBookingForm';

const Booking = () => {
  const dispatch = useAppDispatch();
  const { isReccuring, rooms } = useAppSelector((state) => state.booking);

  useEffect(() => {
    dispatch(getRooms({ officeId: 1, soonestBookingsDays: 5 }));

    const fetchIntervalRooms = setInterval(() => {
      dispatch(getRooms({ officeId: 1, soonestBookingsDays: 5 }));
    }, 10000);

    return () => {
      dispatch(toggleIsRecurring(false));
      clearInterval(fetchIntervalRooms);
    };
  }, []);

  return (
    <div className={styles.formContainer}>
      <div className={styles.checkbox}>
        <CheckBox
          handleOnChange={() => {
            dispatch(toggleIsRecurring(!isReccuring));
          }}
          isChecked={!isReccuring}
        />
        <p>One time booking</p>
      </div>
      <CommonBookingForm />
    </div>
  );
};
export default Booking;
