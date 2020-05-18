import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button } from '@material-ui/core';
import SendRoundedIcon from '@material-ui/icons/SendRounded';

import { TextInput } from '../../..';

const ReplyForm = (props) => {
  const { onReplySubmit } = props;

  const initialValues = {
    reply: '',
  };

  const replySchema = Yup.object().shape({
    reply: Yup.string().required('Reply is required'),
  });

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={replySchema}
        onSubmit={onReplySubmit}
      >
        {() => {
          return (
            <Form
              style={{
                display: 'flex',
                padding: '20px',
              }}
            >
              <div style={{ width: '100%' }}>
                <TextInput
                  type='string'
                  placeholder='Write your reply'
                  name='reply'
                />
              </div>
              <div style={{ marginLeft: '10px' }}>
                <Button
                  type='submit'
                  variant='outlined'
                  endIcon={<SendRoundedIcon />}
                >
                  Send
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default ReplyForm;
