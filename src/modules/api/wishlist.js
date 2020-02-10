import { post, get } from './api';

const endpoint = 'wishlist';
const token = localStorage.getItem('jwt');

export const onAddToWishlist = id => {
  const body = { productId: id };
  return post(endpoint, body, token);
}

export const onFetchWishlist = () => {
  return get(endpoint, token);
}