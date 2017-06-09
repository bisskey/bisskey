// @flow

import React, { Component } from 'react'
import styled from 'styled-components'

import Menu from './menu'

import { color } from '../../constants/styles'

import type { authStateType } from '../../reducers/auth'

const SCHeader = styled.header`
  background-color: ${color.darkBlue};
  min-height: 65px;
  width: 100%;
  display: flex;
  align-items: center;
  text-transform: capitalize;
  color: ${color.headerLightWhite};
  a {
    color: #FFF;
    text-decoration: none;
  }
`

const SCNav = styled.nav`
  width: 100%;
`

class Header extends Component {
  handleLogout () {
    const { fb } = this.props
    fb.logout()
  }

  handleLogin (auth: authStateType) {
    switch (auth.status) {
      case 'connected':
        return (
          <SCNav>
            <Menu/>
          </SCNav>
        )
      case 'unknown':
        return (
          <div
            style={{margin: '0 auto'}}
            className="fb-login-button"
            data-max-rows="1"
            data-size="large"
            data-button-type="continue_with"
            data-show-faces="false"
            data-auto-logout-link="false"
            data-use-continue-as="false"
          ></div>
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
