import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { onGetCartItems } from '../../api/cart';
import { useCustomState } from '../../helpers/hooks';
import { CartItem, Spinner } from '../../components';

import styles from './Cart.module.css';
import { useHistory } from 'react-router-dom';
import { onRemoveCart } from './../../api/cart';
import { MDBBtn, MDBIcon } from 'mdbreact';

const Cart = props => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'LKR'
  });

  const [state, setState] = useCustomState({
    loading: true,
    error: null,
    carts: [
      {
        id: '',
        product: {},
        quantity: 0,
        size: '',
        totalPrice: 0
      }
    ],
    cartTotal: 0
  });

  useEffect(() => {
    loadCartItems();
    //eslint-disable-next-line
  }, []);

  const handleRemoveCart = async id => {
    try {
      await onRemoveCart(id, props.auth.jwt);
      const newCarts = state.carts.filter(value => {
        return value.id !== id;
      });
      setState({
        carts: [...newCarts]
      });
      renderCartTotal(newCarts);
    } catch (error) {
      console.log(error.message);
    }
  };

  const renderCartTotal = result => {
    let tot = 0;
    for (let i = 0; i < result.length; i++) {
      tot = tot + result[i].totalPrice;
    }
    setState({
      cartTotal: tot
    });
  };

  const loadCartItems = async () => {
    try {
      setState({
        loading: true,
        error: null
      });
      const token = props.auth.jwt;
      const result = await onGetCartItems(token);
      setState({
        loading: false,
        carts: [...result]
      });
      renderCartTotal(result);
    } catch (error) {
      console.log(error);
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
    return <div>{state.error}</div>;
  };

  const renderCartItem = cart => {
    return (
      <CartItem key={cart.id} cart={cart} onRemoveCart={handleRemoveCart} />
    );
  };

  const cartItems = state.carts.map(cart => renderCartItem(cart));

  const history = useHistory();

  const handleCheckOut = () => {
    history.push('/checkout');
  };

  const renderCartItems = () => {
    return (
      <div className={styles.container}>
        <div className={styles.items__div}>{cartItems}</div>
        <div className={styles.separator} />
        <div className={styles.cart__div}>
          <div className={styles.cart__inner__div}>
            <h2>ORDER SUMMARY</h2>
            <div>
              <div>
                <h5>SUB-TOTAL</h5>
                <h5>DISCOUNT</h5>
                <h5>SHIPPING</h5>
                <br />
                <h2>TOTAL</h2>
              </div>
              <div>
                <h5>{formatter.format(state.cartTotal)}</h5>
                <h5>LKR 0.00</h5>
                <h5>*TBC</h5>
                <br />
                <h2>{formatter.format(state.cartTotal)}</h2>
              </div>
            </div>
            <MDBBtn gradient='purple' onClick={handleCheckOut}>
              CHECK OUT
            </MDBBtn>
          </div>
        </div>
      </div>
    );
  };

  return state.loading ? (
    renderLoading()
  ) : state.error ? (
    renderError()
  ) : state.carts.length === 0 ? (
    <div className={styles.empty__div}>
      <MDBIcon size='2x' icon='shopping-cart' className='purple-text' />
      <span>CART IS EMPTY</span>
    </div>
  ) : (
    renderCartItems()
  );
};

const mapPropsToState = state => {
  return {
    auth: state.auth.auth
  };
};

export default connect(mapPropsToState)(Cart);
