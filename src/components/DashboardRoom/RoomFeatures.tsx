import { FC } from 'react';
import { DevicesType } from 'types/CommonTypes';
import getIcon from 'utils/getIcon';
import styles from './DashboardRoom.module.scss';

interface RoomFeaturesProps {
  devices: DevicesType[];
}

const RoomFeatures: FC<RoomFeaturesProps> = ({ devices }) => (
  <div className={styles.features}>
    {devices.map((feature) => (<div>{getIcon(feature)}</div>))}
  </div>
);

export default RoomFeatures;
