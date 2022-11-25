/* eslint-disable object-curly-newline */
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FC } from 'react';
import { useAppSelector } from 'hooks/reduxHooks';
import { UserOutlined } from '@ant-design/icons';
import Button from 'components/UI/Button/Button';
import Input from 'components/UI/Input/Input';
import yupPattern from 'utils/yupPattern';
import ChangePassword from 'pages/SettingsPage/ChangePassword/ChangePassword';
import InviteUser from './InviteUser/InviteUser';
import style from './SettingsPage.module.scss';

interface InitialSettingsValue {
  firstName: string;
  lastName: string;
}

const SettingsPage: FC = () => {
  const { userData } = useAppSelector((state) => state.user);
  const formik = useFormik({
    initialValues: {
      firstName: userData?.firstName || '',
      lastName: userData?.lastName || '',
    },
    validationSchema: Yup.object({
      firstName: yupPattern('firstName'),
      lastName: yupPattern('lastName'),
    }),
    onSubmit: (values: InitialSettingsValue) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });

  const { handleSubmit, handleChange, values, errors, touched } = formik;
  return (
    <div className={style.container}>
      <h1 className={style.text}>Account settings</h1>
      <div className={style.avatar}>
        <UserOutlined />
      </div>
      <form className={style.block} onSubmit={handleSubmit}>
        <div className={style.block_input}>
          <Input
            placeholder=""
            classes="input"
            autofill={false}
            name="firstName"
            type="text"
            handleOnChange={handleChange}
            value={values.firstName}
          />
          <div className={style.error_container}>
            {touched.firstName && errors.firstName ? (
              <div className={style.error}>{errors.firstName}</div>
            ) : null}
          </div>
        </div>
        <div className={style.block_input}>
          <Input
            placeholder=""
            classes="input"
            name="lastName"
            autofill={false}
            type="text"
            handleOnChange={handleChange}
            value={values.lastName}
          />
          <div className={style.error_container}>
            {touched.lastName && errors.lastName ? (
              <div className={style.error}>{errors.lastName}</div>
            ) : null}
          </div>
        </div>
        <Button
          type="submit"
          classes={style.button_submit}
          handleOnClick={handleSubmit}
        >
          Change
        </Button>
      </form>
      <h3>Want to change password?</h3>
      <ChangePassword />
      {userData?.role.toLocaleLowerCase() === 'admin' && <InviteUser />}
    </div>
  );
};

export default SettingsPage;
