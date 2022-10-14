import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { SettingOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import s from './RoundMenu.module.scss';
import { ColorModeType } from '../../types/CommonTypes';

const RoundMenu = () => {
  const [colorMode, setColorMode] = useState<ColorModeType>('light');
  const [menuChecked, setMenuChecked] = useState<boolean>(false);

  return (
    <div className={s.roundMenuBody}>
      <nav className={s.menu}>
        <input
          checked={menuChecked}
          onChange={() => setMenuChecked(!menuChecked)}
          className={s.menuToggler}
          type="checkbox"
        />
        <ul>
          <li className={s.menuItem}>
            <NavLink to="/settings">
              <SettingOutlined />
            </NavLink>
          </li>
          <li className={s.menuItem}>
            <NavLink to="/calendar">
              <PlusOutlined />
            </NavLink>
          </li>
          <li className={s.menuItem}>
            <NavLink to="profile">
              <UserOutlined />
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default RoundMenu;
