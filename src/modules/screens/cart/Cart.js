import React, { useEffect } from 'react';

import { onGetCartItems } from '../../api/cart';
import { useCustomState } from '../../helpers/hooks';
import { CartItem } from '../../components';

import styles from './Cart.module.css';
import { useHistory } from 'react-router-dom';

const Cart = props => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'LKR'
  })

  const [state, setState] = useCustomState({
    loading: true,
    error: null,
    carts: [{
      id: '',
      product: {},
      quantity: 0,
      size: '',
      totalPrice: 0,
    }],
    cartTotal: 0
  })

  useEffect(() => {
    loadCartItems();
    //eslint-disable-next-line
  }, [])

  const handleRemoveCart = id => {
    const newCarts = state.carts.filter((value) => {
      return value.id !== id;
    })
    setState({
      carts: [...newCarts],
    })
    renderCartTotal(newCarts)
  }

  const renderCartTotal = result => {
    let tot = 0;
    for (let i = 0; i < result.length; i++) {
      tot = tot + result[i].totalPrice;
    }
    setState({
      cartTotal: tot
    })
  }

  const loadCartItems = async () => {
    try {
      setState({
        loading: true,
        error: null,
      })
      const result = await onGetCartItems();
      setState({
        loading: false,
        carts: [...result]
      })
      renderCartTotal(result);
    } catch (error) {
      console.log(error);
      setState({
        loading: false,
        error: error.message,
      })
    }
  }

  const renderLoading = () => {
    return <div>Loading...</div>
  }

  const renderError = () => {
    return <div>{state.error}</div>
  }

  const renderCartItem = cart => {
    return <CartItem key={cart.id} cart={cart} onRemoveCart={handleRemoveCart} />
  }

  const cartItems = state.carts.map(cart => renderCartItem(cart));

  const history = useHistory();

  const handleCheckOut = () => {
    history.push('/checkout')
  }

  const renderCartItems = () => {
    return (
      <div className={styles.container}>
        <div className={styles.items__div}>
          {cartItems}
        </div>
        <div className={styles.cart__div}>
          <div className={styles.cart__inner__div}>
            <h2>ORDER SUMMARY</h2>
            <hr />
            <div>
              <div>
                <h4>Sub Total</h4>
                <h5>Discount</h5>
                <h5>Shipping</h5><br />
                <h2>Total</h2>
              </div>
              <div>
                <h4>{formatter.format(state.cartTotal)}</h4>
                <h5>LKR 0.00</h5>
                <h5>*TBC</h5><br />
                <h2>{formatter.format(state.cartTotal)}</h2>
              </div>
            </div>
            <button onClick={handleCheckOut}>CHECK OUT</button>
          </div>
        </div>
      </div>
    )
  }

  return state.loading ? renderLoading()
    : state.error ? renderError()
      : state.carts.length === 0 ? <h1>CART IS EMPTY</h1>
        : renderCartItems();
}

export default Cart;