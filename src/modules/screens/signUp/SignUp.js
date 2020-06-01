import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import cogoToast from 'cogo-toast';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { TextInput, CustomButton } from './../../components';
import { onSignUp } from './../../api/auth';
import { authSuccess } from '../../store/actions/auth';

import styles from './SignUp.module.css';

const SignUp = (props) => {
  const history = useHistory();

  const handleSignUp = async (values) => {
    const { hide } = cogoToast.loading('Signing up');
    try {
      const { firstName, lastName, phone, email, password } = values;
      const result = await onSignUp({
        firstName,
        lastName,
        phone,
        email,
        password,
        role: 'ROLE_USER',
      });
      const data = result.data;
      localStorage.setItem('auth', JSON.stringify(data));
      props.onSuccess({ ...data });
      hide();
      history.push('/');
    } catch (error) {
      hide();
      const errorMessage = JSON.parse(error.request.response);
      cogoToast.error(errorMessage.message);
    }
  };

  const SignUpSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required.'),
    lastName: Yup.string().required('Last name is required.'),
    phone: Yup.number()
      .positive()
      .integer()
      .required('Phone is required.'),
    email: Yup.string()
      .email('Invalid email address.')
      .required('Email is required.'),
    password: Yup.string()
      .required('Password is required.')
      .min(4, 'Password should be minimum 4 characters.')
      .max(15, 'Password should be maximum 15 characters.'),
  });

  return (
    <div>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          phone: '',
          email: '',
          password: '',
        }}
        onSubmit={handleSignUp}
        validationSchema={SignUpSchema}
      >
        {() => {
          return (
            <div className={styles.container}>
              <div>
                <span>SIGN UP</span>
              </div>
              <Form>
                <label>First Name</label>
                <TextInput
                  name='firstName'
                  type='string'
                  placeholder='Enter first name'
                  required
                />
                <label>Last Name</label>
                <TextInput
                  name='lastName'
                  type='string'
                  placeholder='Enter last name'
                  required
                />
                <label>Phone</label>
                <TextInput
                  name='phone'
                  type='number'
                  placeholder='Enter contact number'
                  required
                />
                <label>Email</label>
                <TextInput
                  name='email'
                  type='email'
                  placeholder='Enter email address'
                  required
                />
                <label>Password</label>
                <TextInput
                  name='password'
                  type='password'
                  placeholder='Enter password'
                  required
                />
                <div className={styles.button}>
                  <CustomButton
                    gradient='purple'
                    type='submit'
                    text='SIGN UP'
                  />
                </div>
              </Form>
            </div>
          );
        }}
      </Formik>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSuccess: (authData) => {
      dispatch(authSuccess(authData));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
