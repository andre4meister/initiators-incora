import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from 'components/Sidebar/Sidebar';
import NavMenu from 'components/NavMenu/NavMenu';
import styles from './MainLayaut.module.scss';

const MainLayaut: FC = () => (
  <main className={styles.container}>
    <section className={styles.content}>
      <Outlet />
      <NavMenu classes={styles.menu} />
    </section>
    <Sidebar />
  </main>
);

export default MainLayaut;
