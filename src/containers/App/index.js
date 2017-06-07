// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Script from 'react-load-script'
import { initAuth, resetAuth } from '../../actions/auth'
import { color } from '../../constants/styles'
import Header from '../../components/Header'
import Post from '../../components/Post'

let fb

const SCWrapper = styled.div`
  background-color: ${color.backgroundApp};
  min-height: 100vh;
  max-width: 520px;
  margin: 0 auto;
`

const data = {
  '10 JUNI 2017': [
    {
      id: 'kdj',
      channel: {
        id: 'tvone',
        name: 'TV ONE'
      },
      bissKey: '9847DCE99873AED8'
    },
    {
      id: 'sdf',
      channel: {
        id: 'rcti',
        name: 'RCTI'
      },
      bissKey: 'FFFFDCE99873AED8'
    }
  ],
  '9 JUNI 2017': [
    {
      id: 'kdj',
      channel: {
        id: 'tvone',
        name: 'TV ONE'
      },
      bissKey: '9847DCE99873AED8'
    },
    {
      id: 'sdf',
      channel: {
        id: 'rcti',
        name: 'RCTI'
      },
      bissKey: 'FFFFDCE99873AED8'
    }
  ]
}

class App extends Component {
  handleScriptLoad () {
    const { dispatch } = this.props
    if (!fb) {
      fb = window.FB
    }

    fb.init({
      appId: '820549668124535',
      cookie: true,
      xfbml: true,
      version: 'v2.9'
    })

    fb.login(response => {
    }, {
      scope: 'email'
    })

    fb.Event.subscribe('auth.login', function (response) {
      dispatch(initAuth(response))
    })

    fb.Event.subscribe('auth.logout', function (response) {
      dispatch(resetAuth())
      window.location.reload()
    })
  }

  get checkLogin () {
    return new Promise(resolve => {
      fb.getLoginStatus(response => resolve(response))
    })
  }

  render () {
    return (
      <SCWrapper className="wrapper">
        <Script
          url="https://connect.facebook.net/en_US/sdk.js"
          onLoad={this.handleScriptLoad.bind(this)}
        />
        <Header {...this.props} fb={fb}/>
        <div id="main">
          <Post
            data={data}
          />
        </div>
      </SCWrapper>
    )
  }
}

function mapStateToProps (state) {
  const { auth } = state
  return {
    auth
  }
}

export default connect(mapStateToProps)(App)
