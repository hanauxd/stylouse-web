import { GET_PRODUCTS } from '../actions/actionTypes';
import createReducer from './createReducer';

const initialState = {
  products: null
}

const getProductsReducer = (state = initialState, { payload }) => {
  return {
    ...state,
    products: [
      ...payload
    ]
  }
}

export default createReducer(initialState, {
  [GET_PRODUCTS]: getProductsReducer
})