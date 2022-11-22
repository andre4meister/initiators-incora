/* eslint-disable consistent-return */
import React, {
  FC, useEffect, useMemo, useRef,
} from 'react';
import { RoomType } from 'types/CommonTypes';
import { v4 as uuidv4 } from 'uuid';
import { toggleModalType } from 'store/modal';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import { toggleChosenRoom } from 'store/booking';
import cn from 'classnames';
import Button from 'components/UI/Button/Button';
import { getIsBusyNow } from 'utils/bookingUtils';
import AvailableRoomOutlined from 'assets/Icons/AvailableRoom';
import BusyRoomOutlined from 'assets/Icons/BusyRoomOutlined';
import { toggleActiveRoomId } from 'store/dashboard';
import { CloseOutlined } from '@ant-design/icons';
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

  const roomRef = useRef<HTMLDivElement | null>(null);
  const isBusyNow: boolean = getIsBusyNow(room.soonestBookings);

  const isActive = useMemo(
    () => room.id === activeRoomId && !modalIsOpen,
    [activeRoomId, modalIsOpen, room.id],
  );
  const isBlured = useMemo(
    () => room.id !== activeRoomId && activeRoomId !== null,
    [activeRoomId, room.id],
  );
  const handleOnReserveRoom = () => {
    dispatch(toggleModalType('BookingFromDashboard'));
  };

  const handleOnCloseClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (isActive) {
      dispatch(toggleActiveRoomId(null));
    }
  };

  const handleOnOpenClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    dispatch(toggleChosenRoom(room.id));
    dispatch(toggleActiveRoomId(room.id));
  };

  useEffect(() => {
    const scrollY = roomRef.current;
    if (isActive === true) {
      document.body.style.overflowY = 'hidden';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return () => {
        window.scrollTo({ top: scrollY?.offsetTop, behavior: 'smooth' });
        document.body.style.overflowY = 'auto';
      };
    }
  }, [isActive]);

  return (
    <div
      className={cn(
        styles.roomContainer,
        isActive && styles.roomActiveContainer,
      )}
      role="none"
      onClick={handleOnCloseClick}
      id="room-container"
    >
      <div
        id={`room-item${room.id}`}
        ref={roomRef}
        role="none"
        className={cn({
          [styles.room]: true,
          [styles.activeRoom]: isActive && !modalIsOpen,
          [styles.bluredRoom]: isBlured,
        })}
        onClick={handleOnOpenClick}
      >
        <div className={styles.defaultRoomView}>
          <div className={styles.imageContainer}>
            {/* <img
            src="https://assets.citizenm.com/images/Hero%20Image-CitizenM_CRP-159_high-3_10f065b4b04602805e495b26-1.jpg"
            alt={`Room${room.id}`}
          /> */}
          </div>
          <div className={styles.mainInfoContainer}>
            <div className={styles.nameContainer}>
              <h2>{room.name}</h2>
            </div>
            <div className={styles.roomFeatures}>
              <div>{`Floor: ${room.floor}`}</div>
              <div>{`Capacity: ${room.minPeople}-${room.maxPeople}`}</div>
              <RoomFeatures devices={room.devices} />
              {isBusyNow ? (
                <BusyRoomOutlined title="Room is busy" />
              ) : (
                <AvailableRoomOutlined title="Room is free" />
              )}
              {isActive && (
              <div className={styles.closeContainer}>
                <CloseOutlined
                  className={styles.closeIcon}
                  title="Close room"
                  onClick={handleOnCloseClick}
                />
              </div>
              )}
            </div>
          </div>
        </div>
        <div
          className={cn(
            styles.fullRoomInfo,
            isActive && !modalIsOpen && styles.activeFullInfo,
          )}
        >
          <div className={styles.soonestBookings}>
            {room.soonestBookings.map((booking) => (
              <FullRoomInfo
                booking={booking}
                key={uuidv4()}
              />
            ))}
          </div>
        </div>
        <div className={styles.buttonContainer} id="button-container">
          <Button
            classes={styles.reserveRoomButton}
            handleOnClick={handleOnReserveRoom}
          >
            Reserve room
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardRoom;
