import { get, post } from './api';

let endpoint = 'categories';

export const onFetchCategories = token => {
  return get(endpoint, token);
};

export const onAddCategory = (category, token) => {
  return post(endpoint, category, token);
};
