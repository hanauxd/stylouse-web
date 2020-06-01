import { post } from './api';

export const onSignIn = (values) => {
  const endpoint = 'login';
  const body = {
    ...values,
  };
  return post(endpoint, body);
};

export const onSignUp = (values) => {
  const endpoint = 'register';
  const body = {
    ...values,
  };
  return post(endpoint, body);
};

export const onRequestPasswordReset = (values) => {
  const endpoint = `reset-password-request?email=${values}`;
  return post(endpoint, null, null);
};

export const onResetPasswordConfirmed = (values) => {
  const endpoint = 'reset-password-confirmation';
  return post(endpoint, values);
};

export const onResetPassword = (token, values) => {
  const endpoint = 'reset-password';
  return post(endpoint, values, token);
};
