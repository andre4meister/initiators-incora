/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { FC, Suspense } from 'react';
import { Await, defer, useLoaderData } from 'react-router-dom';
import DashboardRoom from 'components/DashboardRoom/DashboardRoom';
import Loader from 'components/UI/Loader/Loader';
import { RoomType } from 'types/CommonTypes';
import Error from 'components/Error/Error';
import RoomService, { FetchRoomsType } from 'services/roomService';
import { AxiosResponse } from 'axios';
import useGetRoomWithInterval from 'hooks/useGetRoomsInterval';
import styles from './Dashboard.module.scss';

interface DeferedData {
  data: {
    data: {
      rooms: RoomType[];
    }
  }
  data: {
    data: {
      rooms: RoomType[];
    };
  };
}

const Dashboard: FC = () => {
  const { data } = useLoaderData() as DeferedData;
  useGetRoomWithInterval();

  return (
    <div id="dashboard" className={styles.container}>
      <Suspense fallback={<Loader />}>
        <Await resolve={data} errorElement={<Error />}>
          {(resolvedRooms: DeferedData) => (
            <>
              {resolvedRooms.data.data.rooms.map((room) => (
                <DashboardRoom room={room} key={room.id} />
              ))}
            </>
          )}
        </Await>
      </Suspense>
    </div>
  );
};

export const dashboardLoader = () => defer({
  data: RoomService.fetchRooms({ officeId: 1, soonestBookingsDays: 5 }),
});

export default Dashboard;
