/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useFormik } from 'formik';
import * as Yup from 'yup';
import yupPattern from 'utils/yupPattern';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import Input from 'components/UI/Input/Input';
import { useNavigate } from 'react-router-dom';
import Button from 'components/UI/Button/Button';
import { loginPending } from 'store/user';
import {
  InitialNewPasswordLoginValues,
  InitialLoginValues,
} from 'types/FormTypes';
import Loader from 'components/UI/Loader/Loader';
import { FC } from 'react';
import style from 'pages/Authorization/Authorization.module.scss';
import AuthService from 'services/authService';

const ResetPasswordPage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const formik = useFormik({
    initialValues: {
      email: '',
      newPassword: '',
    },
    validationSchema: Yup.object({
      email: yupPattern('email'),
      newPassword: yupPattern('password'),
    }),
    onSubmit: async (newPasswordLoginValues: InitialNewPasswordLoginValues) => {
      try {
        await AuthService.loginNewPassword(newPasswordLoginValues);
        const values: InitialLoginValues = {
          email: newPasswordLoginValues.email,
          password: newPasswordLoginValues.newPassword,
        };
        dispatch(loginPending({ values, navigate }));
      } catch (err) {
        console.log(err);
      }
    },
  });
  const { handleSubmit, handleChange, values, errors, touched } = formik;
  return (
    <div className={style.container}>
      {user.loading === 'pending' && <Loader />}
      <form className={style.form} onSubmit={handleSubmit}>
        <h1 className={style.text}>Login</h1>
        <div className={style.form_items}>
          <div className={style.form_item}>
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
          <div className={style.form_item}>
            <Input
              placeholder="Enter code"
              name="newPassword"
              classes="input"
              type="password"
              handleOnChange={handleChange}
              value={values.newPassword}
            />
            <div className={style.error_container}>
              {touched.newPassword && errors.newPassword ? (
                <div className={style.error}>{errors.newPassword}</div>
              ) : null}
            </div>
          </div>
        </div>
        <Button type="submit" classes={style.button_submit}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
