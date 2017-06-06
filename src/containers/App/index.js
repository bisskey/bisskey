// @flow

import React, { Component } from 'react'
import styled from 'styled-components'
import { color } from '../../constants/styles'

import Header from '../../components/Header'
import Post from '../../components/Post'

const SCWrapper = styled.div`
  background-color: ${color.backgroundApp};
  min-height: 100vh;
  max-width: 520px;
  margin: 0 auto;
`

class App extends Component {
  render () {
    const data = {
      '10-06-2017': [
        {
          id: 'kdj',
          channelId: 'tvone',
          bissKey: '9847DCE99873AED8'
        }
      ]
    }

    return (
      <SCWrapper className="wrapper">
        <Header/>
        <div id="main">
          <Post
            data={data}
          />
        </div>
      </SCWrapper>
    )
  }
}

export default App
