/* eslint-disable object-curly-newline */
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { InitialRegistrationFormValues } from 'types/FormTypes';
import { FC } from 'react';
import Button from 'components/UI/Button/Button';
import Input from 'components/UI/Input/Input';
import yupPattern from 'utils/yupPattern';
import style from './SettingsPage.module.scss';
import PersonalInformation from './PersonalInformation';

const SettingsPage: FC = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      firstName: yupPattern('firstName'),
      lastName: yupPattern('surname'),
      password: yupPattern('password'),
      confirmPassword: yupPattern('confirmPassword'),
    }),
    onSubmit: (values: InitialRegistrationFormValues) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });
  const { handleSubmit, handleChange, values, errors, touched } = formik;
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Settings</h1>
      <PersonalInformation />
      <hr />
      <form className={style.container} onSubmit={handleSubmit}>
        <label className={style.label} htmlFor="firstName">
          Do you want to change your name?
        </label>
        <Input
          placeholder="Enter new name"
          classes="input"
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
        <Input
          placeholder="Enter your last name"
          classes="input"
          name="lastName"
          type="text"
          handleOnChange={handleChange}
          value={values.lastName}
        />
        <div className={style.error_container}>
          {touched.lastName && errors.lastName ? (
            <div className={style.error}>{errors.lastName}</div>
          ) : null}
        </div>
        <Button
          type="submit"
          classes={style.button_submit}
          handleOnClick={handleSubmit}
        >
          Change user name
        </Button>
      </form>
      <hr />
      <form className={style.container} onSubmit={handleSubmit}>
        <label className={style.label} htmlFor="firstName">
          Do you want to change your password?
        </label>
        <Input
          placeholder="Enter your new password"
          classes="input"
          name="password"
          type="password"
          handleOnChange={handleChange}
          value={values.password}
        />
        <div className={style.error_container}>
          {touched.password && errors.password ? (
            <div className={style.error}>{errors.password}</div>
          ) : null}
        </div>
        <Input
          placeholder="Confirm your password"
          classes="input"
          name="confirmPassword"
          type="password"
          handleOnChange={handleChange}
          value={values.confirmPassword}
        />
        <div className={style.error_container}>
          {touched.confirmPassword && errors.confirmPassword ? (
            <div className={style.error}>{errors.confirmPassword}</div>
          ) : null}
        </div>
        <Button
          type="submit"
          classes={style.button_submit}
          handleOnClick={handleSubmit}
        >
          Change password
        </Button>
      </form>
      <hr />
    </div>
  );
};

export default SettingsPage;
