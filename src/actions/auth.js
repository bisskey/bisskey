import * as types from '../constants/actionTypes'
import { resetProfile } from './profile'

export const initAuth = (state) => {
  return {
    type: types.AUTH_SET,
    payload: state
  }
}

export const logoutAuth = () => {
  return {
    type: types.AUTH_RESET
  }
}

export const resetAuth = () => {
  return dispatch => {
    dispatch(logoutAuth())
    dispatch(resetProfile())
  }
}
