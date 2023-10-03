import * as Yup from 'yup';

export const _create_account_validator = Yup.object().shape({
  email: Yup.string().email().required(),
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  password: Yup.string().required(),
  gender: Yup.string().required(),
});

export const _login_validator = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(''),
});