// @flow

import * as types from '../constants/actionTypes'

const initialState = {
  id: undefined,
  name: undefined,
  photo_profile: undefined
}

export default function auth (state = initialState, action) {
  switch (action.type) {
    case types.PROFILE_SET:
      return Object.assign({}, state, action.payload)

    default:
      return state
  }
}
