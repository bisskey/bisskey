// @flow

import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers/index'

export default function configureStore (initialState) {
  const composeEnhancers =
    typeof window === 'object' &&
    process.env.NODE_ENV !== 'production' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      }) : compose

  const enhancer = composeEnhancers(
    applyMiddleware(
      thunkMiddleware
    )
  )

  const store = createStore(rootReducer, enhancer)

  return store
}
