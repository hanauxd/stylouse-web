import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { TextInput, CustomButton } from './../../components';
import { onSignUp } from './../../api/auth';

const SignUp = props => {
  const handleSignUp = async values => {
    try {
      const { firstName, lastName, phone, email, password } = values;
      const result = await onSignUp({ firstName, lastName, phone, email, password, role: 'ROLE_ADMIN' });
      console.log(result);
    } catch (error) {
      console.log(error.message);
    }
  }

  return <div>
    <Formik
      initialValues={{ firstName: '', lastName: '', phone: '', email: '', password: '' }}
      onSubmit={handleSignUp}
      validationSchema={
        Yup.object().shape({
          firstName: Yup.string().required('First name is required.'),
          lastName: Yup.string().required('Last name is required.'),
          phone: Yup.string().required('Phone is required.'),
          email: Yup.string().email('Invalid email address.').required('Email is required.'),
          password: Yup.string().required('Password is required.').min(6, 'Password should be minimum 6 characters.').max(15, 'Password should be maximum 15 characters.')
        })
      }
    >
      {
        () => {
          return (
            <Form>
              <TextInput name='firstName' type='string' placeholder='Enter first name' />
              <TextInput name='lastName' type='string' placeholder='Enter last name' />
              <TextInput name='phone' type='string' placeholder='Enter contact number' />
              <TextInput name='email' type='email' placeholder='Enter email address' />
              <TextInput name='password' type='password' placeholder='Enter password' />
              <CustomButton type='submit' text='SIGN UP' />
            </Form>
          )
        }
      }
    </Formik>
  </div>
}

export default SignUp;