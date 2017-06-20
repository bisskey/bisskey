// @flow

import React, { Component } from 'react'
import styled from 'styled-components'

const SCDiv = styled.div`
  margin-top: 5px;
  margin-bottom: 15px;
`

const SCLabel = styled.label`
  color: #8a8a8a;
`

class Label extends Component {
  render () {
    return (
      <SCLabel>
        {this.props.text}
        <SCDiv className="label-children">
          {this.props.children}
        </SCDiv>
      </SCLabel>
    )
  }
}

export default Label
