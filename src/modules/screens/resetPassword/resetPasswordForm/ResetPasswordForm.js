import React from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  InputAdornment,
  IconButton,
  OutlinedInput,
  InputLabel,
  FormControl,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { MDBBtn } from 'mdbreact';

import { useCustomState } from '../../../helpers/hooks';

import styles from './ResetPasswordForm.module.css';

const PasswordResetForm = (props) => {
  const { onPasswordSubmit } = props;

  const [state, setState] = useCustomState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setState({
      showPassword: !state.showPassword,
    });
  };

  const passwordSchema = Yup.object().shape({
    password: Yup.string()
      .required('Password is required.')
      .min(4, 'Password should be minimum 4 characters.')
      .max(15, 'Password should be maximum 15 characters.'),
  });

  return (
    <Formik
      initialValues={{ password: '' }}
      validationSchema={passwordSchema}
      onSubmit={onPasswordSubmit}
    >
      {({ values, handleChange, handleBlur }) => {
        return (
          <Form>
            <div className={styles.container}>
              <div className={styles.label}>Reset Password</div>
              <FormControl variant='outlined'>
                <InputLabel color='secondary'>New Password</InputLabel>
                <OutlinedInput
                  name='password'
                  color='secondary'
                  type={state.showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton onClick={handleClickShowPassword}>
                        {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={108}
                />
                <ErrorMessage name='password'>
                  {(message) => (
                    <span
                      style={{
                        color: 'red',
                        fontSize: '0.6rem',
                        margin: '8px 0',
                      }}
                    >
                      {message}
                    </span>
                  )}
                </ErrorMessage>
              </FormControl>
              <MDBBtn
                type='submit'
                gradient='purple'
                style={{ margin: '20px 0 0 0' }}
              >
                Update Password
              </MDBBtn>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default PasswordResetForm;
