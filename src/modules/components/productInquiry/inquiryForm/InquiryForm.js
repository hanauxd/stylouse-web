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

import { TextInput } from '../..';

const InquiryForm = (props) => {
  const { handleClose, handleInquirySubmit, open } = props;

  const initialValues = {
    inquiry: '',
  };

  const inquirySchema = Yup.object().shape({
    inquiry: Yup.string().required('Inquiry is required.'),
  });

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='form-dialog-title'
    >
      <DialogTitle id='form-dialog-title'>Have a question?</DialogTitle>
      <DialogContent style={{ width: '500px' }}>
        <DialogContentText>
          Submit your question, we will get back to you as soon as possible.
        </DialogContentText>

        <Formik
          initialValues={initialValues}
          validationSchema={inquirySchema}
          onSubmit={handleInquirySubmit}
        >
          {() => {
            return (
              <Form>
                <TextInput
                  type='string'
                  placeholder='Write your question'
                  name='inquiry'
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

export default InquiryForm;
