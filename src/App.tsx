import { FC, useState } from 'react';
import cn from 'classnames';
import { MenuOutlined } from '@ant-design/icons';
import s from './styles/App.module.scss';
import Sidebar from './components/Sidebar/Sidebar';
import RoundMenu from './components/RoundMenu/RoundMenu';

const App: FC = () => {
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
        <RoundMenu />
      </main>
      <Sidebar sidebarMenu={sidebarMenu} />
    </div>
  );
};

export default App;
