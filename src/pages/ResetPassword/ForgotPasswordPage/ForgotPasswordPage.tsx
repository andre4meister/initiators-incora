/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable object-curly-newline */
import { useFormik } from 'formik';
import * as Yup from 'yup';
import yupPattern from 'utils/yupPattern';
import Input from 'components/UI/Input/Input';
import Button from 'components/UI/Button/Button';
import AuthService from 'services/authService';
import { InitialGetAccessValues } from 'types/FormTypes';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { FrownOutlined } from '@ant-design/icons';
import style from './ForgotPasswordPage.module.scss';

const ForgotPasswordPage: FC = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: yupPattern('email'),
    }),
    onSubmit: async (values: InitialGetAccessValues) => {
      try {
        const data = await AuthService.resetPassword(values);
        localStorage.setItem('token', JSON.stringify(data.data.token));
        navigate('/new-password');
      } catch (err) {
        console.log(err);
      }
    },
  });
  const { handleSubmit, handleChange, values, errors, touched } = formik;
  return (
    <div className={style.container}>
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
