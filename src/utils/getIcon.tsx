import { DevicesType } from 'types/CommonTypes';
import { CameraFilled, SoundFilled } from '@ant-design/icons';
import WaterCoolerOutlined from 'assets/Icons/WaterCoolerOutlined';
import BigScreenOutlined from 'assets/Icons/BigScreenOutlined';
import AirConditionerOutlined from 'assets/Icons/AirConditioner';
import PlaystationOutlined from 'assets/Icons/PlaystationOutlined';
import TennisTableOutlined from 'assets/Icons/TennisTableOutlined';
import WhiteboardOutlined from 'assets/Icons/Whiteboard';
import styles from '../components/DashboardRoom/DashboardRoom.module.scss';
import { Devices } from './commonConstants';

const getIcon = (iconName: DevicesType) => {
  switch (iconName) {
    case Devices.Camera:
      return <CameraFilled className={styles.featureIcon} title={Devices.Camera} />;
    case Devices.WhiteBoard:
      return <WhiteboardOutlined title={Devices.WhiteBoard} />;
    case Devices.WaterCooler:
      return <WaterCoolerOutlined title={Devices.WaterCooler} />;
    case Devices.SoundSystem:
      return <SoundFilled className={styles.featureIcon} title={Devices.SoundSystem} />;
    case Devices.BigScreen:
      return <BigScreenOutlined title={Devices.BigScreen} />;
    case Devices.AirConditioner:
      return <AirConditionerOutlined title={Devices.AirConditioner} />;
    case Devices.PlayStation:
      return <PlaystationOutlined title={Devices.PlayStation} />;
    case Devices.TennisTable:
      return <TennisTableOutlined title={Devices.TennisTable} />;
    default:
      return null;
  }
};

export default getIcon;
