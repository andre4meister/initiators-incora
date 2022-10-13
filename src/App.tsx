import { FC, useState } from 'react';
import cn from 'classnames';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import s from './styles/App.module.scss';
import LoginPage from './pages/LoginPage/LoginPage';
import { ColorModeType } from './types/CommonTypes';
import Sidebar from './components/Sidebar/Sidebar';
import RoundMenu from './components/RoundMenu/RoundMenu';

const App: FC = () => {
  const [colorMode, setColorMode] = useState<ColorModeType>('light');
  const [sidebarMenu, setSidebarMenu] = useState<boolean>(true);

  return (
    <div
      className={cn({
        [s.appContainer]: true,
        [s.largeAppContainer]: !sidebarMenu,
        [s.appContainerLight]: colorMode === 'light',
        [s.appContainerDark]: colorMode === 'dark',
      })}
    >
      <main className={s.pageContainer}>
        {sidebarMenu ? (
          <MenuUnfoldOutlined
            className={s.menuIcon}
            onClick={() => setSidebarMenu(!sidebarMenu)}
          />
        ) : (
          <MenuFoldOutlined
            className={s.menuIcon}
            onClick={() => setSidebarMenu(!sidebarMenu)}
          />
        )}
        <LoginPage />
        <RoundMenu />
      </main>
      <Sidebar sidebarMenu={sidebarMenu} />
    </div>
  );
};

export default App;
