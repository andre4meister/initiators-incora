/* eslint-disable consistent-return */
import moment, { now } from 'moment';
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
        .min(6, 'Password must contain 6 or more characters.');
    case 'confirmPassword':
      return Yup.string()
        .required('Required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match.');
    case 'meetingDate':
      return Yup.date()
        .required('Required')
        .min(moment(now()).format('YYYY-MM-DD'));
    case 'daysOfWeek':
      return Yup.array().required('Required').min(1, 'Choose at least one day');
    case 'startDate':
      return Yup.date()
        .required('Required')
        .min(moment(now()).format('YYYY-MM-DD'), 'Choose start date from today');
    case 'endDate':
      return Yup.date()
        .required('Required')
        .min(
          moment(now()).add(2, 'days'),
          'End date should be bigger than startDate at least on 2 days',
        )
        .max(moment(now()).add(3, 'months'), 'Booking period should be less than 3 month');

    default:
      return Yup.string();
  }
};

export default yupPattern;
