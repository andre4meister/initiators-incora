import {
  CheckOutlined,
  CloseOutlined,
  InfoOutlined,
  WarningFilled,
} from '@ant-design/icons';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import cn from 'classnames';
import { useAppDispatch } from 'hooks/reduxHooks';
import {
  FC, useEffect, useRef, useState,
} from 'react';
import { CSSTransition } from 'react-transition-group';
import { NotificationsType } from 'store/alert';
import styles from './Alert.module.scss';
import 'animate.css';

interface NotificationProps {
  notification: NotificationsType;
  deleteNotification: ActionCreatorWithPayload<NotificationsType, string>;
}

const Notification: FC<NotificationProps> = ({
  notification,
  deleteNotification,
}) => {
  const dispatch = useAppDispatch();
  const alertRef = useRef<HTMLDivElement | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const onClickClose = () => {
    setShowAlert(false);
    setTimeout(() => {
      dispatch(deleteNotification(notification));
    }, 500);
  };

  useEffect(() => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      setTimeout(() => {
        dispatch(deleteNotification(notification));
      }, 500);
    }, 8000);
  }, [deleteNotification, dispatch, notification]);

  return (
    <CSSTransition
      in={showAlert}
      timeout={1000}
      classNames={{
        enterActive: 'animate__animated animate__backInRight',
        exitActive: 'animate__animated animate__backOutRight',
      }}
      unmountOnExit
    >
      <div
        className={cn({
          [styles.notification]: true,
          [styles.success]: notification.type === 'success',
          [styles.info]: notification.type === 'info',
          [styles.error]: notification.type === 'error',
        })}
        ref={alertRef}
      >
        <div
          className={cn({
            [styles.messageIcon]: true,
            [styles.successIcon]: notification.type === 'success',
            [styles.infoIcon]: notification.type === 'info',
            [styles.errorIcon]: notification.type === 'error',
          })}
        >
          {notification.type === 'success' && (
            <CheckOutlined className={styles.icon} />
          )}
          {notification.type === 'info' && (
            <InfoOutlined className={styles.icon} />
          )}
          {notification.type === 'error' && (
            <WarningFilled className={styles.icon} />
          )}
        </div>
        <span className={styles.messageText}>{notification.message}</span>
        <CloseOutlined
          className={cn(styles.icon, styles.closeIcon)}
          title="Close this"
          onClick={onClickClose}
        />
      </div>
    </CSSTransition>
  );
};

export default Notification;
