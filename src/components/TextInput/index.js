// @flow

import React, { Component } from 'react'
import styled from 'styled-components'

import Label from '../Label'

const SCInput = styled.input`
  border: 0;
  border-radius: 3px;
  width: 100%;
  box-sizing: border-box;
  font-size: 1em;
  padding: 13px 10px;
  outline: none;
  background-color: #FDFDFD;
  &::placeholder {
    color: #CCC !IMPORTANT;
  }
  &:focus {
    background-color: #FFF;
    outline: 1px solid rgba(19, 80, 121, 0.12);
    outline-offset: initial;
  }
`

class TextInput extends Component {
  render () {
    const textInput = <SCInput type="text" placeholder={this.props.placeholder}/>

    return this.props.label
      ? <Label text={this.props.label}>{textInput}</Label>
      : textInput
  }
}

export default TextInput
