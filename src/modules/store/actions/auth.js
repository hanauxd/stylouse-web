import { AUTH_SUCCESS, AUTH_LOGOUT } from './actionTypes';

export const authSuccess = payload => {
  return {
    type: AUTH_SUCCESS,
    payload
  }
}

export const logout = () => {
  return {
    type: AUTH_LOGOUT
  }
}