import React, { useEffect } from 'react';
import { MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';

import styles from './User.module.css';
import { useCustomState } from '../../helpers/hooks';
import { onViewProfile } from './../../api/user';
import { Spinner } from '..';
import { useHistory } from 'react-router-dom';

const User = (props) => {
  const history = useHistory();

  const {
    token,
    token: { jwt },
  } = props;

  const [state, setState] = useCustomState({
    loading: true,
    error: null,
    user: null,
  });

  useEffect(() => {
    fetchUser();
    //eslint-disable-next-line
  }, []);

  const fetchUser = async () => {
    try {
      const result = await onViewProfile(jwt);
      setState({
        loading: false,
        user: { ...result },
      });
    } catch (error) {
      setState({
        loading: false,
        error: error.message,
      });
    }
  };

  const renderLoading = () => {
    return <Spinner />;
  };

  const renderError = () => {
    return <h5>{state.error}</h5>;
  };

  const handleChangePasswordClick = () => {
    history.push('/reset-password', { ...token });
  };

  const renderUser = () => {
    return (
      <div className={styles.container}>
        <span>User Details</span>
        <hr />
        <MDBRow>
          <MDBCol>
            <MDBInput
              label='First Name'
              type='text'
              hint={state.user.firstName}
              className='form-control mb-4'
            />
          </MDBCol>
          <MDBCol>
            <MDBInput
              label='Last Name'
              type='text'
              hint={state.user.lastName}
              className='form-control mb-4'
            />
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol>
            <MDBInput
              label='Phone'
              type='text'
              hint={state.user.phone}
              className='form-control mb-4'
            />
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol>
            <MDBInput
              disabled
              label='Email Address'
              type='email'
              hint={state.user.email}
              className='form-control mb-4'
            />
          </MDBCol>
        </MDBRow>
        <MDBBtn outline color='purple' onClick={handleChangePasswordClick}>
          Change Password
        </MDBBtn>
      </div>
    );
  };

  return state.loading
    ? renderLoading()
    : state.error
    ? renderError()
    : renderUser();
};

export default User;
