import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { TextInput } from '../../../components/index';

const ForgotPasswordForm = (props) => {
  const { open, handleClose, handleForgotPasswordSubmit } = props;

  const forgotPasswordSchema = Yup.object().shape({
    email: Yup.string().required('Email address is required.'),
  });

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Reset password request</DialogTitle>
      <DialogContent style={{ width: '500px' }}>
        <DialogContentText>
          Enter your email adress to request password reset.
        </DialogContentText>
        <Formik
          initialValues={{ email: '' }}
          validationSchema={forgotPasswordSchema}
          onSubmit={handleForgotPasswordSubmit}
        >
          {() => {
            return (
              <Form>
                <TextInput
                  type='email'
                  placeholder='Email address'
                  name='email'
                />
                <DialogActions>
                  <Button type='button' onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button type='submit' color='primary'>
                    Submit
                  </Button>
                </DialogActions>
              </Form>
            );
          }}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPasswordForm;
