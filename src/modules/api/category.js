import { get, post } from './api';

let endpoint = 'categories';
const token = localStorage.getItem('jwt');

export const onFetchCategories = () => {
  return get(endpoint, token);
}

export const onAddCategory = category => {
  return post(endpoint, category, token);
}