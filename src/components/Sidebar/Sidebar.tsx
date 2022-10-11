import React, { FC, useState } from 'react';
import cn from 'classnames';
import Button from 'components/Button/Button';
import s from './Sidebar.module.scss';
import { ColorModeType } from '../../types/CommonTypes';

interface SidebarProps {
  sidebarMenu: boolean;
}

const Sidebar: FC<SidebarProps> = ({ sidebarMenu }) => {
  const [colorMode, setColorMode] = useState<ColorModeType>('light');
  const [authorize, setAuthorize] = useState<boolean>(true);
  return (
    <div
      className={cn({
        [s.sidebarContainer]: true,
        [s.sidebarHidden]: !sidebarMenu,
      })}
    >
      <div className={s.userInfo}>
        <div className={s.userPhoto}>
          <img
            alt=""
            src="https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg"
          />
        </div>
        <div>
          <span>User`s name</span>
        </div>
      </div>
      <ul className={s.sidebarRooms}>
        <li>room1</li>
        <li>room2</li>
        <li>room3</li>
        <li>room4</li>
        <li>room5</li>
        <li>room6</li>
      </ul>
      <div className={s.sidebarLoginButton}>
        <Button handleOnClick={() => setAuthorize(!authorize)}>
          {authorize ? 'Logout' : 'Login'}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
