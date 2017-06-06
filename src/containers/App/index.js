// @flow

import React, { Component } from 'react'
import styled from 'styled-components'
import Header from '../../components/Header'
import { color } from '../../constants/styles'

const SCWrapper = styled.div`
  background-color: ${color.backgroundApp};
  min-height: 100vh;
  max-width: 520px;
  margin: 0 auto;
`

class App extends Component {
  render () {
    return (
      <SCWrapper className="wrapper">
        <Header/>
      </SCWrapper>
    )
  }
}

export default App
