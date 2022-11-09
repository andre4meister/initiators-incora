import { FC } from 'react';
import { useAppSelector } from 'hooks/reduxHooks';
import InviteUser from './InviteUser/InviteUser';

import styles from './SettingsPage.module.scss';

const SettingsPage: FC = () => {
  const user = useAppSelector((state) => state.user);

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Settings</h1>

      {user.userData?.role.toLocaleLowerCase() === 'admin' && <InviteUser />}
    </>
  );
};

export default SettingsPage;
