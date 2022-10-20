import cn from 'classnames';
import { FC, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserOutlined, SettingOutlined } from '@ant-design/icons';
import { useAppSelector } from 'hooks/reduxHooks';
import AuthService from 'services/authService';
import Toggle from 'components/UI/Toggle/Toggle';
import Button from 'components/UI/Button/Button';
import styles from './Sidebar.module.scss';
import { useTheme } from '../../hoc/ThemeProvider';

const Sidebar: FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.userData);
  const [toggle, setToggle] = useState<boolean>(theme.theme !== 'light');

  const handleChangeTheme = () => {
    setToggle((prev) => !prev);
    if (toggle) {
      theme.handleChangeTheme('light');
    } else {
      theme.handleChangeTheme('dark');
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
        <div className={styles.avatar}><UserOutlined /></div>
        <h2 className={styles.name}>{`${user.firstName} ${user.lastName}`}</h2>
      </div>

      <div className={styles.mockPanel}>
        <div>
          Theme
          <Toggle isToggle={toggle} handleOnChange={handleChangeTheme} />
        </div>
        <Button handleOnClick={handleLogout}>Logout</Button>
      </div>
    </div>
  );
};

export default Sidebar;
