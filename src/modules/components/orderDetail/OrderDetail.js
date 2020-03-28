import React from 'react';
import { formatDate } from '../../helpers/DateFormatter';

import styles from './OrderDetail.module.css';

const OrderDetail = props => {
  const {
    values: { id, address, city, postalCode, paymentMethod, date, orderItems },
    total,
    itemsQty
  } = props;

  const renderOrderItems = () => {
    let val = '';
    for (let i = 0; i < orderItems.length; i++) {
      if (i === orderItems.length - 1) {
        val += `${orderItems[i].product.name}`;
      } else {
        val += `${orderItems[i].product.name}, `;
      }
    }
    return val;
  };

  const renderOrderDetails = () => {
    return (
      <div className={styles.container}>
        <div className={styles.parent__container}>
          <span>ORDER DETAILS</span>
          <div className={styles.inner__container}>
            <p>ORDER ID</p>
            <span>{id.replace(/-/g, '').toUpperCase()}</span>
          </div>
          <div className={styles.inner__container}>
            <p>NO OF ITEMS</p>
            <span>{itemsQty}</span>
          </div>
          <div className={styles.inner__container}>
            <p>PLACED ON</p>
            <span>{formatDate(date)}</span>
          </div>
          <div className={styles.inner__container}>
            <p>TOTAL</p>
            <span>{total}</span>
          </div>
          <div className={styles.inner__container}>
            <p>PAYMENT METHOD</p>
            <span>{paymentMethod}</span>
          </div>
          <div className={styles.inner__container}>
            <p>ORDER ITEMS</p>
            <span>{renderOrderItems()}</span>
          </div>
        </div>
        <div className={styles.separator} />
        <div className={styles.parent__container}>
          <span>SHIPPING DETAILS</span>
          <div className={styles.inner__container}>
            <p>ADDRESS</p>
            <span>{address}</span>
          </div>
          <div className={styles.inner__container}>
            <p>CITY</p>
            <span>{city}</span>
          </div>
          <div className={styles.inner__container}>
            <p>POSTAL CODE</p>
            <span>{postalCode}</span>
          </div>
        </div>
      </div>
    );
  };

  return renderOrderDetails();

  // return (
  //   <div>
  //     <MDBRow>
  //       <MDBCol>
  //         <div className={styles.column}>
  //           <h5><strong>Order</strong></h5>
  //           {renderText('Order ID', id)}
  //           <div>
  //             {renderText('Number of items', itemsQty)}
  //           </div>
  //           <div>
  //             {renderText('Total', `LKR ${total}.00`)}
  //           </div>
  //           <div>
  //             {renderText('Order placed on', date)}
  //           </div>
  //           <div>
  //             {renderText('Payment method', paymentMethod)}
  //           </div>
  //         </div>
  //       </MDBCol>
  //       <MDBCol>
  //         <div className={styles.column}>
  //           <h5><strong>Shipping</strong></h5>
  //           <div>
  //             {renderText('Address', address)}
  //           </div>
  //           <div>
  //             {renderText('City', city)}
  //           </div>
  //           <div>
  //             {renderText('Postal Code', postalCode)}
  //           </div>
  //         </div>
  //       </MDBCol>
  //     </MDBRow>
  //   </div>
  // )
};

export default OrderDetail;
