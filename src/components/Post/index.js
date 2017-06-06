// @flow

import React, { Component } from 'react'
import styled from 'styled-components'
import PostItem from './Item'
import type { PostData } from './type'

const SCLabel = styled.label`
  text-align: center;
`

const SCPostDate = styled.div`
  margin: 10px auto;
  h2 {
    font-weight: lighter;
    letter-spacing: 3px;
    color: #BBBBBB;
  }
`

class Post extends Component {
  props: {
    data: PostData
  }

  parseData (data: PostData) {
    return Object.keys(data).map(key => {
      return (
        <SCLabel key={`post__item-${key}`}>
          <SCPostDate className="post__date">
            <h2>{key}</h2>
          </SCPostDate>
          {
            data[key].map(item => (
              (
                <div className="post__list" key={`post__item-${key}--${item.id}`}>
                  <PostItem data={item}/>
                </div>
              )
            ))
          }
        </SCLabel>
      )
    })
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
