import React, { useEffect } from 'react';
import { onGetCartItems } from '../../api/cart';
import { useCustomState } from '../../helpers/hooks';

const Cart = props => {
  const [state, setState] = useCustomState({
    loading: true,
    error: null,
    carts: [{
      id: '',
      product: {},
      quantity: 0,
      size: '',
      totalPrice: 0,
    }]
  })

  useEffect(() => {
    loadCartItems();
    //eslint-disable-next-line
  }, [])

  const loadCartItems = async () => {
    try {
      setState({
        loading: true,
        error: null,
      })
      const cartItems = await onGetCartItems();
      console.log(cartItems)
      setState({
        loading: false,
        carts: [...cartItems]
      })
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

  const renderCartItems = () => {
    console.log(state.carts) //TODO create cart item
    return <div>CART ITEMS</div>
  }

  return state.loading ? renderLoading() : state.error ? renderError() : renderCartItems();
}

export default Cart;