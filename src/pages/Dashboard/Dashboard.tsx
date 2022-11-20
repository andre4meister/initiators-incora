/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { FC, Suspense } from 'react';
import { Await, defer, useLoaderData } from 'react-router-dom';
import DashboardRoom from 'components/DashboardRoom/DashboardRoom';
import Loader from 'components/UI/Loader/Loader';
import { RoomType } from 'types/CommonTypes';
import DashboardService, { FetchRoomsType } from 'services/RoomService';
import { AxiosResponse } from 'axios';
import styles from './Dashboard.module.scss';

interface DeferedData {
  rooms: RoomType[];
}

const Dashboard: FC = () => {
  const { rooms } = useLoaderData() as DeferedData;

  return (
    <div id="dashboard" className={styles.container}>
      <Suspense fallback={<Loader />}>
        <Await resolve={rooms}>
          {(resolvedRooms: AxiosResponse<AxiosResponse<FetchRoomsType>>) => (
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
  rooms: DashboardService.fetchRooms({ officeId: 1, soonestBookingsDays: 5 }),
});

export default Dashboard;
