import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { TextField } from '@material-ui/core';
import { MDBBtn } from 'mdbreact';
import { Form, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import cogoToast from 'cogo-toast';

import {
  onResetPasswordConfirmed,
  onRequestPasswordReset,
} from '../../../api/auth';
import { useCustomState } from '../../../helpers/hooks';

import styles from './ConfirmResetPassword.module.css';

const ConfirmResetPassword = (props) => {
  const history = useHistory();
  const {
    location: { state: historyState },
  } = history;

  const [state, setState] = useCustomState({
    loading: false,
  });

  useEffect(() => {
    if (typeof historyState === 'undefined') {
      history.push('/');
    }
    //eslint-disable-next-line
  }, []);

  const handleSubmit = async (values) => {
    try {
      setState({
        loading: true,
      });
      const token = {
        username: historyState.email,
        password: values.otp,
      };
      const result = await onResetPasswordConfirmed(token);
      history.push('/reset-password', { ...result.data });
    } catch (error) {
      setState({
        loading: false,
      });
      if (error.request.response) {
        const message = JSON.parse(error.request.response).message;
        cogoToast.error(message);
      } else {
        cogoToast.error(error.message);
      }
    }
  };

  const handleResendOTP = async () => {
    try {
      setState({
        loading: true,
      });
      await onRequestPasswordReset(historyState.email);
      setState({ loading: false });
      cogoToast.success('New OTP sent successfully');
    } catch (error) {
      setState({
        loading: false,
      });
      if (error.request.response) {
        const message = JSON.parse(error.request.response).message;
        cogoToast.error(message);
      } else {
        cogoToast.error(error.message);
      }
    }
  };

  const otpSchema = Yup.object().shape({
    otp: Yup.string()
      .matches(/^[0-9]{6}$/, 'OTP should be 6 digits')
      .required('OTP is required'),
  });

  return (
    <Formik
      initialValues={{ otp: '' }}
      validationSchema={otpSchema}
      onSubmit={handleSubmit}
    >
      {({ values, handleChange, handleBlur }) => {
        return (
          <Form>
            <div className={styles.container}>
              <div className={styles.text_one__div}>
                Please enter the OTP to varify your account
              </div>
              <div className={styles.text_two__div}>
                {`An OTP has been sent to ${historyState &&
                  historyState.email}`}
              </div>
              <div className={styles.input__div}>
                <TextField
                  label='OTP'
                  variant='outlined'
                  color='secondary'
                  name='otp'
                  type='string'
                  value={values.otp}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ErrorMessage name='otp'>
                  {(message) => (
                    <div className={styles.error__div}>{message}</div>
                  )}
                </ErrorMessage>
              </div>
              <div className={styles.button__div}>
                <MDBBtn
                  type='submit'
                  gradient='purple'
                  disabled={state.loading ? true : false}
                >
                  Validate OTP
                </MDBBtn>
                <div
                  className={styles.resendOTP__button}
                  disabled={state.loading ? true : false}
                  onClick={handleResendOTP}
                >
                  Resend OTP
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ConfirmResetPassword;
