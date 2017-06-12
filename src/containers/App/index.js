// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
// $FlowFixMe
import { compose, withApollo } from 'react-apollo'
// $FlowFixMe
import gql from 'graphql-tag'
import styled from 'styled-components'
import { BrowserRouter as Router, Route } from 'react-router-dom'
// $FlowFixMe
import Script from 'react-load-script'

import {
  loadProfile,
  checkLogin
} from '../../utils/fb'

import Post from '../../containers/Post'
import Profile from '../../containers/Profile'

import { initAuth, resetAuth } from '../../actions/auth'
import { initProfile } from '../../actions/profile'

import { color } from '../../constants/styles'
import { media } from '../../utils/style'

import Header from '../../components/Header'

const SCWrapper = styled.div`
  background-color: ${color.backgroundApp};
  min-height: 100vh;
  max-width: 520px;
  margin: 0 auto;
  padding-bottom: 2em;
  ${media.phone`padding-bottom: 5em;`}
`

const SCMain = styled.div`
  padding-top: 10px;
`

class App extends Component {
  state: {
    loaded: boolean
  }

  constructor (props) {
    super(props)
    this.state = {
      loaded: false
    }
  }

  componentDidMount () {
    this.setState({
      loaded: true
    })
  }

  dispatchInitProfile (response) {
    const { dispatch, client } = this.props
    dispatch(initAuth(response))
    loadProfile(response).then(res => {
      const { id } = res

      client.query({
        query: gql`
          query findUserLoggedIn ($fbId: String!) {
            User (fbId: $fbId) {
              id
            }
          }
        `,
        variables: {
          fbId: id
        }
      }).then(({ data }) => {
        const newData = Object.assign({}, res, {
          userId: data.User.id
        })

        dispatch(initProfile(newData))
      })
    })
  }

  handleScriptLoad () {
    const { dispatch } = this.props

    window.FB.init({
      appId: '820549668124535',
      cookie: true,
      xfbml: true,
      version: 'v2.9'
    })

    if (this.state.loaded && window.FB) {
      checkLogin().then(response => {
        if (response.status === 'connected') {
          this.dispatchInitProfile(response)
        }
      })
    }

    window.FB.Event.subscribe('auth.login', (response) => {
      this.dispatchInitProfile(response)
    })

    window.FB.Event.subscribe('auth.logout', (response) => {
      dispatch(resetAuth())
      window.location.reload()
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
          <Header {...this.props}/>
          <SCMain id="main">
            <Route exact path="/" render={() => <Post {...this.props} />} />
            <Route exact path="/about" render={() => <h1>About Page</h1>}/>
            <Route exact path="/profile" component={Profile}/>
          </SCMain>
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

export default compose(
  connect(mapStateToProps),
  withApollo
)(App)
