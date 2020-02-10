import { get } from './api';

export const onFetchOrderHistory = () => {
  const endpoint = 'orders';
  const token = localStorage.getItem('jwt');
  return get(endpoint, token);
}