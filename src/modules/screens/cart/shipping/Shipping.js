import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { MDBCol, MDBRow, MDBBtn } from 'mdbreact';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import cogoToast from 'cogo-toast';

import { onPlaceOrder } from '../../../api/cart';

import styles from './Shipping.module.css';

const Shipping = props => {
  const history = useHistory();

  const handlePlaceOrder = async values => {
    const { hide } = cogoToast.loading('Placing the order.', { hideAfter: 0 });
    try {
      const token = props.auth.jwt;
      await onPlaceOrder(values, token);
      hide();
      cogoToast.success('Order placed successfully.');
      history.push('/');
    } catch (error) {
      hide();
      cogoToast.error('Failed to place the order.');
    }
  };

  const shippingSchema = Yup.object().shape({
    address: Yup.string().required('Address is required.'),
    city: Yup.string().required('City is required.'),
    postalCode: Yup.string().required('Postal code is required.')
  });

  return (
    <div className={styles.container}>
      <h2 style={{ textAlign: 'center' }}>Billing</h2>
      <MDBCol>
        <Formik
          initialValues={{
            address: '',
            address1: '',
            city: '',
            postalCode: '',
            paymentMethod: 'Cash On Delivery'
          }}
          onSubmit={values => handlePlaceOrder(values)}
          validationSchema={shippingSchema}
        >
          {() => {
            return (
              <Form>
                <MDBRow>
                  <MDBCol>
                    <label>Address</label>
                    <Field
                      name='address'
                      type='string'
                      className='form-control mb-4'
                      placeholder='14 Main St'
                      required
                    />
                    <label>Address 2 (optional)</label>
                    <Field
                      name='address1'
                      type='string'
                      className='form-control mb-4'
                      placeholder='Apartment or suite'
                    />
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol>
                    <label>City</label>
                    <Field
                      name='city'
                      type='string'
                      className='form-control mb-4'
                      placeholder='City'
                      required
                    />
                  </MDBCol>
                  <MDBCol>
                    <label>Postal Code</label>
                    <Field
                      name='postalCode'
                      type='string'
                      className='form-control mb-4'
                      id='zip'
                      placeholder='Postal Code'
                      required
                    />
                  </MDBCol>
                </MDBRow>
                <hr />
                <div className={styles.checkbox__div}>
                  <Field
                    type='checkbox'
                    className='form-check-input filled-in'
                    id='terms-and-conditions'
                  />
                  <label
                    className='form-check-label'
                    htmlFor='terms-and-conditions'
                  >
                    I accept the terms and conditions
                  </label>
                </div>
                <div className={styles.checkbox__div}>
                  <Field
                    type='checkbox'
                    className='form-check-input filled-in'
                    id='save-info'
                  />
                  <label className='form-check-label' htmlFor='save-info'>
                    Save this information for next time
                  </label>
                </div>
                <hr />
                <MDBBtn type='submit' gradient='purple' size='lg' block>
                  PLACE ORDER
                </MDBBtn>
              </Form>
            );
          }}
        </Formik>
      </MDBCol>
    </div>
  );
};

const mapPropsToState = state => {
  return {
    auth: state.auth.auth
  };
};

export default connect(mapPropsToState)(Shipping);
