import React, { useEffect } from 'react';
import { MDBBtn, MDBModal, MDBModalHeader, MDBModalBody } from 'mdbreact';

import { useCustomState } from '../../helpers/hooks';
import { formatDate } from '../../helpers/DateFormatter';
import { OrderDetail } from '../index';

import styles from './OrderItem.module.css';

const OrderItem = props => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'LKR'
  });

  const {
    order: { date, orderItems }
  } = props;

  const [state, setState] = useCustomState({
    modal: false,
    total: 0,
    itemsQty: 0
  });

  useEffect(() => {
    let sum = 0;
    let qty = 0;
    orderItems.forEach(value => {
      sum += value.quantity * value.product.price;
      qty += value.quantity;
    });
    setState({
      total: sum,
      itemsQty: qty
    });
    //eslint-disable-next-line
  }, []);

  const toggle = () => {
    setState({
      modal: !state.modal
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.date__container}>
        <p>DATE</p>
        <span>{formatDate(date)}</span>
      </div>
      <div className={styles.separator} />
      <div className={styles.inner__container}>
        <p>STATUS</p>
        <span>CONFIRMED</span>
      </div>
      <div className={styles.separator} />
      <div className={styles.inner__container}>
        <p>TOTAL</p>
        <span>{formatter.format(state.total)}</span>
      </div>
      <div className={styles.inner__container}>
        <MDBBtn onClick={toggle} style={{ margin: '0' }} gradient='purple'>
          VIEW
        </MDBBtn>

        <MDBModal isOpen={state.modal} toggle={toggle} centered size='lg'>
          <MDBModalHeader style={{ color: 'purple' }} toggle={toggle}>
            ORDER DETAILS
          </MDBModalHeader>
          <MDBModalBody>
            <OrderDetail
              values={props.order}
              total={state.total}
              itemsQty={state.itemsQty}
            />
          </MDBModalBody>
        </MDBModal>
      </div>
    </div>
  );
};

export default OrderItem;
