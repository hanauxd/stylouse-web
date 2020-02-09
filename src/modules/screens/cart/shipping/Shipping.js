import React from "react";
import { MDBCol, MDBRow, MDBCard, MDBBtn } from "mdbreact";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { onPlaceOrder } from "../../../api/cart";
import { useHistory } from "react-router-dom";

import styles from './Shipping.module.css';

const Shipping = () => {
  const history = useHistory();

  const handlePlaceOrder = async values => {
    const { address, city, postalCode, paymentMethod } = values;
    console.log('PLACE VALUES', values)
    const result = await onPlaceOrder({ address, city, postalCode, paymentMethod })
    console.log(result)
    history.push('/');
  }

  const shippingSchema = Yup.object().shape({
    address: Yup.string().required("Address is required."),
    city: Yup.string().required("City is required."),
    postalCode: Yup.string().required("Postal code is required."),
  })

  return (
    <MDBCard className={styles.container}>
      <h2 style={{ textAlign: 'center' }}>Billing</h2>
      <MDBCol >
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
        >{
            () => {
              return (
                <Form>
                  <MDBRow>
                    <MDBCol>
                      <label>Address</label>
                      <Field name="address" type="string" className="form-control mb-4" placeholder="14 Main St" required />
                      <label>Address 2 (optional)</label>
                      <Field name='address1' type="string" className="form-control mb-4" placeholder="Apartment or suite" />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol>
                      <label >City</label>
                      <Field name="city" type="string" className="form-control mb-4" placeholder="City" required />
                    </MDBCol>
                    <MDBCol >
                      <label >Postal Code</label>
                      <Field name="postalCode" type="string" className="form-control mb-4" id="zip" placeholder="Postal Code" required />
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <div className={styles.checkbox__div}>
                    <Field type="checkbox" className="form-check-input filled-in" id="terms-and-conditions" />
                    <label className="form-check-label" htmlFor="terms-and-conditions">I accept the terms and conditions</label>
                  </div>
                  <div className={styles.checkbox__div}>
                    <Field type="checkbox" className="form-check-input filled-in" id="save-info" />
                    <label className="form-check-label" htmlFor="save-info">Save this information for next time</label>
                  </div>
                  <hr />
                  <MDBBtn type="submit" color='elegant' size="lg" block>PLACE ORDER</MDBBtn>
                </Form>
              )
            }
          }
        </Formik>
      </MDBCol>
    </MDBCard >
  );
}

export default Shipping;