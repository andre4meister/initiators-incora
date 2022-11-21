import { FC, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppSelector } from 'hooks/reduxHooks';
import AuthService from 'services/authService';
import Sidebar from 'components/Sidebar/Sidebar';
import NavMenu from 'components/NavMenu/NavMenu';
import RoundMenu from 'components/RoundMenu/RoundMenu';
import styles from './MainLayaut.module.scss';

const MainLayaut: FC = () => {
  const isAuth = JSON.parse(
    localStorage.getItem('isAuth') || 'false',
  ) as boolean;
  const user = useAppSelector((state) => state.user.error);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === 'expire token') {
      navigate('/login', { replace: true });
      AuthService.logout();
    }

    if (!isAuth) {
      navigate('/login', { replace: true });
    }
  }, [isAuth, navigate, user]);

  return (
    <main className={styles.container}>
      <section className={styles.content}>
        <Outlet />
        <RoundMenu />
      </section>
      <div className={styles.menuContainer}>
        <NavMenu classes={styles.menu} />
      </div>
      <Sidebar />
    </main>
  );
};
export default MainLayaut;
