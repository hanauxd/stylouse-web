import React, { useEffect } from 'react';
import { OrderItem, Spinner } from '../../components';
import { onFetchOrderHistory } from '../../api/order';
import { useCustomState } from '../../helpers/hooks';

const OrderHistory = props => {
  const styles = {
    display: 'flex',
    flexFlow: 'column',
    padding: '2%'
  };

  const [state, setState] = useCustomState({
    orders: [],
    error: null,
    loading: true
  });

  useEffect(() => {
    fetchOrderHistory();
    //eslint-disable-next-line
  }, []);

  const fetchOrderHistory = async () => {
    try {
      const result = await onFetchOrderHistory(props.token);
      setState({
        loading: false,
        orders: [...result]
      });
    } catch (error) {
      setState({
        loading: false,
        error: error.message
      });
    }
  };

  const renderLoading = () => {
    return <Spinner />;
  };

  const renderError = () => {
    return <h3>{state.error}</h3>;
  };

  const renderOrderItems = () => {
    const orderItems = state.orders.map(item => (
      <OrderItem key={item.id} order={item} />
    ));
    return (
      <div style={styles}>
        <span
          style={{ fontSize: 'larger', textAlign: 'center', display: 'block' }}
        >
          Order History
        </span>
        <hr style={{ width: '100%', marginBottom: '0' }} />
        <div>{orderItems}</div>
      </div>
    );
  };

  return state.loading
    ? renderLoading()
    : state.error
    ? renderError()
    : renderOrderItems();
};

export default OrderHistory;
