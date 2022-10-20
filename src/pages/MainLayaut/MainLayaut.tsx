import { FC, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from 'components/Sidebar/Sidebar';
import NavMenu from 'components/NavMenu/NavMenu';
import RoundMenu from 'components/RoundMenu/RoundMenu';
import styles from './MainLayaut.module.scss';

const MainLayaut: FC = () => {
  // WIP, these useState`s will be deleted when we have redux
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLocked, setIsLocked] = useState<boolean>(false);

  return (
    <main className={styles.container}>
      <section className={styles.content}>
        <Outlet />
        <NavMenu classes={styles.menu} />
        <RoundMenu isOpen={isOpen} isLocked={isLocked} setIsOpen={setIsOpen} />
      </section>
      <Sidebar />
    </main>
  );
};

export default MainLayaut;
