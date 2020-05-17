import { post, get, remove } from './api';

export const onCreateReview = (review, token) => {
  const endpoint = 'reviews?sort=date,desc';
  return post(endpoint, review, token);
};

export const onFetchReviewsByProduct = (productId, token) => {
  const endpoint = `reviews/product/${productId}?sort=date,desc`;
  return get(endpoint, token);
};

export const onDeleteReview = (reviewId, token) => {
  return remove('reviews', reviewId, token);
};
