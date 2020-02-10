import React, { useEffect } from 'react';
import { MDBCol, MDBInput, MDBRow, MDBBtn } from 'mdbreact';
import { useCustomState } from './../../helpers/hooks';

import { onViewProfile } from '../../api/user';

import styles from './Profile.module.css';
import { OrderHistory } from '../index';
import { Wishlist } from '../../components';

const Profile = props => {
  useEffect(() => {
    handleViewProfile()
    //eslint-disable-next-line
  }, []);

  const [state, setState] = useCustomState({
    loading: true,
    error: null,
    view: null,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  })

  const handleViewProfile = async () => {
    try {
      const result = await onViewProfile();
      console.log(result)
      setState({
        loading: false,
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
        phone: result.phone,
        view: profile
      })
    } catch (error) {
      console.log(error)
      setState({
        loading: false,
        error: error.message
      })
    }
  }

  const profile = (
    <div className={styles.profile__div}>
      <span>User Details</span>
      <hr />
      <MDBRow>
        <MDBCol>
          <MDBInput label="First Name" type="text" hint={state.firstName} className="form-control mb-4" />
        </MDBCol>
        <MDBCol>
          <MDBInput label="Last Name" type="text" hint={state.lastName} className="form-control mb-4" />
        </MDBCol>
      </MDBRow>
      <MDBRow>
        <MDBCol>
          <MDBInput label="Phone" type="text" hint={state.phone} className="form-control mb-4" />
        </MDBCol>
      </MDBRow>
      <MDBRow>
        <MDBCol>
          <MDBInput disabled label="Email Address" type="email" hint={state.email} className="form-control mb-4" />
        </MDBCol>
      </MDBRow>
    </div>
  )

  const order = <OrderHistory />

  const wishlist = <Wishlist />

  const handleRenderer = value => {
    switch (value) {
      case 'order': setState({ view: order }); break;
      case 'wishlist': setState({ view: wishlist }); break;
      case 'profile': setState({ view: profile }); break;
      default: setState({ view: profile }); break;
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

export default Profile;