// @flow

import { combineReducers } from 'redux'
// $FlowFixMe
import ApolloClient, { createNetworkInterface } from 'apollo-client'

import auth from './auth'
import profile from './profile'

export const client = new ApolloClient({
  networkInterface: createNetworkInterface({uri: 'https://api.graph.cool/simple/v1/cj3l3d4us3z0y0160svn555bf'})
})

const reducers = combineReducers({
  auth,
  profile,
  data: client.reducer()
})

export default reducers
