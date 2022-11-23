/* eslint-disable jsx-a11y/img-redundant-alt */
import cn from 'classnames';
import { FC, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { SettingOutlined, LogoutOutlined, BulbOutlined } from '@ant-design/icons';
import AuthService from 'services/authService';
import { useAppSelector } from 'hooks/reduxHooks';
import { useTheme } from '../../hoc/ThemeProvider';
import styles from './Sidebar.module.scss';

const Sidebar: FC = () => {
  const themeContext = useTheme();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.userData);
  const [toggle, setToggle] = useState<boolean>(themeContext.theme !== 'light');

  const handleChangeTheme = () => {
    setToggle((prev) => !prev);
    if (toggle) {
      themeContext.handleChangeTheme('light');
    } else {
      themeContext.handleChangeTheme('dark');
    }
  };

  const handleLogout = () => {
    navigate('login', { replace: true });
    AuthService.logout();
  };

  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <div className={styles.avatar}><img alt="user photo" src="https://vjoy.cc/wp-content/uploads/2020/10/0eb3a788b4c27f0fc56931421e810eea.jpg" /></div>
        <div className={styles.userContrlos}>
          <NavLink className={({ isActive }) => cn(styles.settings, isActive && styles.settings_active)} to="settings"><SettingOutlined /></NavLink>
          <LogoutOutlined className={styles.logout} onClick={handleLogout} />
          <BulbOutlined className={styles.theme} onClick={handleChangeTheme} />
        </div>
        <div className={styles.fullName}>
          <div className={styles.firstName}>{user && user.firstName}</div>
          <div className={styles.lastName}>{user && user.lastName}</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
