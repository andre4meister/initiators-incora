import cn from 'classnames';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { UserOutlined, SettingOutlined } from '@ant-design/icons';
import styles from './Sidebar.module.scss';

const Sidebar: FC = () => (
  <div className={styles.container}>
    <div className={styles.user}>
      {/* <div className={styles.settings}> */}
      <NavLink className={({ isActive }) => cn(styles.settings, isActive && styles.settings_active)} to="settings"><SettingOutlined /></NavLink>
      {/* </div> */}
      <div className={styles.avatar}><UserOutlined /></div>
      <h2 className={styles.name}>Firstname Lastname</h2>
    </div>

    <div className={styles.mockPanel} style={{ textAlign: 'center' }}>There will be some info</div>
  </div>
);

export default Sidebar;
