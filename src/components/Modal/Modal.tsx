import React, {
  FC, ReactNode, useCallback, useRef, useEffect,
} from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import { toggleModal } from 'store/modal';
import Booking from 'components/Booking/Booking';
import TestPage from 'pages/TestPage/TestPage';
import styles from './Modal.module.scss';
import ReactPortal from './ReactPortal';

interface ModalProps {
  children: ReactNode;
  headerText: string;
}

const Modal: FC<ModalProps> = ({ children, headerText }) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const dispatch = useAppDispatch();
  const { modalIsOpen, modalIsLocked } = useAppSelector((state) => state.modal);

  const onClose = useCallback(() => {
    dispatch(toggleModal(false));
  }, [dispatch]);

  const onCancel = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!modalIsLocked) onClose();
    },
    [modalIsLocked, onClose],
  );

  const onAnimEnd = useCallback(() => {
    const { current: el } = modalRef;
    if (!modalIsOpen && el) el.close();
  }, [modalIsOpen]);

  const onClickOutsideClose = (e: React.MouseEvent<Element, MouseEvent>) => {
    const dial = document.getElementById('dialog');
    if (e.target === dial) onClose();
  };

  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) => (e.key === 'Escape' ? onClose() : null);
    document.body.addEventListener('keydown', closeOnEscapeKey);
    if (modalIsOpen) {
      document.body.style.overflowY = 'hidden';
    }

    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey);
      document.body.style.overflowY = 'auto';
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
        <dialog
          className={styles.modal__container}
          ref={modalRef}
          onClose={onClose}
          onCancel={onCancel}
          onAnimationEnd={onAnimEnd}
          open={modalIsOpen}
        >
          <div className={styles.modal_header}>
            <h2>{headerText}</h2>
            <CloseOutlined className={styles.closeIcon} onClick={onClose} />
          </div>
          {children}
        </dialog>
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
    case 'BookingFromCalendar':
      return (
        <Modal headerText="Creating meeting">
          <Booking />
        </Modal>
      );
    default:
      return <Modal headerText="Error">Something happen</Modal>;
  }
};

export default GlobalModal;
