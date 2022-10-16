import cn from 'classnames';
import { FC, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { UserOutlined, SettingOutlined } from '@ant-design/icons';
import Toggle from 'components/UI/Toggle/Toggle';
import styles from './Sidebar.module.scss';
import { useTheme } from '../../hoc/ThemeProvider';

const Sidebar: FC = () => {
  const theme = useTheme();
  const [toggle, setToggle] = useState<boolean>(theme.theme !== 'light');

  const handleChangeTheme = () => {
    setToggle((prev) => !prev);
    if (toggle) {
      theme.handleChangeTheme('light');
    } else {
      theme.handleChangeTheme('dark');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <NavLink className={({ isActive }) => cn(styles.settings, isActive && styles.settings_active)} to="settings"><SettingOutlined /></NavLink>
        <div className={styles.avatar}><UserOutlined /></div>
        <h2 className={styles.name}>Firstname Lastname</h2>
      </div>

      <div
        className={styles.mockPanel}
        style={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 10,
        }}
      >
        Change theme
        <Toggle isToggle={toggle} onChange={handleChangeTheme} />
      </div>
    </div>
  );
};

export default Sidebar;
