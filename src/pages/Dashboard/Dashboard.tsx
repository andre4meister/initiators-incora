/* eslint-disable react/jsx-props-no-spreading */
import { FC, useState } from 'react';
import { useAppSelector } from 'hooks/reduxHooks';
import DashboardRoom from 'components/DashboardRoom/DashboardRoom';
import cn from 'classnames';
import {
  UnorderedListOutlined,
  InsertRowBelowOutlined,
} from '@ant-design/icons';
import styles from './Dashboard.module.scss';

export type DisplayDashboardMethodType = 'tile' | 'list';

const Dashboard: FC = () => {
  const { rooms } = useAppSelector((state) => state.dashboard);
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
      {rooms.map((room) => (
        <DashboardRoom {...room} key={Math.floor(Math.random() * 10001)} />
      ))}
    </div>
  );
};

export default Dashboard;
