// @flow

import React, { Component } from 'react'
import styled from 'styled-components'
// $FlowFixMe
import { graphql, compose } from 'react-apollo'
// $FlowFixMe
import gql from 'graphql-tag'
// $FlowFixMe
import isBisskey from 'is-bisskey'

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
  bisskey: { input: HTMLInputElement }
  channelId: any

  _channelsToOptions (channels: Object[]) {
    if (!channels) return false

    return channels.map(item => ({
      value: item.id,
      label: item.name
    }))
  }

  _handleAddPost (event: MouseEvent) {
    event.preventDefault()
    const channelId = this.channelId.state.value
    const bisskey = this.bisskey.input.value
    if (isBisskey(bisskey)) {
      this.props.createPost({
        variables: {
          value: bisskey,
          channelId,
          userId: this.props.profile.userId
        }
      }).then(() => window.alert('Sukses'))
    } else {
      window.alert('That\'s is not bisskey key')
    }
  }

  render () {
    const options = this._channelsToOptions(this.props.data.allChannels)
    if (options && options.length > 0 && this.props.profile.id) {
      /* eslint-disable no-return-assign */
      return (
        <SCWrapper>
          <h2>Create post</h2>
          <form action="" onSubmit={this._handleAddPost.bind(this)}>
            <Select
              ref={ input => this.channelId = input }
              label="Pilih stasiun TV"
              placeholder="Pilih..."
              // $FlowFixMe
              options={options}
            />
            <TextInput ref={input => this.bisskey = input } label="Masukkan BissKey Kode" placeholder="contoh: 8888888A88AE8AEC"/>
            <SCButton type="submit">Add Post</SCButton>
          </form>
        </SCWrapper>
      )
      /* eslint-enable */
    } else {
      return (
        <div>
          Loading ...
        </div>
      )
    }
  }
}

const createPost = gql`
  mutation createPost ($value: String!, $channelId: ID, $userId: ID) {
    createPost (value: $value, channelId: $channelId, userId: $userId) {
      id
    }
  }
`

const QueryChannel = gql`
  query getAllChannels {
    allChannels {
      id
      name
    }
  }
`

const PostAddWithData = compose(
  graphql(createPost, { name: 'createPost' }),
  graphql(QueryChannel)
)(PostAdd)

export default PostAddWithData
