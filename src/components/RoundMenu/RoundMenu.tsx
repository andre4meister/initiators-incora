import { PlusCircleOutlined } from '@ant-design/icons';
import { useAppDispatch } from 'hooks/reduxHooks';
import { FC } from 'react';
import { toggleModal, toggleModalType } from 'store/modal';
import styles from './RoundMenu.module.scss';

const RoundMenu: FC = () => {
  const dispatch = useAppDispatch();

  const onClick = () => {
    dispatch(toggleModalType('RoundMenuBooking'));
    dispatch(toggleModal(true));
  };

  return (
    <div className={styles.roundMenuBody}>
      <PlusCircleOutlined className={styles.plusIcon} onClick={onClick} title="Book room" />
    </div>
  );
};

export default RoundMenu;
