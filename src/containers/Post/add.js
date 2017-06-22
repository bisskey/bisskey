// @flow

import React, { Component } from 'react'
import styled from 'styled-components'
// $FlowFixMe
import { graphql } from 'react-apollo'
// $FlowFixMe
import gql from 'graphql-tag'

import TextInput from '../../components/TextInput'
import Select from '../../components/Select'
import Button from '../../components/Button'

import { clearFix } from '../../utils/style'

const SCWrapper = styled.div`
  margin: 10px 20px;
  margin-top: 30px;
`

const SCButton = styled(Button)`
  float: right;
  ${clearFix()}
`

class PostAdd extends Component {
  _channelsToOptions (channels: Object[]) {
    if (!channels) return false

    return channels.map(item => ({
      value: item.id,
      label: item.name
    }))
  }

  render () {
    const options = this._channelsToOptions(this.props.data.allChannels)
    if (options && options.length > 0) {
      return (
        <SCWrapper>
          <h2>Create post</h2>
          <form action="">
            <Select
              label="Pilih stasiun TV"
              placeholder="Pilih..."
              // $FlowFixMe
              options={options}
            />
            <TextInput label="Masukkan BissKey Kode" placeholder="contoh: 8888888A88AE8AEC"/>
            <SCButton>Add Post</SCButton>
          </form>
        </SCWrapper>
      )
    } else {
      return (
        <div>
          Loading ...
        </div>
      )
    }
  }
}

const QueryChannel = gql`
  query getAllChannels {
    allChannels {
      id
      name
    }
  }
`

const ChannelData = graphql(QueryChannel)(PostAdd)

export default ChannelData
