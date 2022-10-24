import React, {
  FC, ReactNode, useCallback, useRef, useEffect,
} from 'react';
import { CloseOutlined } from '@ant-design/icons';
import styles from './Modal.module.scss';
import ReactPortal from './ReactPortal';

interface ModalProps {
  open: boolean;
  locked: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({
  open,
  locked,
  onClose,
  children,
}) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const onCancel = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!locked) onClose();
    },
    [locked, onClose],
  );

  const onAnimEnd = useCallback(() => {
    const { current: el } = modalRef;
    if (!open && el) el.close();
  }, [open]);

  const onClickOutsideClose = (e: React.MouseEvent<Element, MouseEvent>) => {
    const dial = document.getElementById('dialog');
    if (e.target === dial) onClose();
  };

  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) => (e.key === 'Escape' ? onClose() : null);
    document.body.addEventListener('keydown', closeOnEscapeKey);

    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey);
    };
  }, [onClose, open]);

  return (
    <ReactPortal>
      <div
        id="dialog"
        className={styles.modal}
        onClick={(e: React.MouseEvent<Element, MouseEvent>) => onClickOutsideClose(e)}
        role="none"
      >
        <dialog
          className={styles.modal__container}
          ref={modalRef}
          onClose={onClose}
          onCancel={onCancel}
          onAnimationEnd={onAnimEnd}
          open={open}
        >
          <CloseOutlined className={styles.closeIcon} onClick={onClose} />
          {children}
        </dialog>
      </div>
    </ReactPortal>
  );
};

export default Modal;
