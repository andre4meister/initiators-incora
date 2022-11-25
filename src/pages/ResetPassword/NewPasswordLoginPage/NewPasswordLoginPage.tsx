/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useFormik } from 'formik';
import * as Yup from 'yup';
import yupPattern from 'utils/yupPattern';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import Input from 'components/UI/Input/Input';
import { useNavigate } from 'react-router-dom';
import Button from 'components/UI/Button/Button';
import { loginPending } from 'store/user';
import Loader from 'components/UI/Loader/Loader';
import { FC } from 'react';
import style from 'pages/Authorization/Authorization.module.scss';
import InputError from 'components/InputError/InputError';

export interface NewLoginType {
  email: string,
  password: string,
}

const ResetPasswordPage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: yupPattern('email'),
      password: yupPattern('password'),
    }),
    onSubmit: (values: NewLoginType) => {
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
        <h1 className={style.text}>Reseting</h1>
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
              placeholder="Enter code"
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
      </form>
    </div>
  );
};

export default ResetPasswordPage;
