/* eslint-disable object-curly-newline */
import { useFormik } from 'formik';
import Input from 'components/UI/Input/Input';
import Button from 'components/UI/Button/Button';
import { InitialConfirmPasswordValue } from 'types/FormTypes';
import { FC } from 'react';
import style from '../ChangePassword.module.scss';

const ConfirmPasswordPage: FC = () => {
  const formik = useFormik({
    initialValues: {
      password: '',
    },
    onSubmit: (values: InitialConfirmPasswordValue) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });

  const { handleSubmit, handleChange, values } = formik;
  return (
    <div className={style.container}>
      <form className={style.form} onSubmit={handleSubmit}>
        <h1 className={style.text}>Confirmation code</h1>
        <div className={style.forgot_page_item}>
          <Input
            classes="input"
            type="text"
            name="password"
            placeholder=""
            handleOnChange={handleChange}
            value={values.password}
          />
        </div>
        <Button
          type="submit"
          classes="button-submit"
          handleOnClick={handleSubmit}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ConfirmPasswordPage;
