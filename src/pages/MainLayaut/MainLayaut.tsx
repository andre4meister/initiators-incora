import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from 'components/Sidebar/Sidebar';
import NavMenu from 'components/NavMenu/NavMenu';
import styles from './MainLayaut.module.scss';

const MainLayaut: FC = () => {
  const isAuth = JSON.parse(localStorage.getItem('isAuth') || 'false') as boolean;

  if (!isAuth) {
    return <Navigate to="login" />;
  }

  return (
    <main className={styles.container}>
      <section className={styles.content}>
        <Outlet />
        <NavMenu classes={styles.menu} />
      </section>
      <Sidebar />
    </main>
  );
};
export default MainLayaut;
