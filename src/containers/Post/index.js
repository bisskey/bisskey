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
        if (result[date]) {
          (result[date]: {}[]).push(item)
        } else {
          result[date] = []
        }
      })
    }

    return result
  }

  render () {
    const data = this.parseData(this.props.data.allPosts)
    return (
      <CPost data={data} />
    )
  }
}

const PostQuery = gql`
  query getPost {
    allPosts {
      id
      createdAt
      value
      channel {
        id
        name
        image
      }
    }
  }
`

const PostWithData = graphql(PostQuery)(Post)

export default PostWithData
