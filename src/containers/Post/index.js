// @flow

import React from 'react'
// $FlowFixMe
import { graphql } from 'react-apollo'
// $FlowFixMe
import gql from 'graphql-tag'
// $FlowFixMe
import tinydate from 'tinydate'

import CPost from '../../components/Post'

const parseData = (data) => {
  let result = {}

  if (data) {
    data.map(item => { // eslint-disable-line array-callback-return
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

const Post = props => {
  const data = parseData(props.data.allPosts)
  return <CPost data={data} />
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
