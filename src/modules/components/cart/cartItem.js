import React from 'react';
import { MDBBtn } from 'mdbreact';

import { onRemoveCart } from '../../api/cart';

import styles from './CartItem.module.css';

const CartItem = props => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'LKR'
  })
  const { cart: { id, product, quantity, size } } = props;
  const { name, price } = product;

  const handleRemove = async () => {
    try {
      await onRemoveCart(id);
      props.onRemoveCart(id)
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className={styles.outter__container}>
      <div className={styles.inner__container}>
        <div className={styles.image__container}>
          <img alt='' src={`http://localhost:8080/product/images/download/${product.productImages[0].filename}`} />
        </div>
        <div className={styles.properties__container}>
          <div><h4>{name.toUpperCase()}</h4></div>
          <div>{formatter.format(price)}</div>
          <div>SIZE: {size}</div>
          <div>QUANTITY: {quantity}</div>
        </div>
        <div>
          <MDBBtn onClick={handleRemove} color='danger' size='md'>REMOVE</MDBBtn>
          <MDBBtn size='md'>UPDATE</MDBBtn>
        </div>
      </div>
    </div>
  )
}

export default CartItem;