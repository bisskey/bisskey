// @flow

import React, { Component } from 'react'
import styled from 'styled-components'
import PostItem from './Item'
import type { PropsPost } from './Item'

const SCLabel = styled.label`
  text-align: center;
`

class Post extends Component {
  props: {
    data: {
      [string]: PropsPost[]
    }
  }

  parseData (data) {
    return Object.keys(data)
      .map(key => data[key].map(item => {
        return (
          <SCLabel key={`post__item-${key}--${item.id}`}>
            <div className="post__date">
              <span>{key}</span>
            </div>
            <div className="post__list">
              <PostItem data={item}/>
            </div>
          </SCLabel>
        )
      }))
  }

  render () {
    return (
      <div className="post">
        { this.parseData(this.props.data) }
      </div>
    )
  }
}

export default Post
