import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from 'components/Sidebar/Sidebar';
import Header from 'components/Header/Header';
import styles from './MainLayaut.module.scss';

const MainLayaut: FC = () => (
  <main className={styles.container}>
    <Header />
    <section className={styles.content}>
      <Outlet />
    </section>
    <Sidebar />
  </main>
);

export default MainLayaut;
