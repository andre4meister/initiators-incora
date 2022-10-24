/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useFormik } from 'formik';
import * as Yup from 'yup';
import yupPattern from 'utils/yupPattern';
import Input from 'components/UI/Input/Input';
import Button from 'components/UI/Button/Button';
import { InitialGetAccessValues } from 'types/FormTypes';
import { FC } from 'react';
import style from '../Authorization.module.scss';

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

  const {
    handleSubmit, handleChange, values, errors, touched,
  } = formik;
  return (
    <form
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handleSubmit();
        }
      }}
      onSubmit={handleSubmit}
      className={style.form}
    >
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
