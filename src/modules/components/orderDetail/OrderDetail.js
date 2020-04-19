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
};

export default OrderDetail;
