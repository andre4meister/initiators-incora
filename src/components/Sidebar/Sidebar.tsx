/* eslint-disable jsx-a11y/img-redundant-alt */
import cn from 'classnames';
import { FC, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserOutlined, SettingOutlined } from '@ant-design/icons';
import AuthService from 'services/authService';
import Toggle from 'components/UI/Toggle/Toggle';
import Button from 'components/UI/Button/Button';
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
    AuthService.logout();
    navigate('login', { replace: true });
  };

  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <NavLink className={({ isActive }) => cn(styles.settings, isActive && styles.settings_active)} to="settings"><SettingOutlined /></NavLink>
        <div className={styles.avatar}><img alt="user photo" src="https://vjoy.cc/wp-content/uploads/2020/10/0eb3a788b4c27f0fc56931421e810eea.jpg" /></div>
        <h2 className={styles.name}>{user && `${user.firstName} ${user.lastName}`}</h2>
      </div>

      <div className={styles.mockPanel}>
        <div>
          <Toggle isToggle={toggle} handleOnChange={handleChangeTheme} />
        </div>
        <Button classes={styles.button} handleOnClick={handleLogout}>Logout</Button>
      </div>
    </div>
  );
};

export default Sidebar;
