/* eslint-disable @typescript-eslint/no-misused-promises */
import { FC, useState } from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';
import AuthService from 'services/authService';
import Input from 'components/UI/Input/Input';
import Button from 'components/UI/Button/Button';
import Loader from 'components/UI/Loader/Loader';

import styles from './InviteUser.module.scss';

const InviteUser: FC = () => {
  const [inviteStatus, setInviteStatus] = useState<string>('');
  const [inviteInput, setInviteInput] = useState<string>('');
  const [addedEmails, setAddedEmails] = useState<string[]>([]);

  const handleSetEmails = () => {
    if (addedEmails.includes(inviteInput)) return;
    if (inviteInput === '') return;

    setAddedEmails((prev) => [...prev, inviteInput]);
    setInviteInput('');
  };

  const handleRemoveEmail = (email: string) => {
    setAddedEmails((prev) => prev.filter((item) => item !== email));
  };

  const handleSendInvute = async () => {
    setInviteStatus('pending');
    try {
      await AuthService.invite(addedEmails);
      setAddedEmails([]);
      setInviteStatus('success');
      alert('The invitations were sent');
    } catch (err) {
      setInviteStatus('failure');
    }
  };

  return (
    <div className={styles.container}>
      {inviteStatus === 'pending' && <Loader />}
      <h2 className={styles.title}>Invite user</h2>
      <div className={styles.inviteArea}>
        <div className={styles.inviteControl}>
          <Input
            classes={styles.input}
            placeholder="User email"
            type="email"
            value={inviteInput}
            handleOnChange={(e) => setInviteInput(e.target.value.trim())}
          />

          <Button
            handleOnClick={handleSetEmails}
          >
            Add email
          </Button>
        </div>

        <div className={styles.inviteList}>
          {addedEmails.map((email) => (
            <div key={email} className={styles.inviteListItem}>
              <p>{email}</p>
              <CloseCircleOutlined onClick={() => handleRemoveEmail(email)} />
            </div>
          ))}
        </div>

        <Button handleOnClick={handleSendInvute}>Send invite</Button>
      </div>
    </div>
  );
};

export default InviteUser;
