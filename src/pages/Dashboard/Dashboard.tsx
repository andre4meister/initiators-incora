import {
  FC, Suspense, useState,
} from 'react';
import {
  Await, defer, useLoaderData,
} from 'react-router-dom';
import DashboardRoom from 'components/DashboardRoom/DashboardRoom';
import cn from 'classnames';
import {
  UnorderedListOutlined,
  InsertRowBelowOutlined,
} from '@ant-design/icons';
import Loader from 'components/UI/Loader/Loader';
import getRequest from 'utils/getRequest';
import { RoomType } from 'types/CommonTypes';
import styles from './Dashboard.module.scss';

export type DisplayDashboardMethodType = 'tile' | 'list';

interface DeferedData {
  rooms: RoomType[]
}

const Dashboard: FC = () => {
  const [displayMethod, setDisplayMethod] = useState<DisplayDashboardMethodType>('list');
  const { rooms } = useLoaderData() as DeferedData;

  return (
    <div
      className={cn({
        [styles.container]: true,
        [styles.containerList]: displayMethod === 'list',
        [styles.containerTile]: displayMethod === 'tile',
      })}
    >
      <div className={styles.changeDisplayMethodButton}>
        <UnorderedListOutlined
          className={cn({
            [styles.changeButton]: true,
            [styles.activeButton]: displayMethod === 'list',
          })}
          onClick={() => setDisplayMethod('list')}
        />
        <InsertRowBelowOutlined
          className={cn({
            [styles.changeButton]: true,
            [styles.activeButton]: displayMethod === 'tile',
          })}
          onClick={() => setDisplayMethod('tile')}
        />
      </div>
      <Suspense fallback={<Loader />}>
        <Await resolve={rooms}>
          {(resovedRooms: RoomType[]) => (
            <>
              {
                resovedRooms.map((room) => (
                  <DashboardRoom room={room} key={Math.floor(Math.random() * 10001)} />
                ))
              }
            </>
          )}
        </Await>
      </Suspense>
    </div>
  );
};

const getRooms = async () => {
  const response = await getRequest<RoomType[]>('http://localhost:5000/rooms');
  const body = response.data;

  return body;
};

export const dashboardLoader = () => defer({
  rooms: getRooms(),
});

export default Dashboard;
