/* eslint-disable react/jsx-props-no-spreading */
import { FC, useState } from 'react';
import DashboardRoom from 'components/DashboardRoom/DashboardRoom';
import cn from 'classnames';
import { RoomType } from 'types/CommonTypes';
import {
  UnorderedListOutlined,
  InsertRowBelowOutlined,
} from '@ant-design/icons';
import styles from './Dashboard.module.scss';

const mockRooms: RoomType[] = [
  {
    id: 1,
    officeId: 1,
    desciption: 'For camp',
    floor: 1,
    maxPeople: 20,
    minPeople: 8,
    name: 'Headquartes',
    camera: true,
    projector: false,
    tv: true,
  },
  {
    id: 2,
    officeId: 1,
    desciption: 'For all',
    floor: 2,
    maxPeople: 30,
    minPeople: 12,
    name: 'BigOne',
    camera: false,
    projector: false,
    tv: false,
  },
  {
    id: 19,
    officeId: 1,
    desciption: 'Boss is sitting there',
    floor: 1,
    maxPeople: 10,
    minPeople: 2,
    name: 'BossPlace',
    camera: true,
    projector: false,
    tv: true,
  },
  {
    id: 29,
    officeId: 1,
    desciption: 'DreamTeam',
    floor: 2,
    maxPeople: 15,
    minPeople: 5,
    name: 'Heaven',
    camera: true,
    projector: true,
    tv: true,
  },
];

export type DisplayDashboardMethodType = 'tile' | 'list';

const Dashboard: FC = () => {
  const [displayMethod, setDisplayMethod] = useState<DisplayDashboardMethodType>('list');
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
      {mockRooms.map((room) => (
        <DashboardRoom {...room} key={Math.floor(Math.random() * 10001)} />
      ))}
    </div>
  );
};

export default Dashboard;
