import { FC, Suspense } from 'react';
import { Await, defer, useLoaderData } from 'react-router-dom';
import DashboardRoom from 'components/DashboardRoom/DashboardRoom';
import Loader from 'components/UI/Loader/Loader';
import getRequest from 'utils/getRequest';
import { RoomType } from 'types/CommonTypes';
import { AxiosPromise } from 'axios';
import styles from './Dashboard.module.scss';

interface DeferedData {
  rooms: RoomType[];
}

const Dashboard: FC = () => {
  const { rooms } = useLoaderData() as DeferedData;

  return (
    <div
      id="dashboard"
      className={styles.container}
    >
      <Suspense fallback={<Loader />}>
        <Await resolve={rooms}>
          {(resovedRooms: RoomType[]) => (
            <>
              {resovedRooms.map((room) => (
                <DashboardRoom room={room} key={room.id} />
              ))}
            </>
          )}
        </Await>
      </Suspense>
    </div>
  );
};

const getRooms = async () => {
  const response = await getRequest<AxiosPromise<{ rooms: RoomType[] }>>(
    'https://initiators-ua.herokuapp.com/rooms?officeId=1&soonestBookingsDays=5',
  );
  const body = (await response.data).data.rooms;
  return body;
};

export const dashboardLoader = () => defer({
  rooms: getRooms(),
});

export default Dashboard;
