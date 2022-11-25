/* eslint-disable @typescript-eslint/no-unsafe-member-access */
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
import InputError from 'components/InputError/InputError';
import { useAppDispatch } from 'hooks/reduxHooks';
import { addNotification } from 'store/alert';
import style from './ForgotPasswordPage.module.scss';

const ForgotPasswordPage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
        dispatch(
          addNotification({
            message: err?.toString() || 'Some error',
            type: 'error',
          }),
        );
      }
    },
  });

  const {
    handleSubmit, handleChange, values, errors, touched,
  } = formik;

  return (
    <div className={style.container}>
      <form className={style.form} onSubmit={handleSubmit}>
        <h1 className={style.text}>
          Forgot password
          <FrownOutlined className={style.sadSmileIcon} />
        </h1>
        <h5 className={style.forgot_page_text}>
          Please enter your email adress, we will send you reset
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
          {touched.email && errors.email ? (
            <InputError message={errors.email} />
          ) : null}
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
