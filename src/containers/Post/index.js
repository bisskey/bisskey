// @flow

import React, { Component } from 'react'
// $FlowFixMe
import { graphql } from 'react-apollo'
// $FlowFixMe
import gql from 'graphql-tag'
// $FlowFixMe
import tinydate from 'tinydate'

import CPost from '../../components/Post'

class Post extends Component {
  parseData (data: {}[]): Object {
    let result = {}

    if (data) {
      data.map((item: Object) => { // eslint-disable-line array-callback-return
        const date = tinydate('{DD}-{MM}-{YYYY}')(new Date(item.createdAt))
        if (!result[date]) {
          result[date] = []
        }
        (result[date]: {}[]).push(item)
      })
    }

    return result
  }

  _handleClick () {
    this.props.data.refetch()
  }

  componentWillReceiveProps () {
    this._handleClick()
  }

  render () {
    const data = this.parseData(this.props.data.allPosts)
    const result = this.props.data.loading
      ? <div>Loading ...</div>
      : <CPost data={data} profile={this.props.profile}/>

    return (
      <div>
        <button onClick={this._handleClick.bind(this)}>Refresh</button>
        { result }
      </div>
    )
  }
}

const PostQuery = gql`
  query getPost ($self: String) {
    allPosts (orderBy: createdAt_DESC) {
      id
      createdAt
      value
      selfLikes: likes (filter: {user: {fbId: $self}}) {
        id
        value
      }
      likes(filter: {value: true}) {
        id
        value
      }
      channel {
        id
        name
        image
      }
    }
  }
`

const PostWithData = graphql(PostQuery, {
  options: ({ profile, auth }) => {
    return {
      variables: {
        self: (profile && profile.id) || ''
      },
      fetchPolicy: true
    }
  }
})(Post)

export default PostWithData
