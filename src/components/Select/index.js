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

class Select extends Component {
  state: {
    value: Object | null,
    options: Object[]
  }

  constructor (props: Object) {
    super(props)
    this.state = {
      value: null,
      options: [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' },
        { value: 'three', label: 'Three' },
        { value: 'four', label: 'Four' },
        { value: 'five', label: 'Five' }
      ]
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
