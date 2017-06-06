// @flow

import React, { Component } from 'react'
import styled from 'styled-components'
import { color } from '../../constants/styles'

const SCHeader = styled.header`
  background-color: ${color.darkBlue};
  height: 65px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: capitalize;
  color: ${color.headerLightWhite}
`

class Header extends Component {
  render () {
    return (
      <SCHeader id="header">
        This is awesome header
      </SCHeader>
    )
  }
}

export default Header
