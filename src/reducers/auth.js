// @flow

import * as types from '../constants/actionTypes'

const initialState = {
  authResponse: undefined,
  status: 'unknown'
}

export default function auth (state = initialState, action) {
  switch (action.type) {
    case types.AUTH_SET:
      return Object.assign({}, state, action.payload)

    case types.AUTH_RESET:
      return Object.assign({}, initialState)

    default:
      return state
  }
}
