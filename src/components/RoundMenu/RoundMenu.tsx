import { PlusCircleOutlined } from '@ant-design/icons';
import Modal from 'components/Modal/Modal';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import { FC } from 'react';
import { toggleModal } from 'store/app';
import styles from './RoundMenu.module.scss';

const RoundMenu: FC = () => {
  const { modalIsOpen, modalIsLocked } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  const onClose = () => {
    dispatch(toggleModal(false));
    const appNode = document.getElementById('app') as HTMLDivElement | null;
    if (appNode) {
      appNode.style.opacity = '1';
    }
  };
  return (
    <div className={styles.roundMenuBody}>
      <PlusCircleOutlined
        className={styles.plusIcon}
        onClick={() => dispatch(toggleModal(true))}
      />
      {modalIsOpen && (
        <Modal open={modalIsOpen} locked={modalIsLocked} onClose={onClose}>
          <div>Modal Temporary</div>
        </Modal>
      )}
    </div>
  );
};

export default RoundMenu;
