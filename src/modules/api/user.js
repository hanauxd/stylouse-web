import { get } from './api';

export const onViewProfile = () => {
  const endpoint = 'users';
  const token = localStorage.getItem('jwt');
  return get(endpoint, token);
}