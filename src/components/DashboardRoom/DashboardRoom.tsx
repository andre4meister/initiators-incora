import { FC, useState } from 'react';
import { RoomType } from 'types/CommonTypes';
import cn from 'classnames';
import {
  FundProjectionScreenOutlined,
  VideoCameraOutlined,
  CameraOutlined,
  UserOutlined,
  NumberOutlined,
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
      <div>
        <h1 className={styles.name}>
          <NumberOutlined className={styles.featureIcon} />
          {id}
        </h1>
        <h2>{name}</h2>
        {isFullInfoOpen && <div>{desciption}</div>}
      </div>
      {isFullInfoOpen && (
        <div>
          <div>
            Floor:
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
        </div>
      )}
      <div className={styles.features}>
        <div>{camera && <CameraOutlined className={styles.featureIcon} />}</div>
        <div>
          {tv && (
            <FundProjectionScreenOutlined className={styles.featureIcon} />
          )}
        </div>
        <div>
          {projector && <VideoCameraOutlined className={styles.featureIcon} />}
        </div>
      </div>
    </div>
  );
};

export default DashboardRoom;
