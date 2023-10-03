import * as Yup from 'yup';

export const _create_account_validator = Yup.object().shape({
  email: Yup.string().email().required(),
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  password: Yup.string().required(),
  gender: Yup.string().required(),
});

export const _login_validator = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(''),
});

export const _reset_password_validator = Yup.object().shape({
  email: Yup.string().email().required(), 
  new_password: Yup.string().required("New password is required"),
  current_password: Yup.string().required("Current password is required")
})