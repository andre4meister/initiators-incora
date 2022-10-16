/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable object-curly-newline */
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FC } from 'react';
import { InitialRegValues } from 'types/FormTypes';
import yupPattern from 'utils/yupPattern';
import Input from 'components/UI/Input/Input';
import Button from 'components/UI/Button/Button';
import style from '../LoginPage/LoginPage.module.scss';

const RegisterPage: FC = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      surname: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      firstName: yupPattern('firstName'),
      surname: yupPattern('surname'),
      password: yupPattern('password'),
      confirmPassword: yupPattern('confirmPassword'),
    }),
    onSubmit: (values: InitialRegValues) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });

  const { handleSubmit, handleChange, values, errors, touched } = formik;
  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <h1 className={style.text}>Create account</h1>
      <div className={style.form_item}>
        <label className={style.item} htmlFor="firstName">
          Name
        </label>
        <Input
          placeholder="Enter your name"
          classes="input"
          name="firstName"
          type="text"
          handleOnChange={handleChange}
          value={values.firstName}
        />
        {touched.firstName && errors.firstName ? (
          <div className={style.error}>{errors.firstName}</div>
        ) : null}
      </div>

      <div className={style.form_item}>
        <label className={style.item} htmlFor="surname">
          Surname
        </label>
        <Input
          placeholder="Enter your surname"
          classes="input"
          name="surname"
          type="text"
          handleOnChange={handleChange}
          value={values.surname}
        />
        {touched.surname && errors.surname ? (
          <div className={style.error}>{errors.surname}</div>
        ) : null}
      </div>

      <div className={style.form_item}>
        <label className={style.item} htmlFor="password">
          Password
        </label>
        <Input
          placeholder="Enter your password"
          classes="input"
          name="password"
          type="password"
          handleOnChange={handleChange}
          value={values.password}
        />
        {touched.password && errors.password ? (
          <div className={style.error}>{errors.password}</div>
        ) : null}
      </div>
      <div className={style.form_item}>
        <label className={style.item} htmlFor="confirmPassword">
          Confirm your passport
        </label>
        <Input
          placeholder="Confirm your password"
          classes="input"
          name="confirmPassword"
          type="password"
          handleOnChange={handleChange}
          value={values.confirmPassword}
        />
        {touched.confirmPassword && errors.confirmPassword ? (
          <div className={style.error}>{errors.confirmPassword}</div>
        ) : null}
      </div>

      <Button classes="button-submit" handleOnClick={handleSubmit}>
        Submit
      </Button>
    </form>
  );
};

export default RegisterPage;
