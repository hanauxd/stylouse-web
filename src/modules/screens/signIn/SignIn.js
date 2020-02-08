import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { TextInput, CustomButton } from './../../components';
import { onSignIn } from '../../api/auth';
import { authSuccess } from './../../store/actions/auth';
import { useHistory } from 'react-router-dom';

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
      console.log(result)
      if (result.status === 200) {
        history.push('/');
      }
    } catch (error) {
      console.log(error.message);
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

  return <div>
    <Formik
      initialValues={{ username: 'admin@test.com', password: 'pass' }}
      onSubmit={handleSignIn}
      validationSchema={SignInSchema} >
      {
        () => {
          return (
            <Form>
              <TextInput name="username" type="email" placeholder="someone@gmail.com" />
              <TextInput name="password" type="password" placeholder="Enter password" />
              <CustomButton type="submit" text='SIGN IN' />
            </Form>
          )
        }
      }
    </Formik>
  </div>
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