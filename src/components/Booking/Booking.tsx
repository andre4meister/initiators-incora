import CheckBox from 'components/UI/CheckBox/CheckBox';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import { useEffect } from 'react';
import getRequest from 'utils/getRequest';
import { RoomType } from 'types/CommonTypes';
import { setRooms, toggleIsRecurring } from 'store/booking';
import { AxiosPromise } from 'axios';
import styles from './Booking.module.scss';
import CommonBookingForm from './CommonBookingForm';

const Booking = () => {
  const dispatch = useAppDispatch();

  const { isReccuring } = useAppSelector((state) => state.booking);
  useEffect(() => {
    const fetchedRooms = async () => {
      const response = await getRequest<AxiosPromise<{ rooms: RoomType[] }>>(
        'https://initiators-ua.herokuapp.com/rooms?officeId=1&soonestBookingsDays=3',
      );
      const body: RoomType[] = (await response.data).data.rooms;
      dispatch(setRooms(body));
      return body;
    };
    fetchedRooms().catch((er) => console.log(er));
  }, [dispatch]);

  return (
    <div className={styles.formContainer}>
      <div className={styles.checkbox}>
        <CheckBox
          handleOnChange={() => { dispatch(toggleIsRecurring(!isReccuring)); }}
          isChecked={!isReccuring}
        />
        <p>One time booking</p>
      </div>
      <CommonBookingForm />
    </div>
  );
};
export default Booking;
