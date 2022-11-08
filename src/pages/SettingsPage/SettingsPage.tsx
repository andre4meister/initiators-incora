/* eslint-disable object-curly-newline */
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { InitialSettingsValue } from 'types/FormTypes';
import { FC } from 'react';
import Button from 'components/UI/Button/Button';
import Input from 'components/UI/Input/Input';
import Upload from 'components/UI/Upload/Upload';
import yupPattern from 'utils/yupPattern';
import style from './SettingsPage.module.scss';

const SettingsPage: FC = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      password: '',
      email: '',
    },
    validationSchema: Yup.object({
      firstName: yupPattern('firstName'),
      lastName: yupPattern('surname'),
      password: yupPattern('password'),
      email: yupPattern('email'),
    }),
    onSubmit: (values: InitialSettingsValue) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });
  const { handleSubmit, handleChange, values, errors, touched } = formik;
  return (
    <div className={style.container}>
      <h1 className={style.text}>Account settings</h1>
      <Upload />
      <form className={style.block} onSubmit={handleSubmit}>
        <div>
          <Input
            placeholder="name"
            classes="input"
            name="firstName"
            type="text"
            handleOnChange={handleChange}
            value={values.firstName}
          />
          <div className={style.error_container}>
            {touched.firstName && errors.firstName ? (
              <div className={style.error}>{errors.firstName}</div>
            ) : null}
          </div>
        </div>
        <div>
          <Input
            placeholder="last name"
            classes="input"
            name="lastName"
            type="text"
            handleOnChange={handleChange}
            value={values.lastName}
          />
          <div className={style.error_container}>
            {touched.lastName && errors.lastName ? (
              <div className={style.error}>{errors.lastName}</div>
            ) : null}
          </div>
        </div>
        <div>
          <Input
            placeholder="password"
            classes="input"
            name="password"
            type="password"
            handleOnChange={handleChange}
            value={values.password}
          />
          <div className={style.error_container}>
            {touched.password && errors.password ? (
              <div className={style.error}>{errors.password}</div>
            ) : null}
          </div>
        </div>
        <div>
          <Input
            placeholder="email"
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
      </form>
      <Button
        type="submit"
        classes={style.button_submit}
        handleOnClick={handleSubmit}
      >
        Save
      </Button>
    </div>
  );
};

export default SettingsPage;
