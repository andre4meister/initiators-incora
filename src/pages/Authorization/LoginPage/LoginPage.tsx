/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import yupPattern from 'utils/yupPattern';
import Input from 'components/UI/Input/Input';
import Button from 'components/UI/Button/Button';
import Loader from 'components/UI/Loader/Loader';
import { InitialLoginValues } from 'types/FormTypes';
import { NavLink, useNavigate } from 'react-router-dom';
import { FC } from 'react';
import { loginPending } from 'store/user';
import InputError from 'components/InputError/InputError';
import style from '../Authorization.module.scss';

const LoginPage: FC = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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
      dispatch(loginPending({ values, navigate }));
    },
  });
  const {
    handleSubmit, handleChange, values, errors, touched,
  } = formik;
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
            {touched.email && errors.email ? (
              <InputError message={errors.email} />
            ) : null}
          </div>
          <div className={style.form_item}>
            <Input
              placeholder="Enter your password"
              name="password"
              classes="input"
              type="password"
              handleOnChange={handleChange}
              value={values.password}
            />
            {touched.password && errors.password ? (
              <InputError message={errors.password} />
            ) : null}
          </div>
        </div>
        <Button type="submit" classes={style.button_submit}>
          Submit
        </Button>
        <NavLink className={style.forgot} to="/forgot">
          Forgot your password?
        </NavLink>
      </form>
    </div>
  );
};

export default LoginPage;
