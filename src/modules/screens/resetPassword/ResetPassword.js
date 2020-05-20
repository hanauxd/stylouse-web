import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import cogoToast from 'cogo-toast';

import { onResetPassword } from '../../api/auth';
import { ResetPasswordForm } from '..';
import { authSuccess } from '../../store/actions/auth';

import styles from './ResetPassword.module.css';

const ResetPassword = (props) => {
  const history = useHistory();

  const {
    location: { state },
  } = history;

  const handlePasswordSubmit = async (values) => {
    try {
      const token = state.jwt;
      const authRequest = {
        username: state.userId,
        password: values.password,
      };
      const result = await onResetPassword(token, authRequest);
      localStorage.setItem('auth', JSON.stringify(result.data));
      props.onSuccess({ ...result.data });
      history.push('/');
    } catch (error) {
      if (error.request) {
        const message = JSON.parse(error.request.response).message;
        cogoToast.error(message);
      }
    }
  };

  return (
    <div className={styles.container}>
      <ResetPasswordForm onPasswordSubmit={handlePasswordSubmit} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
