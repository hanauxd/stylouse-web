import React, { useEffect } from 'react';
import { OrderItem } from '../../components';
import { onFetchOrderHistory } from '../../api/order';
import { useCustomState } from '../../helpers/hooks';

const OrderHistory = props => {
  const styles = {
    display: 'flex',
    flexFlow: 'column',
    overflowY: 'scroll',
    height: '50vh',
    margin: '2%'
  }

  const [state, setState] = useCustomState({
    orders: [],
    error: null,
    loading: true
  })

  useEffect(() => {
    fetchOrderHistory();
    //eslint-disable-next-line
  }, []);

  const fetchOrderHistory = async () => {
    try {
      const result = await onFetchOrderHistory();
      setState({
        loading: false,
        orders: [...result]
      })
    } catch (error) {
      setState({
        loading: false,
        error: error.message
      })
    }
  }

  const renderLoading = () => {
    return <h3>Loading...</h3>
  }

  const renderError = () => {
    return <h3>{state.error}</h3>
  }

  const renderOrderItems = () => {
    const orderItems = state.orders.map(item => (
      <OrderItem key={item.id} order={item} />
    ))
    return (
      <div style={styles}>
        <div>{orderItems}</div>
      </div>
    )
  }

  return state.loading ? renderLoading() : state.error ? renderError() : renderOrderItems();
}

export default OrderHistory;