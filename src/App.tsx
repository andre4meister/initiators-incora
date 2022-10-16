import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayaut from 'pages/MainLayaut/MainLayaut';
import ForgotPasswordPage from 'pages/ForgotPasswordPage/ForgotPasswordPage';
import SettingsPage from 'pages/SettingsPage/SettingsPage';
import TestPage from 'pages/TestPage/TestPage';
import LoginPage from './pages/LoginPage/LoginPage';

const App: FC = () => (
  <Routes>
    <Route path="/" element={<MainLayaut />}>
      <Route index element={<TestPage />} />
      <Route
        path="booking"
        element={<h1 style={{ textAlign: 'center' }}>booking</h1>}
      />
      <Route
        path="map"
        element={<h1 style={{ textAlign: 'center' }}>map</h1>}
      />
      <Route path="settings" element={<SettingsPage />} />
    </Route>
    <Route path="login" element={<LoginPage />} />
    <Route path="forgot" element={<ForgotPasswordPage />} />
  </Routes>
);

export default App;
