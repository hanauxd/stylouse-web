import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { TextInput, CustomButton } from './../../components';
import { onSignIn } from '../../api/auth';
import { authSuccess } from './../../store/actions/auth';
import { useHistory } from 'react-router-dom';

import styles from './SignIn.module.css';

const SignIn = props => {
  const history = useHistory();
  const handleSignIn = async values => {
    try {
      const { username, password } = values;
      const result = await onSignIn({ username, password });
      props.onSuccess(result)
      localStorage.setItem('jwt', result.data.jwt);
      localStorage.setItem('userId', result.data.userId);
      localStorage.setItem('tokenValidation', result.data.tokenValidation)
      if (result.status === 200) {
        history.push('/');
      }
    } catch (error) {
      if (error.response.status === 403 || error.response.status === 404) {
        alert("Invalid username or password.")
      }
    }
  }

  const SignInSchema = Yup.object().shape({
    username: Yup
      .string()
      .email('Invalid email.')
      .required('Email is required.'),
    password: Yup
      .string()
      .required('Password is required.')
  });

  return (
    <Formik
      initialValues={{ username: 'admin@test.com', password: 'pass' }}
      onSubmit={handleSignIn}
      validationSchema={SignInSchema} >
      {
        () => {
          return (
            <div className={styles.container}>
              <div>
                <span>SIGN IN</span>
              </div>
              <Form>
                <label>Email</label>
                <TextInput name="username" type="email" placeholder="someone@gmail.com" required />
                <label>Password</label>
                <TextInput name="password" type="password" placeholder="Enter password" required />
                <CustomButton color="elegant" type="submit" text='SIGN IN' />
              </Form>
            </div>
          )
        }
      }
    </Formik>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.auth.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSuccess: authData => {
      dispatch(authSuccess(authData));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);