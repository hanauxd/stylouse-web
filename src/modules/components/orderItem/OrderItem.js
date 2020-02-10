import React, { useEffect } from 'react';
import { MDBBtn, MDBModal, MDBModalHeader, MDBModalBody } from 'mdbreact';

import { useCustomState } from '../../helpers/hooks';

import styles from './OrderItem.module.css';
import { OrderDetail } from '../index';

const OrderItem = props => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'LKR'
  })

  const { order: { date, orderItems } } = props;

  const [state, setState] = useCustomState({
    modal: false,
    total: 0,
    itemsQty: 0
  })

  useEffect(() => {
    let sum = 0;
    let qty = 0;
    orderItems.forEach(value => {
      sum += value.quantity * value.product.price;
      qty += value.quantity;
    })
    setState({
      total: sum,
      itemsQty: qty
    })
    //eslint-disable-next-line
  }, [])

  console.log(props.order)

  const toggle = () => {
    setState({
      modal: !state.modal
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.inner__container}>
        <span className={styles.tag}>CONFIRMED</span>
        <span>Number of Items: <strong>{state.itemsQty}</strong></span>
        <span>Date: <strong>{date}</strong></span>
      </div>
      <div className={styles.inner__container}>
        <span>Total:</span>
        <span><h5><strong>
          {formatter.format(state.total)}
        </strong></h5></span>
        <MDBBtn onClick={toggle} style={{ margin: '0' }} color="black" size='sm'>VIEW</MDBBtn>

        {/* <MDBModal isOpen={state.modal} toggle={toggle} fullHeight position='top'> */}
        <MDBModal isOpen={state.modal} toggle={toggle} centered size='lg'>
          <MDBModalHeader toggle={toggle}>ORDER DETAILS</MDBModalHeader>
          <MDBModalBody >
            <OrderDetail values={props.order} total={state.total} itemsQty={state.itemsQty} />
          </MDBModalBody>
        </MDBModal>

      </div>
    </div>
  )
}

export default OrderItem;