import React, { FC, useState } from 'react';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import s from './styles/App.module.scss';
import LoginPage from './pages/LoginPage/LoginPage';
import { ColorModeType } from './types/CommonTypes';

interface AppType {
  Calendar: React.FunctionComponent;
}
const App: FC<AppType> = ({ Calendar }) => {
  const [colorMode, setColorMode] = useState<ColorModeType>('light');

  return (
    <div className={s.app}>
      <Header />
      <main>
        <LoginPage />
      </main>
      <Footer />
    </div>
  );
};

export default App;
