import * as types from '../constants/actionTypes'

export const initProfile = (state) => {
  return {
    type: types.PROFILE_SET,
    payload: state
  }
}

export const resetProfile = (state) => {
  return {
    type: types.PROFILE_RESET
  }
}
