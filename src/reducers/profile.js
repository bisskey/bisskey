// @flow

import * as types from '../constants/actionTypes'
import type { actionReducer } from './type'

export type profileStateAvailableType = {
  picture: Object | void,
  name: string,
  id: string
}

export type profileStateType = profileStateAvailableType | Object

const initialState: profileStateType = {}

export default function auth (state: profileStateType = initialState, action: actionReducer) {
  switch (action.type) {
    case types.PROFILE_SET:
      return Object.assign({}, state, action.payload)

    case types.PROFILE_RESET:
      return Object.assign({}, initialState)

    default:
      return state
  }
}
