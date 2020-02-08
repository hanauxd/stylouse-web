import { get } from './api';

export const onGetAllProducts = () => {
  const endpoint = 'products';
  return get(endpoint);
}

export const onGetProduct = id => {
  const endpoint = `products/${id}`
  return get(endpoint)
}