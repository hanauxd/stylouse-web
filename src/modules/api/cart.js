import { post, get } from './api';

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