import { FC } from 'react';
import {
  Route,
  createHashRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import MainLayaut from 'pages/MainLayaut/MainLayaut';
import ForgotPasswordPage from 'pages/ResetPassword/ForgotPasswordPage/ForgotPasswordPage';
import NewPasswordLoginPage from 'pages/ResetPassword/NewPasswordLoginPage/NewPasswordLoginPage';
import SettingsPage from 'pages/SettingsPage/SettingsPage';
import LoginPage from 'pages/Authorization/LoginPage/LoginPage';
import RegistrationPage from 'pages/Authorization/RegistrationPage/RegistrationPage';
import TestPage from 'pages/TestPage/TestPage';
import Dashboard, { dashboardLoader } from 'pages/Dashboard/Dashboard';
import CalendarPage, { calendarLoader } from 'pages/CalendarPage/CalendarPage';
import NotFoundPage from 'pages/NotFoundPage/NotFoundPage';
import styles from './styles/App.module.scss';

const router = createHashRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<MainLayaut />}>
        <Route path="test" element={<TestPage />} />
        <Route
          index
          element={<Dashboard />}
          loader={dashboardLoader}
          errorElement={<h2>Error</h2>}
        />
        <Route
          path="calendar"
          element={<CalendarPage />}
          loader={calendarLoader}
          errorElement={<h2>Error</h2>}
        />
        <Route
          path="map"
          element={<h1 style={{ textAlign: 'center' }}>map</h1>}
        />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
      <Route path="login" element={<LoginPage />} />
      <Route path="registration" element={<RegistrationPage />} />
      <Route path="new-password" element={<NewPasswordLoginPage />} />
      <Route path="forgot" element={<ForgotPasswordPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>,
  ),
);

const App: FC = () => (
  <div id="app" className={styles.app}>
    <RouterProvider router={router} />
  </div>
);

export default App;
