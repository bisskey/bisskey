// @flow

import React from 'react'
import ReactDOM from 'react-dom'
// $FlowFixMe
import { ApolloProvider } from 'react-apollo'
// import { Provider } from 'react-redux'

import App from './containers/App'

import registerServiceWorker from './registerServiceWorker'
import configureStore from './store'
import { client } from './reducers'

import './assets/styles/index.css'

const store = configureStore()

ReactDOM.render(
  <ApolloProvider store={store} client={client}>
    <App/>
  </ApolloProvider>,
document.getElementById('root'))

registerServiceWorker()
