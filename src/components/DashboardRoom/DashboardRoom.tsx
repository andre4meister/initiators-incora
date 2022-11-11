import { FC, useMemo } from 'react';
import { RoomType } from 'types/CommonTypes';
import {
  UserOutlined,
  GroupOutlined,
} from '@ant-design/icons';
import { toggleModal, toggleModalType } from 'store/modal';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import { toggleChosenRoom } from 'store/booking';
import cn from 'classnames';
import Button from 'components/UI/Button/Button';
import { getIsBusyNow } from 'utils/bookingUtils';
import AvailableRoomOutlined from 'assets/Icons/AvailableRoom';
import BusyRoomOutlined from 'assets/Icons/BusyRoomOutlined';
import { toggleActiveRoomId } from 'store/dashboard';
import styles from './DashboardRoom.module.scss';
import FullRoomInfo from './FullRoomInfo';
import RoomFeatures from './RoomFeatures';

interface DashboardRoomProps {
  room: RoomType;
}

const DashboardRoom: FC<DashboardRoomProps> = ({ room }) => {
  const dispatch = useAppDispatch();
  const { modalIsOpen } = useAppSelector((state) => state.modal);
  const { activeRoomId } = useAppSelector((state) => state.dashboard);

  const isBusyNow: boolean = getIsBusyNow(room.soonestBookings);

  const handleOnReserveRoom = () => {
    dispatch(toggleModal(!modalIsOpen));
    dispatch(toggleModalType('BookingFromDashboard'));
  };

  const handleOnClick = () => {
    dispatch(toggleChosenRoom(room.id));
    if (activeRoomId === null) {
      dispatch(toggleActiveRoomId(room.id));
    } else {
      dispatch(toggleActiveRoomId(null));
    }
  };

  const isActive = useMemo(
    () => room.id === activeRoomId,
    [activeRoomId, room.id],
  );
  const isBlured = useMemo(
    () => room.id !== activeRoomId && activeRoomId !== null,
    [activeRoomId, room.id],
  );

  return (
    <div
      className={styles.roomContainer}
      role="none"
      onClick={() => {
        if (room.id === activeRoomId) dispatch(toggleActiveRoomId(null));
      }}
    >
      <div
        id={`room-item${room.id}`}
        role="none"
        className={cn({
          [styles.room]: true,
          [styles.activeRoom]: isActive,
          [styles.bluredRoom]: isBlured,
        })}
        onClick={handleOnClick}
      >
        <div className={styles.nameIdContainer}>
          <div>
            <div>{room.id}</div>
          </div>
          <h2>{room.name}</h2>
        </div>
        <div className={styles.roomFeatures}>
          <div>
            <GroupOutlined className={styles.featureIcon} title="Floor" />
            {' '}
            {room.floor}
          </div>
          <div>
            <UserOutlined className={styles.featureIcon} title="Capacity" />
            <span>{` ${room.minPeople}-${room.maxPeople}`}</span>
          </div>
          <RoomFeatures devices={room.devices} />
          {isBusyNow ? (
            <BusyRoomOutlined title="Room is free" />
          ) : (
            <AvailableRoomOutlined title="Room is free" />
          )}
          <div
            className={cn(
              styles.fullRoomInfo,
              isActive && !modalIsOpen && styles.activeFullInfo,
            )}
          >
            <div className={styles.soonestBookings}>
              {room.soonestBookings.map((b) => (
                <FullRoomInfo
                  isActive={isActive}
                  booking={b}
                  key={b.id * Math.floor(Math.random() * 10000)}
                />
              ))}
            </div>
            <Button
              classes={styles.reserveRoomButton}
              handleOnClick={handleOnReserveRoom}
            >
              Reserve room
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardRoom;
