import * as Yup from 'yup';

const yupPattern = (validate: string) => {
  switch (validate) {
    case 'email':
      return Yup.string()
        .email('Invalid email address')
        .required('Required')
        .matches(/@incorainc.com$|@gmail.com$/, 'Please use your working mail.');
    case 'firstName':
      return Yup.string()
        .max(15, 'Must be under 15 symbols')
        .min(2, 'Must be more than 2 symbols')
        .matches(/[a-zA-Z]/, 'Name can only contain Latin letters.')
        .required('Required');
    case 'lastName':
      return Yup.string()
        .max(15, 'Must be under 15 symbols')
        .min(2, 'Must be more than 2 symbols')
        .matches(/[a-zA-Z]/, 'Surname can only contain Latin letters.')
        .required('Required');
    case 'password':
      return Yup.string()
        .required('No password provided.')
        .min(8, 'Password must contain 8 or more characters.');
    case 'confirmPassword':
      return Yup.string()
        .required('Required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match.');
    default:
      return Yup.string();
  }
};

export default yupPattern;
