/* eslint-disable react-hooks/exhaustive-deps */
import CheckBox from 'components/UI/CheckBox/CheckBox';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import { useEffect } from 'react';
import { setRooms, toggleIsRecurring } from 'store/booking';
import DashboardService from 'services/DashboardService';
import styles from './Booking.module.scss';
import CommonBookingForm from './CommonBookingForm';

const Booking = () => {
  const dispatch = useAppDispatch();
  const { isReccuring } = useAppSelector((state) => state.booking);

  useEffect(() => {
    //  WIP: it`s temporary, i`m going to make the saga and rewrite it
    try {
      const response = DashboardService.fetchRooms({
        officeId: 1,
        soonestBookingsDays: 5,
      }).then((rooms) => {
        dispatch(setRooms(rooms));
      });
    } catch (error) {
      console.log(error);
    }
    return () => {
      dispatch(toggleIsRecurring(false));
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
