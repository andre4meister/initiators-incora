import { FC } from 'react';
import { DevicesType } from 'types/CommonTypes';
import {
  CameraFilled,
  CameraOutlined,
  FundProjectionScreenOutlined,
  SoundFilled,
  SoundOutlined,
} from '@ant-design/icons';
import WaterCoolerOutlined from 'assets/Icons/WaterCoolerOutlined';
import BigScreenOutlined from 'assets/Icons/BigScreenOutlined';
import AirConditionerOutlined from 'assets/Icons/AirConditioner';
import PlaystationOutlined from 'assets/Icons/PlaystationOutlined';
import TennisTableOutlined from 'assets/Icons/TennisTableOutlined';
import WhiteboardOutlined from 'assets/Icons/Whiteboard';
import styles from './DashboardRoom.module.scss';

interface RoomFeaturesProps {
  devices: DevicesType[];
}

const RoomFeatures: FC<RoomFeaturesProps> = ({ devices }) => (
  <div className={styles.features}>
    <div>
      {devices.findIndex((d) => d === 'Camera') !== -1 && (
        <CameraFilled className={styles.featureIcon} title="Camera" />
      )}
    </div>
    <div>
      {devices.findIndex((d) => d === 'White board') !== -1 && (
        <WhiteboardOutlined title="White board" />
      )}
    </div>
    <div>
      {devices.findIndex((d) => d === 'Water cooler') !== -1 && (
        <WaterCoolerOutlined title="Water Cooler" />
      )}
    </div>
    <div>
      {devices.findIndex((d) => d === 'Sound system') !== -1 && (
        <SoundFilled className={styles.featureIcon} title="Sound system" />
      )}
    </div>
    <div>
      {devices.findIndex((d) => d === 'Big screen') !== -1 && (
        <BigScreenOutlined title="Big screen" />
      )}
    </div>
    <div>
      {devices.findIndex((d) => d === 'Air conditioner') !== -1 && (
        <AirConditionerOutlined title="Air conditioner" />
      )}
    </div>
    <div>
      {devices.findIndex((d) => d === 'PlayStation') !== -1 && (
        <PlaystationOutlined title="PlayStation" />
      )}
    </div>
    <div>
      {devices.findIndex((d) => d === 'Tennis table') !== -1 && (
        <TennisTableOutlined title="Tennis table" />
      )}
    </div>
  </div>
);

export default RoomFeatures;
