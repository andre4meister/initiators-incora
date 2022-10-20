/* eslint-disable jsx-a11y/label-has-associated-control */
import { useFormik } from 'formik';
import * as Yup from 'yup';
import yupPattern from 'utils/yupPattern';
import Input from 'components/UI/Input/Input';
import Button from 'components/UI/Button/Button';
import { InitialLoginValues } from 'types/FormTypes';
import { NavLink } from 'react-router-dom';
import { FC } from 'react';
import style from './LoginPage.module.scss';

const LoginPage: FC = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: yupPattern('email'),
      password: yupPattern('password'),
    }),
    onSubmit: (values: InitialLoginValues) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });

  const {
    handleSubmit, handleChange, values, errors, touched,
  } = formik;
  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <h1 className={style.text}>Login</h1>
      <div className={style.form_item}>
        <label className={style.item} htmlFor="email">
          Email
        </label>
        <Input
          placeholder="Enter your email"
          name="email"
          classes="input"
          type="email"
          handleOnChange={handleChange}
          value={values.email}
        />
        {touched.email && errors.email ? (
          <div className={style.error}>{errors.email}</div>
        ) : null}
      </div>
      <div className={style.form_item}>
        <label className={style.item} htmlFor="password">
          Password
        </label>
        <Input
          placeholder="Enter your password"
          name="password"
          classes="input"
          type="password"
          handleOnChange={handleChange}
          value={values.password}
        />
        {touched.password && errors.password ? (
          <div className={style.error}>{errors.password}</div>
        ) : null}
      </div>
      <Button classes="button-submit" handleOnClick={handleSubmit}>
        Submit
      </Button>
      <NavLink className={style.forgot} to="/forgot">
        Forgot your password?
      </NavLink>
    </form>
  );
};

export default LoginPage;
