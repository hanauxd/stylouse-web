import { AUTH_SUCCESS, AUTH_LOGOUT } from './../actions/actionTypes';
import createReducer from './createReducer';

const initialState = {
  auth: null
}

const authSuccessReducer = (state = initialState, { payload }) => {
  return {
    ...state,
    auth: {
      ...payload
    }
  }
}

const authLogoutReducer = (state = initialState, { payload }) => {
  return {
    ...state,
    auth: null
  }
}

export default createReducer(initialState, {
  [AUTH_SUCCESS]: authSuccessReducer,
  [AUTH_LOGOUT]: authLogoutReducer
})