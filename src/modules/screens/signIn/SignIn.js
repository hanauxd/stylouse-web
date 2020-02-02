import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { TextInput, CustomButton } from './../../components';
import { onSignIn } from '../../api/auth';

const SignIn = props => {
  const handleSignIn = async values => {
    try {
      const { username, password } = values;
      const result = await onSignIn({ username, password });
      console.log(result);
    } catch (error) {
      console.log(error.message);
    }
  }

  return <div>
    <Formik
      initialValues={{ username: 'admin@test.com', password: 'pass' }}
      onSubmit={handleSignIn}
      validationSchema={
        Yup.object().shape({
          username: Yup.string().email('Invalid email.').required('Email is required.'),
          password: Yup.string().required('Password is required.').min(4, 'Password should be minimum 4 characters.').max(15, 'Password should be maximum 15 characters.')
        })} >
      {
        () => {
          return (
            <Form>
              <TextInput name="username" type="text" placeholder="someone@gmail.com" />
              <TextInput name="password" type="password" placeholder="Enter password" />
              <CustomButton type="submit" text='SIGN IN' />
            </Form>
          )
        }
      }
    </Formik>
  </div>
}

export default SignIn;