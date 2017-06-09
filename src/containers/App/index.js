// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { BrowserRouter as Router, Route } from 'react-router-dom'
// $FlowFixMe
import Script from 'react-load-script'
import Post from '../../containers/Post'
import { initAuth, resetAuth } from '../../actions/auth'
import { initProfile } from '../../actions/profile'
import { color } from '../../constants/styles'
import Header from '../../components/Header'

let fb

const SCWrapper = styled.div`
  background-color: ${color.backgroundApp};
  min-height: 100vh;
  max-width: 520px;
  margin: 0 auto;
`

class App extends Component {
  handleScriptLoad () {
    const { dispatch } = this.props
    const loadProfile = this.loadProfile

    if (!fb) {
      fb = window.FB
    }

    fb.init({
      appId: '820549668124535',
      cookie: true,
      xfbml: true,
      version: 'v2.9'
    })

    this.checkLogin().then(response => {
      if (response.status === 'connected') {
        dispatch(initAuth(response))
        this.loadProfile(response).then(res => dispatch(initProfile(res)))
      }
    })

    fb.Event.subscribe('auth.login', function (response) {
      dispatch(initAuth(response))
      loadProfile(response).then(res => dispatch(initProfile(res)))
    })

    fb.Event.subscribe('auth.logout', function (response) {
      dispatch(resetAuth())
      window.location.reload()
    })
  }

  loadProfile (response) {
    return new Promise(resolve => {
      fb.api('/me?fields=email,picture,name', {
        access_token: response.accessToken
      }, response => resolve(response))
    })
  }

  checkLogin () {
    return new Promise(resolve => {
      fb.getLoginStatus(response => resolve(response))
    })
  }

  render () {
    return (
      <Router>
        <SCWrapper className="wrapper">
          <Script
            url="https://connect.facebook.net/en_US/sdk.js"
            onLoad={this.handleScriptLoad.bind(this)}
          />
          <Header {...this.props} fb={fb}/>
          <div id="main">
            <Route exact path="/" component={Post}/>
            <Route exact path="/about" render={() => <h1>About Page</h1>}/>
          </div>
        </SCWrapper>
      </Router>
    )
  }
}

function mapStateToProps (state) {
  const { auth, profile } = state
  return {
    auth,
    profile
  }
}

export default connect(mapStateToProps)(App)
