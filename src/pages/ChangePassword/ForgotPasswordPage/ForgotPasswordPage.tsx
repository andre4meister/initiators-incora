/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable object-curly-newline */
import { useFormik } from 'formik';
import * as Yup from 'yup';
import yupPattern from 'utils/yupPattern';
import Input from 'components/UI/Input/Input';
import Button from 'components/UI/Button/Button';
import axios from 'axios';
import Loader from 'components/UI/Loader/Loader';
// import AuthService from 'services/authService';
import { InitialGetAccessValues } from 'types/FormTypes';
import { FC, useState } from 'react';
import { FrownOutlined } from '@ant-design/icons';
import style from '../ChangePassword.module.scss';

const onSetRequestHandler = async (email: string) => {
  const data = JSON.stringify(email);
  try {
    await axios.put(
      'https://initiators-ua.herokuapp.com/auth/reset-password',
      data,
    );
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};

const ForgotPasswordPage: FC = () => {
  // const [requestCodeStatus, setRequestCodeStatus] = useState<string>('');
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: yupPattern('email'),
    }),
    onSubmit: (values: InitialGetAccessValues) => {
      onSetRequestHandler(values.email);
    },
  });
  const { handleSubmit, handleChange, values, errors, touched } = formik;
  return (
    <div className={style.container}>
      {/* {requestCodeStatus === 'pending' && <Loader />} */}
      <form className={style.form} onSubmit={handleSubmit}>
        <h1 className={style.text}>
          Forgot your password
          <FrownOutlined className={style.sadSmileIcon} />
        </h1>
        <h5 className={style.forgot_page_text}>
          Please enter your working email adress, where we can send you reset
          password information
        </h5>
        <div className={style.forgot_page_item}>
          <Input
            placeholder="Enter your email"
            name="email"
            classes="input"
            type="email"
            handleOnChange={handleChange}
            value={values.email}
          />
          <div className={style.error_container}>
            {touched.email && errors.email ? (
              <div className={style.error}>{errors.email}</div>
            ) : null}
          </div>
        </div>
        <Button
          type="submit"
          classes="button-submit"
          handleOnClick={handleSubmit}
        >
          Request reset link
        </Button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
