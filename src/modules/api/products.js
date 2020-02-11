import { get, post } from './api';

let endpoint = 'products';
const token = localStorage.getItem('jwt');

export const onGetAllProducts = () => {
  return get(endpoint);
}

export const onGetProduct = id => {
  return get(endpoint.concat(`/${id}`))
}

export const onAddProduct = (product, files) => {
  let formData = new FormData();
  formData.append('product', JSON.stringify(product));
  files.forEach(file => {
    formData.append('file', file);
  })
  return post(endpoint, formData, token)
}