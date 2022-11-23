/* eslint-disable react-hooks/exhaustive-deps */
import CheckBox from 'components/UI/CheckBox/CheckBox';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import useGetRoomWithInterval from 'hooks/useGetRoomsInterval';
import { toggleIsRecurring } from 'store/booking';
import styles from './Booking.module.scss';
import CommonBookingForm from './CommonBookingForm';

const Booking = () => {
  const dispatch = useAppDispatch();
  const { isReccuring } = useAppSelector((state) => state.booking);
  useGetRoomWithInterval();

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
