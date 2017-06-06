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
