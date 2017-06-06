// @flow

import React, { Component } from 'react'
import styled from 'styled-components'
import type { PostDataItem } from './type'
import ThumbsUp from '../../assets/icons/thumbs-up.svg'
// import ThumbsUpActive from '../../assets/icons/thumbs-up-active.svg'

const SCItem = styled.div`
  text-align: left;
  background-color: #FFF;
  height: 100px;
  display: flex;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  margin: 5px 0;
`

const SCImg = styled.div`
  background-image: url(${props => props.src});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 100%;
`

const SCColumn = styled.div`
  flex: 1;
  height: 100%;
`

const SCColumnIcon = styled(SCColumn)`
  text-align: center;
  [class^=post-item-action__icon] {
    height: 55%;
    margin-bottom: 10px;
  }
  [class^=post-item-action__count] {
    color: #989898;
    font-size: .8rem;
  }
`

const SCColumnDetail = styled(SCColumn)`
  flex: 4;
  padding: 0 1rem;
  padding-left: 2rem;
  h2, h4 {
    margin: 0;
  }
  h2 {
    font-size: 1.4rem;
    color: #555555;
    letter-spacing: calc(0.9px * 2);
  }
  h4 {
    color: #5E5E5E;
    margin: 10px 0;
    letter-spacing: calc(0.98px * 2);
    font-weight: normal;
  }
`

class PostItem extends Component {
  props: {
    data: PostDataItem
  }

  parseBissKey (bissKey: string): string {
    let result = ''
    const max = 4

    for (let i = 0; i < bissKey.length / max; i++) {
      result += bissKey.substr(i, 4) + '-'
    }

    return result.replace(/-$/, '')
  }

  render () {
    const { data } = this.props
    return <SCItem className="post-item">
      <SCColumn>
        <SCImg src="http://www.rcti.tv/assets/images/RCTI-logo.png" alt=""/>
      </SCColumn>
      <SCColumnDetail className="post-item-detail">
        <div className="post-item-detail__channel-name">
          <h2>{ data.channel.name }</h2>
        </div>
        <div className="post-item-detail__bisskey">
          <h4>{this.parseBissKey(data.bissKey)}</h4>
        </div>
      </SCColumnDetail>
      <SCColumnIcon className="post-item-action">
        <div className="post-item-action__icon">
          <SCImg src={ThumbsUp}/>
        </div>
        <div className="post-item-action__count">
          342
        </div>
      </SCColumnIcon>
    </SCItem>
  }
}

export default PostItem
