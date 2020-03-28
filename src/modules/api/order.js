import { get } from './api';

export const onFetchOrderHistory = token => {
  const endpoint = 'orders?sort=date,desc';
  return get(endpoint, token);
};
