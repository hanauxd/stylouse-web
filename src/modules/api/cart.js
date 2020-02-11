import { post, get, remove } from './api';

const token = localStorage.getItem('jwt');
let endpoint = 'cart';

export const onAddToCart = values => {
  const body = {
    ...values
  }
  return post(endpoint, body, token);
}

export const onGetCartItems = () => {
  return get(endpoint, token);
}

export const onRemoveCart = id => {
  return remove(endpoint, id, token);
}

export const onPlaceOrder = values => {
  const body = {
    ...values
  }
  return post(endpoint.concat('/checkout'), body, token)
}