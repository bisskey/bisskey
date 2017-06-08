// @flow

import * as types from '../constants/actionTypes'

const initialState = {}

export default function auth (state = initialState, action) {
  switch (action.type) {
    case types.PROFILE_SET:
      return Object.assign({}, state, action.payload)

    case types.PROFILE_RESET:
      return Object.assign({}, initialState)

    default:
      return state
  }
}
