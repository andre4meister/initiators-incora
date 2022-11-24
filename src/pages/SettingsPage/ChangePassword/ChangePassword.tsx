import * as Yup from 'yup';
import { useFormik } from 'formik';
import { ChangePasswordValues } from 'types/FormTypes';
import InputError from 'components/InputError/InputError';
import yupPattern from 'utils/yupPattern';
import Input from 'components/UI/Input/Input';
import Button from 'components/UI/Button/Button';
import AuthService from 'services/authService';
import style from './ChangePassword.module.scss';

const ChangePassword = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      oldPassword: '',
      newPassword: '',
    },
    validationSchema: Yup.object({
      email: yupPattern('email'),
      oldPassword: yupPattern('password'),
      newPassword: yupPattern('password'),
    }),
    onSubmit: async (values: ChangePasswordValues) => {
      try {
        await AuthService.changePassword(values);
        formik.resetForm();
        alert('Password was changed☻');
      } catch (err) {
        console.log(err);
      }
    },
  });

  const {
    handleSubmit, handleChange, values, errors, touched,
  } = formik;
  return (
    <form className={style.container} onSubmit={handleSubmit}>
      <div className={style.input}>
        <Input
          placeholder="Enter your email"
          name="email"
          classes="input"
          type="email"
          handleOnChange={handleChange}
          value={values.email}
        />
      </div>

      <div className={style.input}>
        <Input
          placeholder="Enter your old password"
          name="oldPassword"
          classes="input"
          type="password"
          handleOnChange={handleChange}
          value={values.oldPassword}
        />
      </div>
      <div className={style.input}>
        <Input
          placeholder="Enter your new password"
          name="newPassword"
          classes="input"
          type="password"
          handleOnChange={handleChange}
          value={values.newPassword}
        />
      </div>
      <div className={style.error}>
        {touched.newPassword && errors.newPassword ? (
          <InputError message={errors.newPassword} />
        ) : null}
      </div>
      <div className={style.error}>
        {touched.email && errors.email ? (
          <InputError message={errors.email} />
        ) : null}
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default ChangePassword;
