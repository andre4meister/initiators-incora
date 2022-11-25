import { useEffect } from 'react';
import { toggleIsRecurring } from 'store/booking';
import { getRooms } from 'store/dashboard';
import { useAppDispatch } from './reduxHooks';

const useGetRoomWithInterval = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getRooms({ officeId: 1, soonestBookingsDays: 5 }));

    const fetchIntervalRooms = setInterval(() => {
      dispatch(getRooms({ officeId: 1, soonestBookingsDays: 5 }));
    }, 10000);

    return () => {
      dispatch(toggleIsRecurring(false));
      clearInterval(fetchIntervalRooms);
    };
  }, [dispatch]);
};

export default useGetRoomWithInterval;
