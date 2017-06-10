// @flow

import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'

import type { PostDataItem } from './type'

import ThumbsUp from '../../assets/icons/thumbs-up.svg'
import ThumbsUpActive from '../../assets/icons/thumbs-up-active.svg'
// $FlowFixMe
import PopSound from '../../assets/sounds/pop.wav'

const thumbsAnim = keyframes`
  5% {
    transform: scale(1)
  }
  30% {
    transform: scale(1.5)
  }
  90% {
    transform: scale(1)
  }
`

const SCItem = styled.div`
  text-align: left;
  background-color: #FFF;
  height: 100px;
  display: flex;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  margin: 5px 0;
  &[data-liked="true"] {
    .post-item-action__icon {
      animation: ${thumbsAnim} .5s ease-in-out;
    }
    .post-item-action__count {
      color: #0ab2ff;
      font-size: .8rem;
    }
  }
  .post-item-action {
    color: #0ab2ff;
  }
  .post-item-action__icon {
    .svg-icon {
      background-image : url(${props => props['data-liked'] ? ThumbsUpActive : ThumbsUp});
    }
  }
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

  state: {
    liked: boolean
  }

  constructor (props: any) {
    super(props)
    this.state = {
      liked: false
    }
  }

  parseBissKey (bissKey: string): string {
    let result = ''
    const max = 4

    for (let i = 0; i < bissKey.length / max; i++) {
      result += bissKey.substr(i, 4) + '-'
    }

    return result.replace(/-$/, '')
  }

  handleIconClick (event: MouseEvent) {
    if (!this.state.liked) {
      const sound = new global.Audio()
      sound.src = PopSound
      sound.play()
    }

    this.setState({
      liked: !this.state.liked
    })
  }

  render () {
    const { data } = this.props
     /* eslint-disable no-return-assign */
    return (
      <SCItem className="post-item" data-liked={this.state.liked}>
        <SCColumn>
          <SCImg src={data.channel.image} alt=""/>
        </SCColumn>
        <SCColumnDetail className="post-item-detail">
          <div className="post-item-detail__channel-name">
            <h2>{ data.channel.name }</h2>
          </div>
          <div className="post-item-detail__bisskey">
            <h4>{this.parseBissKey(data.value)}</h4>
          </div>
        </SCColumnDetail>
        <SCColumnIcon className="post-item-action">
          <div className="post-item-action__icon" onClick={this.handleIconClick.bind(this)}>
            <SCImg className="svg-icon"/>
          </div>
          <div className="post-item-action__count">
            342
          </div>
        </SCColumnIcon>
      </SCItem>
    )
    /* eslint-enable no-return-assign */
  }
}

export default PostItem
