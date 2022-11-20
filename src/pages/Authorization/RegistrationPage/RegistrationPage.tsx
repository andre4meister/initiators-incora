import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { InitialRegistrationFormValues } from 'types/FormTypes';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import { registration } from 'store/user';
import yupPattern from 'utils/yupPattern';
import Input from 'components/UI/Input/Input';
import Button from 'components/UI/Button/Button';
import Loader from 'components/UI/Loader/Loader';
import styles from '../Authorization.module.scss';

const RegisterPage: FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      password: '',
      email: user.userData?.email || '',
    },
    validationSchema: Yup.object({
      firstName: yupPattern('firstName'),
      lastName: yupPattern('lastName'),
      password: yupPattern('password'),
      email: yupPattern('email'),
    }),
    onSubmit: (values: InitialRegistrationFormValues) => {
      dispatch(registration({ values, navigate }));
    },
  });

  const {
    handleSubmit, handleChange, values, errors, touched,
  } = formik;
  return (
    <div className={styles.container}>
      {user.loading === 'pending' && <Loader />}
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.text}>Create account</h1>
        <div className={styles.form_items}>
          <div className={styles.form_item}>
            <label className={styles.label} htmlFor="firstName">
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
            <div className={styles.error_container}>
              {touched.firstName && errors.firstName ? (
                <div className={styles.error}>{errors.firstName}</div>
              ) : null}
            </div>
          </div>

          <div className={styles.form_item}>
            <label className={styles.label} htmlFor="lastName">
              Last name
            </label>
            <Input
              placeholder="Enter your last name"
              classes="input"
              name="lastName"
              type="text"
              handleOnChange={handleChange}
              value={values.lastName}
            />
            <div className={styles.error_container}>
              {touched.lastName && errors.lastName ? (
                <div className={styles.error}>{errors.lastName}</div>
              ) : null}
            </div>
          </div>

          <div className={styles.form_item}>
            <label className={styles.label} htmlFor="password">
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
            <div className={styles.error_container}>
              {touched.password && errors.password ? (
                <div className={styles.error}>{errors.password}</div>
              ) : null}
            </div>
          </div>
          <div className={styles.form_item}>
            <label className={styles.item} htmlFor="email">
              Confirm your email
            </label>
            <Input
              placeholder="Enter your email"
              classes="input"
              name="email"
              type="email"
              handleOnChange={handleChange}
              value={values.email}
            />
            {touched.email && errors.email ? (
              <div className={styles.error}>{errors.email}</div>
            ) : null}
          </div>
        </div>
        <Button
          type="submit"
          classes={styles.button_submit}
        // handleOnClick={handleSubmit}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default RegisterPage;
