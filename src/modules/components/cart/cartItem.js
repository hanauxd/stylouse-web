import React from 'react';
import { MDBBtn } from 'mdbreact';

import { getProductImageUrl } from '../../helpers/ProductHelper';

import styles from './CartItem.module.css';

const CartItem = props => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'LKR'
  });

  const {
    cart: { id, product, quantity, size }
  } = props;
  const { name, price } = product;

  const handleRemoveCart = () => {
    props.onRemoveCart(id);
  };

  return (
    <div className={styles.outter__container}>
      <div className={styles.inner__container}>
        <div className={styles.image__container}>
          <img
            alt=''
            src={getProductImageUrl(product.productImages[0].filename)}
          />
        </div>
        <div className={styles.properties__container}>
          <div>
            <h4>{name.toUpperCase()}</h4>
          </div>
          <div>{formatter.format(price)}</div>
          <div>SIZE: {size}</div>
          <div>QUANTITY: {quantity}</div>
        </div>
        <div className={styles.button__container}>
          <MDBBtn onClick={handleRemoveCart} gradient='purple' size='md'>
            REMOVE
          </MDBBtn>
          <MDBBtn outline color='purple' size='md'>
            UPDATE
          </MDBBtn>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
