// @flow

import * as types from '../constants/actionTypes'
import type { actionReducer } from './type'

export type authResponseType = {
  accessToken: string,
  userID: string,
  expiresIn: number,
  signedRequest: string
}

export type authStateType = {
  authResponse: authResponseType | void,
  status: 'unknown' | 'not_authorized' | 'connected'
}

const initialState: authStateType = {
  authResponse: undefined,
  status: 'unknown'
}

export default function auth (state: authStateType = initialState, action: actionReducer) {
  switch (action.type) {
    case types.AUTH_SET:
      return Object.assign({}, state, action.payload)

    case types.AUTH_RESET:
      return Object.assign({}, initialState)

    default:
      return state
  }
}
