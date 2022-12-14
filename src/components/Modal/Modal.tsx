/* eslint-disable react/require-default-props */
/* eslint-disable react-hooks/exhaustive-deps */
import cn from 'classnames';
import React, {
  FC, ReactNode, useCallback, useRef, useEffect, useState,
} from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import { toggleModal } from 'store/modal';
import Booking from 'components/Booking/Booking';
import BookingPointModal from 'pages/CalendarPage/BookingPointModal/BookingPointModal';
import TestPage from 'pages/TestPage/TestPage';
import { CSSTransition } from 'react-transition-group';
import { toggleActiveRoomId } from 'store/dashboard';
import styles from './Modal.module.scss';
import ReactPortal from '../ReactPortal/ReactPortal';
import 'animate.css';

interface ModalProps {
  children: ReactNode;
  headerText?: string | null;
  classes?: string
}

const Modal: FC<ModalProps> = ({ children, headerText, classes }) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const dispatch = useAppDispatch();
  const { modalIsOpen, modalIsLocked } = useAppSelector((state) => state.modal);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [enterModal, setEnterModal] = useState<boolean>(false);

  const onClose = useCallback(() => {
    setShowModal(false);
    setTimeout(() => {
      dispatch(toggleModal(false));
    }, 500);
  }, [dispatch]);

  const onCancel = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!modalIsLocked) onClose();
    },
    [modalIsLocked, onClose],
  );

  const onClickOutsideClose = (e: React.MouseEvent<Element, MouseEvent>) => {
    const dial = document.getElementById('modalBg');
    if (e.target === dial) onClose();
  };

  useEffect(() => {
    if (modalIsOpen && !enterModal) {
      setShowModal(true);
    }
  }, [modalIsOpen]);

  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) => (e.key === 'Escape' ? onClose() : null);
    document.body.addEventListener('keydown', closeOnEscapeKey);
    if (modalIsOpen) {
      dispatch(toggleActiveRoomId(null));

      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey);
      document.body.style.overflowY = 'auto';
      setTimeout(() => {
        document.body.style.overflowX = 'auto';
      }, 500);
    };
  }, [modalIsOpen, onClose]);

  if (!modalIsOpen) {
    return null;
  }

  return (
    <ReactPortal>
      <div className={styles.modal}>
        <div
          className={styles.modalBg}
          onClick={(e: React.MouseEvent<Element, MouseEvent>) => {
            onClickOutsideClose(e);
          }}
          role="none"
          id="modalBg"
        />
        <CSSTransition
          timeout={500}
          in={showModal}
          onExit={() => setEnterModal(false)}
          onEnter={() => setEnterModal(true)}
          classNames={{
            enterActive:
              'animate__animated animate__backInRight animate__faster',
            exitActive:
              'animate__animated animate__backOutRight animate__faster',
          }}
          mountOnEnter
          unmountOnExit
        >
          <dialog
            className={cn(styles.modal__container, classes)}
            ref={modalRef}
            onClose={onClose}
            onCancel={onCancel}
            open={modalIsOpen}
          >
            {headerText && (
              <div className={styles.modal_header}>
                <h2>{headerText}</h2>
              </div>
            )}
            <CloseOutlined className={styles.closeIcon} onClick={onClose} />
            {children}
          </dialog>
        </CSSTransition>
      </div>
    </ReactPortal>
  );
};

const GlobalModal = () => {
  const { modalType } = useAppSelector(
    (state) => state.modal,
  );

  switch (modalType) {
    case 'BookingFromDashboard':
      return (
        <Modal classes={styles.modalForm} headerText="Creating meeting">
          <Booking />
        </Modal>
      );
    case 'RoundMenuBooking':
      return (
        <Modal headerText="Creating meeting" classes={styles.modalForm}>
          <Booking />
        </Modal>
      );
    case 'BookingInfo':
      return (
        <Modal>
          <BookingPointModal />
        </Modal>
      );
    default:
      return <Modal headerText="Error">Something happen</Modal>;
  }
};

export default GlobalModal;
