import { GET_PRODUCTS } from './actionTypes';

export const getProducts = payload => {
  return {
    type: GET_PRODUCTS,
    payload
  }
}