/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { ChangePasswordValues } from 'types/FormTypes';
import yupPattern from 'utils/yupPattern';
import Input from 'components/UI/Input/Input';
import Button from 'components/UI/Button/Button';
import { useAppDispatch } from 'hooks/reduxHooks';
import { changePassword } from 'store/user';
import style from './ChangePassword.module.scss';

const ChangePassword = () => {
  const dispatch = useAppDispatch();

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
    onSubmit: (values: ChangePasswordValues) => {
      dispatch(changePassword(values));
      formik.resetForm();
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
      {touched.newPassword && errors.newPassword ? (
        <div className="error">{errors.newPassword}</div>
      ) : null}
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default ChangePassword;
