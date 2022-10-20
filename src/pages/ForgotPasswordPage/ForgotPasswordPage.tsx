/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useFormik } from 'formik';
import * as Yup from 'yup';
import yupPattern from 'utils/yupPattern';
import Input from 'components/UI/Input/Input';
import Button from 'components/UI/Button/Button';
import { InitialGetAccessValues } from 'types/FormTypes';
import { FC } from 'react';
import style from '../LoginPage/LoginPage.module.scss';

const ForgotPasswordPage: FC = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: yupPattern('email'),
    }),
    onSubmit: (values: InitialGetAccessValues) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });

  const { handleSubmit, handleChange, values, errors, touched } = formik;
  return (
    <form className={style.forgot_page} onSubmit={handleSubmit}>
      <h1 className={style.text}>Forgot your password?😞</h1>
      <h5 className={style.forgot_page_text}>
        Please enter your working email adress,where we can sent password reset informatin
      </h5>
      <div className={style.form_item}>
        <label className={style.item} htmlFor="email" />
        <Input
          placeholder="Enter your email"
          name="email"
          classes="input"
          type="email"
          handleOnChange={handleChange}
          value={values.email}
        />
        {touched.email && errors.email ? <div className={style.error}>{errors.email}</div> : null}
      </div>
      <Button classes="button-submit" handleOnClick={handleSubmit}>
        Request reset link
      </Button>
    </form>
  );
};

export default ForgotPasswordPage;
