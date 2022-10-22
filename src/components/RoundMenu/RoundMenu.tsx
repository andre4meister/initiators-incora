import { PlusCircleOutlined } from '@ant-design/icons';
import Modal from 'components/Modal/Modal';
import { FC } from 'react';
import styles from './RoundMenu.module.scss';

export interface RoundMenuProps {
  isOpen: boolean;
  isLocked: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const RoundMenu: FC<RoundMenuProps> = ({ isOpen, isLocked, setIsOpen }) => {
  const onClose = () => {
    setIsOpen(false);
    const appNode = document.getElementById('app') as HTMLDivElement | null;
    if (appNode) {
      appNode.style.opacity = '1';
    }
  };
  return (
    <div className={styles.roundMenuBody}>
      <PlusCircleOutlined
        className={styles.plusIcon}
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <Modal open={isOpen} locked={isLocked} onClose={onClose}>
          <div>Modal Temporary</div>
        </Modal>
      )}
    </div>
  );
};

export default RoundMenu;
