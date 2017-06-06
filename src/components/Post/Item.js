// @flow

import React, { Component } from 'react'
import styled from 'styled-components'
import type { PostDataItem } from './type'

const SCItem = styled.div`
  text-align: left;
  background-color: #FFF;
  height: 80px;
  display: flex;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  margin: 20px 0;
`

class PostItem extends Component {
  props: PostDataItem

  render () {
    const { data } = this.props
    return <SCItem>
      { data.bissKey }
      { data.id }
      { data.channelId }
    </SCItem>
  }
}

export default PostItem