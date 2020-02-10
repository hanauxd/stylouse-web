import { post, get, remove } from './api';

export const onAddToCart = values => {
  const endpoint = 'cart';
  const token = localStorage.getItem('jwt');
  const body = {
    ...values
  }
  return post(endpoint, body, token);
}

export const onGetCartItems = () => {
  const endpoint = 'cart';
  const token = localStorage.getItem('jwt');
  return get(endpoint, token);
}

export const onRemoveCart = id => {
  const endpoint = 'cart';
  const token = localStorage.getItem('jwt');
  return remove(endpoint, id, token);
}

export const onPlaceOrder = values => {
  const endpoint = 'cart/checkout';
  const token = localStorage.getItem('jwt');
  const body = {
    ...values
  }
  return post(endpoint, body, token)
}