import { post, get, remove } from './api';

const endpoint = 'wishlist';

export const onAddToWishlist = (id, token) => {
  const body = { productId: id };
  return post(endpoint, body, token);
}

export const onFetchWishlist = token => {
  return get(endpoint, token);
}

export const onRemoveWishlist = (id, token) => {
  return remove(endpoint, id, token);
}