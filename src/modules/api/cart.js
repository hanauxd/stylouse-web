import { post, get, remove } from './api';

let endpoint = 'cart';

export const onAddToCart = (values, token) => {
  const body = {
    ...values
  }
  return post(endpoint, body, token);
}

export const onGetCartItems = token => {
  return get(endpoint, token);
}

export const onRemoveCart = (id, token) => {
  return remove(endpoint, id, token);
}

export const onPlaceOrder = (values, token) => {
  const body = {
    ...values
  }
  return post(endpoint.concat('/checkout'), body, token)
}