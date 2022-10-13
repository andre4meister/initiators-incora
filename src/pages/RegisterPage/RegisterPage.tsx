import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FC } from 'react';
import { InitialValues } from 'types/FormTypes';
import yupPattern from 'utils/yupPattern';

const RegisterPage: FC = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      surname: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      firstName: yupPattern('firstName'),
      surname: yupPattern('surname'),
      password: yupPattern('password'),
      confirmPassword: yupPattern('confirmPassword'),
    }),
    onSubmit: (values: InitialValues) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });
  // eslint-disable-next-line object-curly-newline
  const { handleSubmit, handleChange, values, errors, touched } = formik;
  return (
    <form onSubmit={handleSubmit}>
      <h1>Create account</h1>
      <div className="form-item">
        <label className="item" htmlFor="firstName">
          Name
        </label>
        <input
          placeholder="Enter your name"
          className="input"
          id="firstName"
          name="firstName"
          type="text"
          onChange={handleChange}
          value={values.firstName}
        />
        {touched.firstName && errors.firstName ? (
          <div className="error">{errors.firstName}</div>
        ) : null}
      </div>

      <div className="form-item">
        <label className="item" htmlFor="surname">
          Surname
        </label>
        <input
          placeholder="Enter your surname"
          className="input"
          id="surname"
          name="surname"
          type="text"
          onChange={handleChange}
          value={values.surname}
        />
        {touched.surname && errors.surname ? (
          <div className="error">{errors.surname}</div>
        ) : null}
      </div>

      <div className="form-item">
        <label className="item" htmlFor="password">
          Password
        </label>
        <input
          placeholder="Enter your password"
          className="input"
          id="password"
          name="password"
          type="password"
          onChange={handleChange}
          value={values.password}
        />
        {touched.password && errors.password ? (
          <div className="error">{errors.password}</div>
        ) : null}
      </div>
      <div className="form-item">
        <label className="item" htmlFor="confirmPassword">
          Confirm your passport
        </label>
        <input
          placeholder="Confirm your password"
          className="input"
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          onChange={handleChange}
          value={values.confirmPassword}
        />
        {touched.confirmPassword && errors.confirmPassword ? (
          <div className="error">{errors.confirmPassword}</div>
        ) : null}
      </div>

      <button className="sumbit-button" type="submit">
        Submit
      </button>
    </form>
  );
};

export default RegisterPage;
