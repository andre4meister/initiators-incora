import React, { FC, useState } from 'react';
import cn from 'classnames';
import { MenuOutlined } from '@ant-design/icons';
import s from './styles/App.module.scss';
import LoginPage from './pages/LoginPage/LoginPage';
import { ColorModeType } from './types/CommonTypes';
import Sidebar from './components/Sidebar/Sidebar';
import RoundMenu from './components/RoundMenu/RoundMenu';

interface AppType {
  Calendar: React.FunctionComponent;
}
const App: FC<AppType> = ({ Calendar }) => {
  const [colorMode, setColorMode] = useState<ColorModeType>('light');
  const [sidebarMenu, setSidebarMenu] = useState<boolean>(true);

  return (
    <div
      className={cn({
        [s.appContainer]: true,
        [s.largeAppContainer]: !sidebarMenu,
      })}
    >
      <main className={s.pageContainer}>
        <MenuOutlined
          className={s.menuIcon}
          onClick={() => setSidebarMenu(!sidebarMenu)}
        />
        <LoginPage />
        <RoundMenu />
      </main>
      <Sidebar sidebarMenu={sidebarMenu} />
    </div>
  );
};

export default App;
