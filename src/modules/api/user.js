import { get } from './api';

export const onViewProfile = token => {
  const endpoint = 'users';
  return get(endpoint, token);
}