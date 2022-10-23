import { FC, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from 'components/Sidebar/Sidebar';
import NavMenu from 'components/NavMenu/NavMenu';
import RoundMenu from 'components/RoundMenu/RoundMenu';
import styles from './MainLayaut.module.scss';

const MainLayaut: FC = () => {
  const isAuth = JSON.parse(
    localStorage.getItem('isAuth') || 'false',
  ) as boolean;

  if (!isAuth) {
    return <Navigate to="login" />;
  }
  return (
    <main className={styles.container}>
      <section className={styles.content}>
        <Outlet />
        <NavMenu classes={styles.menu} />
        <RoundMenu />
      </section>
      <Sidebar />
    </main>
  );
};
export default MainLayaut;
