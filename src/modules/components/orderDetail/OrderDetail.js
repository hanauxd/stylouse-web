import React from 'react';

import styles from './OrderDetail.module.css';
import { MDBRow, MDBCol } from 'mdbreact';

const OrderDetail = props => {
  const { values: { id, address, city, postalCode, paymentMethod, date }, total, itemsQty } = props;

  const renderText = (label, value) => {
    return (
      <div>
        {label}: <strong>{value}</strong>
      </div>
    )
  }

  return (
    <div>
      <MDBRow>
        <MDBCol>
          <div className={styles.column}>
            <h5><strong>Order</strong></h5>
            {renderText('Order ID', id)}
            <div>
              {renderText('Number of items', itemsQty)}
            </div>
            <div>
              {renderText('Total', `LKR ${total}.00`)}
            </div>
            <div>
              {renderText('Order placed on', date)}
            </div>
            <div>
              {renderText('Payment method', paymentMethod)}
            </div>
          </div>
        </MDBCol>
        <MDBCol>
          <div className={styles.column}>
            <h5><strong>Shipping</strong></h5>
            <div>
              {renderText('Address', address)}
            </div>
            <div>
              {renderText('City', city)}
            </div>
            <div>
              {renderText('Postal Code', postalCode)}
            </div>
          </div>
        </MDBCol>
      </MDBRow>
    </div>
  )
}

export default OrderDetail;