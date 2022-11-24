/* eslint-disable @typescript-eslint/no-misused-promises */
import { FC, useState } from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { InitialGetAccessValues } from 'types/FormTypes';
import yupPattern from 'utils/yupPattern';
import AuthService from 'services/authService';
import Input from 'components/UI/Input/Input';
import Button from 'components/UI/Button/Button';
import Loader from 'components/UI/Loader/Loader';
import InputError from 'components/InputError/InputError';

import styles from './InviteUser.module.scss';

const InviteUser: FC = () => {
  const [inviteStatus, setInviteStatus] = useState<string>('');
  const [addedEmails, setAddedEmails] = useState<string[]>([]);

  const handleRemoveEmail = (email: string) => {
    setAddedEmails((prev) => prev.filter((item) => item !== email));
  };

  const handleSendInvite = async () => {
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

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: yupPattern('email'),
    }),
    onSubmit: (values: InitialGetAccessValues) => {
      if (addedEmails.includes(values.email)) return;
      if (values.email === '') return;

      setAddedEmails((prev) => [...prev, values.email]);
      formik.resetForm();
    },
  });

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
            name="email"
            value={formik.values.email}
            handleOnChange={formik.handleChange}
          />
          <div className={styles.error}>
            {formik.touched.email && formik.errors.email ? (
              <InputError message={formik.errors.email} />
            ) : null}
          </div>
          <Button type="button" handleOnClick={formik.handleSubmit}>
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

        <Button handleOnClick={handleSendInvite}>Send invite</Button>
      </div>
    </div>
  );
};

export default InviteUser;
