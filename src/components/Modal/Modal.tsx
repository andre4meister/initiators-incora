import React, {
  FC, ReactNode, useCallback, useRef, useEffect,
} from 'react';

import styles from './Modal.module.scss';
import ReactPortal from './ReactPortal';

interface ModalProps {
  open: boolean;
  locked: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal: FC<ModalProps> = ({
  open,
  locked,
  onClose,
  children,
  ...props
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

  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) => (e.key === 'Escape' ? onClose() : null);
    const appNode = document.getElementById('app') as HTMLDivElement | null;

    appNode?.addEventListener('click', () => onClose());
    document.body.addEventListener('keydown', closeOnEscapeKey);
    if (appNode) {
      appNode.style.opacity = '0.4';
    }
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey);
      appNode?.removeEventListener('click', () => onClose());
      if (appNode) {
        appNode.style.opacity = '1';
      }
    };
  }, [onClose, open]);

  return (
    <ReactPortal>
      <dialog
        ref={modalRef}
        className={styles.modal}
        onClose={onClose}
        onCancel={onCancel}
        onAnimationEnd={onAnimEnd}
        open={open}
      >
        <div className={styles.modal__container}>{children}</div>
      </dialog>
    </ReactPortal>
  );
};

export default Modal;
