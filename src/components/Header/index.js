// @flow

import React, { Component } from 'react'
import styled from 'styled-components'
// import { initProfile } from '../../actions/profile'
import { color } from '../../constants/styles'

const SCHeader = styled.header`
  background-color: ${color.darkBlue};
  height: 65px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: capitalize;
  color: ${color.headerLightWhite};
  a {
    color: #FFF !IMPORTANT;
    text-decoration: none;
  }
`

class Header extends Component {
  handleLogout () {
    const { fb } = this.props
    fb.logout()
  }

  profileInit (authResponse) {
    const { fb } = this.props

    fb.api('/me', {
      access_token: authResponse.accessToken
    }, response => {
    })

    return (
      <button onClick={this.handleLogout.bind(this)}>
        Logout
      </button>
    )
  }

  handleLogin (auth) {
    switch (auth.status) {
      case 'connected':
        return this.profileInit(auth.authResponse)
      case 'unknown':
        return (
          <div
            className="fb-login-button"
            data-max-rows="1"
            data-size="large"
            data-button-type="continue_with"
            data-show-faces="false"
            data-auto-logout-link="false"
            data-use-continue-as="false"
          />
        )
      case 'not_authorized':
      default:
        return (
          <div>
            Not authorized. Reload page and try again.
          </div>
        )
    }
  }

  render () {
    const { auth } = this.props
    return (
      <SCHeader id="header">
        {this.handleLogin(auth)}
      </SCHeader>
    )
  }
}

export default Header
