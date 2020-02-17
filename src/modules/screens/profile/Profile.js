import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { MDBBtn } from 'mdbreact';

import { useCustomState } from './../../helpers/hooks';
import { OrderHistory } from '../index';
import { Wishlist, User } from '../../components';

import styles from './Profile.module.css';

const Profile = props => {
  const [state, setState] = useCustomState({
    view: null
  });

  useEffect(() => {
    setState({
      view: user
    });
    //eslint-disable-next-line
  }, [])

  const user = <User token={props.auth.jwt} />
  const order = <OrderHistory token={props.auth.jwt} />
  const wishlist = <Wishlist token={props.auth.jwt} />

  const handleRenderer = page => {
    switch (page) {
      case 'order': setState({ view: order }); break;
      case 'wishlist': setState({ view: wishlist }); break;
      case 'profile': setState({ view: user }); break;
      default: setState({ view: user }); break;
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.nav__div}>
        <span>Account Overview</span>
        <MDBBtn type="button" color="black" onClick={() => handleRenderer('profile')}>PROFILE</MDBBtn>
        <MDBBtn type="button" color="black" onClick={() => handleRenderer('order')}>ORDER HISTORY</MDBBtn>
        <MDBBtn type="button" color="black" onClick={() => handleRenderer('wishlist')}>WISHLIST</MDBBtn>
      </div>
      <div className={styles.content__div}>
        {state.view}
      </div>
    </div>
  )
}

const mapPropsToState = state => {
  return {
    auth: state.auth.auth
  }
}

export default connect(mapPropsToState)(Profile);