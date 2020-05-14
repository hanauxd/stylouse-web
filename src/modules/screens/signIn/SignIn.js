import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import cogoToast from 'cogo-toast';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { TextInput, CustomButton } from './../../components';
import { onSignIn } from '../../api/auth';
import { authSuccess } from './../../store/actions/auth';

import styles from './SignIn.module.css';

const SignIn = (props) => {
  const history = useHistory();

  const handleSignIn = async (values) => {
    const { hide } = cogoToast.loading('Signing in');
    try {
      const { username, password } = values;
      const result = await onSignIn({ username, password });
      const data = result.data;
      localStorage.setItem('auth', JSON.stringify(data));
      props.onSuccess({ ...data });
      if (result.status === 200) {
        hide();
        history.push('/');
      }
    } catch (error) {
      hide();
      const errorMessage = JSON.parse(error.request.response);
      cogoToast.error(errorMessage.message);
    }
  };

  const signInSchema = Yup.object().shape({
    username: Yup.string()
      .email('Invalid email.')
      .required('Email is required.'),
    password: Yup.string().required('Password is required.'),
  });

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={handleSignIn}
      validationSchema={signInSchema}
    >
      {() => {
        return (
          <div className={styles.container}>
            <div>
              <span>SIGN IN</span>
            </div>
            <Form>
              <label>Email</label>
              <TextInput
                name='username'
                type='email'
                placeholder='someone@gmail.com'
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
                <CustomButton gradient='purple' type='submit' text='SIGN IN' />
              </div>
            </Form>
          </div>
        );
      }}
    </Formik>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
