// @flow

import React, { Component } from 'react'
import styled from 'styled-components'
// $FlowFixMe
import RSelect from 'react-select'
// $FlowFixMe
import 'react-select/dist/react-select.css'
import Label from '../Label'

const SCSelect = styled(RSelect)`
  outline: none;
  .Select-control {
    border-radius: 3px;
    border-color: #FFF;
    height: 45px;
  }
  .Select-value, .Select-placeholder {
    top: 5px !IMPORTANT;
  }
`

export type selectProps = {
  value: string,
  label: string
}

class Select extends Component {
  props: {
    options: Array<selectProps> | null,
    placeholder: string
  }

  static defaultProps = {
    options: null,
    placeholder: ''
  }

  state: {
    value: Object | null,
    options: Array<selectProps> | null
  }

  constructor (props: Object) {
    super(props)
    this.state = {
      value: null,
      options: this.props.options
    }
  }

  _changeValue (value: Object) {
    this.setState({ value })
  }

  render () {
    const select = (
      <SCSelect
        name="form-field-name"
        value={this.state.value}
        options={this.state.options}
        searchable={true}
        clearable={true}
        simpleValue
        onChange={this._changeValue.bind(this)}
        placeholder={this.props.placeholder}
      />
    )

    return this.props.label
      ? <Label text={this.props.label}>{select}</Label>
      : select
  }
}

export default Select
