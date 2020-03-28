import { get, post } from './api';

let endpoint = 'products';

export const onGetAllProducts = () => {
  const endpoint = 'products?sort=createdAt,desc';
  return get(endpoint);
};

export const onGetProduct = id => {
  return get(endpoint.concat(`/${id}`));
};

export const onAddProduct = (product, files, token) => {
  let formData = new FormData();
  formData.append('product', JSON.stringify(product));
  files.forEach(file => {
    formData.append('file', file);
  });
  return post(endpoint, formData, token);
};

export const onUpdateProduct = (product, token) => {
  const endpoint = `products/${product.id}`;
  return post(endpoint, product, token);
};
