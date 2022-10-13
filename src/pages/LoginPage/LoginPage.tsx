import { useFormik } from 'formik';
import * as Yup from 'yup';
import yupPattern from 'utils/yupPattern';
import { InitialValues } from 'types/FormTypes';
import { FC } from 'react';

const LoginPage: FC = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: yupPattern('email'),
      password: yupPattern('password'),
    }),
    onSubmit: (values: InitialValues) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });

  // eslint-disable-next-line object-curly-newline
  const { handleSubmit, handleChange, values, errors, touched } = formik;
  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <div className="form-item">
        <label className="item" htmlFor="email">
          Email
        </label>
        <input
          placeholder="Enter your email"
          className="input"
          id="email"
          name="email"
          type="email"
          onChange={handleChange}
          value={values.email}
        />
        {touched.email && errors.email ? (
          <div className="error">{errors.email}</div>
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
      <button className="sumbit-button" type="submit">
        Submit
      </button>
    </form>
  );
};

export default LoginPage;
