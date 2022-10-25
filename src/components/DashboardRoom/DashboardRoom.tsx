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

const DashboardRoom: FC<RoomType> = ({
  camera,
  desciption,
  floor,
  id,
  maxPeople,
  minPeople,
  name,
  officeId,
  projector,
  tv,
}) => {
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
          <div>{id}</div>
        </div>
        <h2>{name}</h2>
      </div>
      <div
        className={isFullInfoOpen ? styles.desciption : styles.hiddenDesciption}
      >
        {desciption}
      </div>
      <div className={styles.roomFeatures}>
        <div>
          <GroupOutlined className={styles.featureIcon} />
          {' '}
          {floor}
        </div>
        <div>
          <UserOutlined className={styles.featureIcon} />
          <span>
            {' '}
            {minPeople}
            -
            {maxPeople}
          </span>
        </div>
        <div className={styles.features}>
          <div>
            {camera && <CameraOutlined className={styles.featureIcon} />}
          </div>
          <div>
            {tv && (
              <FundProjectionScreenOutlined className={styles.featureIcon} />
            )}
          </div>
          <div>
            {projector && (
              <VideoCameraOutlined className={styles.featureIcon} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardRoom;
