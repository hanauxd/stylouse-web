import { get } from './api';

export const onFetchOrderHistory = token => {
  const endpoint = 'orders';
  return get(endpoint, token);
}