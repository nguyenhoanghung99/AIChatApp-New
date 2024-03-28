import * as Yup from 'yup';

const regexEmail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const requiredMessage = 'Field not empty';
const validEmailMessage = 'Please enter correct email';
const minPassMessage = 'Password has at least 8 characters';
const maxPassMessage = 'Password has at least 20 characters';

const validateFormRegister = Yup.object().shape({
  fullName: Yup.string()
    .min(2, 'Name has at least 2 characters')
    .max(20, 'Name has at least 20 characters')
    .required(requiredMessage),
  email: Yup.string()
    .matches(regexEmail, validEmailMessage)
    .required(requiredMessage),
  password: Yup.string()
    .min(8, minPassMessage)
    .max(20, maxPassMessage)
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(
      /[!@#$%^&*]/,
      'Password must contain at least one special character',
    )
    .required(requiredMessage),
  confirmPassword: Yup.string()
    .required(requiredMessage)
    .oneOf([Yup.ref('password')], 'Confirm password is incorrect'),
});

const validateFormLogin = Yup.object().shape({
  email: Yup.string()
    .matches(regexEmail, validEmailMessage)
    .required(requiredMessage),
  password: Yup.string()
    .min(8, minPassMessage)
    .max(20, maxPassMessage)
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(
      /[!@#$%^&*]/,
      'Password must contain at least one special character',
    )
    .required(requiredMessage),
});

const validateFromChangePassword = Yup.object().shape({
  password: Yup.string()
    .min(8, minPassMessage)
    .max(20, maxPassMessage)
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(
      /[!@#$%^&*]/,
      'Password must contain at least one special character',
    )
    .required(requiredMessage),
  oldPassword: Yup.string()
    .min(8, minPassMessage)
    .max(20, maxPassMessage)
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(
      /[!@#$%^&*]/,
      'Password must contain at least one special character',
    )
    .required(requiredMessage),
  confirmPassword: Yup.string()
    .required(requiredMessage)
    .oneOf([Yup.ref('password')], 'Confirm password is incorrect'),
});

export {validateFormRegister, validateFormLogin, validateFromChangePassword};
