import { post, get, remove } from './api';

export const onCreateReview = (review, token) => {
  const endpoint = 'reviews';
  return post(endpoint, review, token);
};

export const onFetchReviewsByProduct = (productId) => {
  const endpoint = `reviews/product/${productId}?sort=date,desc`;
  return get(endpoint);
};

export const onDeleteReview = (reviewId, token) => {
  const endpoint = `reviews/${reviewId}`;
  return remove(endpoint, null, token);
};
