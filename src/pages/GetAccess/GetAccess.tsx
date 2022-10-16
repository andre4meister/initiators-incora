/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable object-curly-newline */
import { useFormik } from 'formik';
import * as Yup from 'yup';
import yupPattern from 'utils/yupPattern';
import Input from 'components/UI/Input/Input';
import Button from 'components/UI/Button/Button';
import { InitialGetAccessValues } from 'types/FormTypes';
import { FC } from 'react';
import style from '../LoginPage/LoginPage.module.scss';

const GetAccessPage: FC = () => {
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
      <Button classes="button-submit" handleOnClick={handleSubmit}>
        Submit
      </Button>
    </form>
  );
};

export default GetAccessPage;
