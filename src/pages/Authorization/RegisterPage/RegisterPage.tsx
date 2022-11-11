import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FC } from 'react';
import { InitialRegistrationFormValues } from 'types/FormTypes';
import yupPattern from 'utils/yupPattern';
import Input from 'components/UI/Input/Input';
import Button from 'components/UI/Button/Button';
import styles from '../Authorization.module.scss';

const RegisterPage: FC = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      firstName: yupPattern('firstName'),
      lastName: yupPattern('lastName'),
      password: yupPattern('password'),
      confirmPassword: yupPattern('confirmPassword'),
    }),
    onSubmit: (values: InitialRegistrationFormValues) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });

  const {
    handleSubmit, handleChange, values, errors, touched,
  } = formik;
  return (
    <div className={styles.container}>
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
            <Input
              placeholder="Confirm your password"
              classes="input"
              name="confirmPassword"
              type="password"
              handleOnChange={handleChange}
              value={values.confirmPassword}
            />
            <div className={styles.error_container}>
              {touched.confirmPassword && errors.confirmPassword ? (
                <div className={styles.error}>{errors.confirmPassword}</div>
              ) : null}
            </div>
          </div>
        </div>
        <Button
          type="submit"
          classes={styles.button_submit}
          handleOnClick={handleSubmit}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default RegisterPage;
