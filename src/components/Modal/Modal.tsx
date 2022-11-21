/* eslint-disable react-hooks/exhaustive-deps */
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
  headerText: string;
}

const Modal: FC<ModalProps> = ({ children, headerText }) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const dispatch = useAppDispatch();
  const { modalIsOpen, modalIsLocked } = useAppSelector((state) => state.modal);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [enterModal, setEnterModal] = useState<boolean>(false);

  const onClose = useCallback(() => {
    setShowModal(false);
    setTimeout(() => {
      dispatch(toggleModal(false));
    }, 800);
  }, [dispatch]);

  const onCancel = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!modalIsLocked) onClose();
    },
    [modalIsLocked, onClose],
  );

  const onClickOutsideClose = (e: React.MouseEvent<Element, MouseEvent>) => {
    const dial = document.getElementById('dialog');
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
      <div
        id="dialog"
        className={styles.modal}
        onClick={(e: React.MouseEvent<Element, MouseEvent>) => {
          onClickOutsideClose(e);
        }}
        role="none"
      >
        <CSSTransition
          timeout={800}
          in={showModal}
          onExit={() => setEnterModal(false)}
          onEnter={() => setEnterModal(true)}
          classNames={{
            enterActive:
              'animate__animated animate__backInRight animate__fast',
            exitActive:
              'animate__animated animate__backOutRight animate__fast',
          }}
          mountOnEnter
          unmountOnExit
        >
          <dialog
            className={styles.modal__container}
            ref={modalRef}
            onClose={onClose}
            onCancel={onCancel}
            open={modalIsOpen}
          >
            <div className={styles.modal_header}>
              <h2>{headerText}</h2>
              <CloseOutlined className={styles.closeIcon} onClick={onClose} />
            </div>
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
        <Modal headerText="Creating meeting">
          <Booking />
        </Modal>
      );
    case 'RoundMenuBooking':
      return (
        <Modal headerText="Testing">
          <TestPage />
        </Modal>
      );
    case 'BookingInfo':
      return (
        <Modal headerText="Booking info">
          <BookingPointModal />
        </Modal>
      );
    default:
      return <Modal headerText="Error">Something happen</Modal>;
  }
};

export default GlobalModal;
