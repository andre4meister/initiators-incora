import { FC, useState } from 'react';
import { RoomType } from 'types/CommonTypes';
import cn from 'classnames';
import {
  FundProjectionScreenOutlined,
  VideoCameraOutlined,
  CameraOutlined,
  UserOutlined,
  GroupOutlined,
} from '@ant-design/icons';
import styles from '../../pages/Dashboard/Dashboard.module.scss';

interface DashboardRoomProps {
  room: RoomType
}

const DashboardRoom: FC<DashboardRoomProps> = ({ room }) => {
  const [isFullInfoOpen, setisFullInfoOpen] = useState<boolean>(false);

  return (
    <div
      id="room-item"
      role="none"
      className={cn({
        [styles.room]: true,
        [styles.activeRoom]: isFullInfoOpen,
      })}
      onClick={() => setisFullInfoOpen(!isFullInfoOpen)}
    >
      <div className={styles.nameIdContainer}>
        <div>
          <div>{room.id}</div>
        </div>
        <h2>{room.name}</h2>
      </div>
      <div
        className={isFullInfoOpen ? styles.desciption : styles.hiddenDesciption}
      >
        {room.desciption}
      </div>
      <div className={styles.roomFeatures}>
        <div>
          <GroupOutlined className={styles.featureIcon} />
          {' '}
          {room.floor}
        </div>
        <div>
          <UserOutlined className={styles.featureIcon} />
          <span>
            {' '}
            {room.minPeople}
            -
            {room.maxPeople}
          </span>
        </div>
        <div className={styles.features}>
          <div>
            {room.camera && <CameraOutlined className={styles.featureIcon} />}
          </div>
          <div>
            {room.tv && (
              <FundProjectionScreenOutlined className={styles.featureIcon} />
            )}
          </div>
          <div>
            {room.projector && (
              <VideoCameraOutlined className={styles.featureIcon} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardRoom;
