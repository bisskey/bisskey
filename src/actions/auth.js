import * as types from '../constants/actionTypes'

export const initAuth = (state) => {
  return {
    type: types.AUTH_SET,
    payload: state
  }
}

export const resetAuth = () => {
  return {
    type: types.AUTH_RESET
  }
}
