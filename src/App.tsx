import { FC } from 'react';
import {
  Route, createBrowserRouter, createRoutesFromElements, RouterProvider,
} from 'react-router-dom';
import MainLayaut from 'pages/MainLayaut/MainLayaut';
import ForgotPasswordPage from 'pages/Authorization/ForgotPasswordPage/ForgotPasswordPage';
import SettingsPage from 'pages/SettingsPage/SettingsPage';
import LoginPage from 'pages/Authorization/LoginPage/LoginPage';
import RegisterPage from 'pages/Authorization/RegisterPage/RegisterPage';
import TestPage from 'pages/TestPage/TestPage';
import Dashboard, { dashboardLoader } from 'pages/Dashboard/Dashboard';
import NotFoundPage from 'pages/NotFoundPage/NotFoundPage';
import styles from './styles/App.module.scss';

const router = createBrowserRouter(createRoutesFromElements(
  <Route>
    <Route path="/" element={<MainLayaut />}>
      <Route path="test" element={<TestPage />} />
      <Route index element={<Dashboard />} loader={dashboardLoader} errorElement={<h2>Error</h2>} />
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
    <Route path="register" element={<RegisterPage />} />
    <Route path="forgot" element={<ForgotPasswordPage />} />
    <Route path="*" element={<NotFoundPage />} />
    ,
  </Route>,
));

const App: FC = () => (
  <div id="app" className={styles.app}>
    <RouterProvider router={router} />
  </div>
);

export default App;
