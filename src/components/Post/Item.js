// @flow

import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'
// $FlowFixMe
import gql from 'graphql-tag'
// $FlowFixMe
import { graphql, compose } from 'react-apollo'
// $FlowFixMe
import throttle from 'lodash.throttle'

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
      color: #0ab2ff;
      font-size: .8rem;
    }
  }
  .post-item-action__icon {
    &.pop {
      animation: ${thumbsAnim} .5s ease-in-out;
    }
  }
  .post-item-action {
    color: #0ab2ff;
  }
  .post-item-action__icon {
    .svg-icon {
      pointer-events: none;
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
    data: PostDataItem,
    client: any,
    profile: any,
    updateLike: any,
    createLike: any
  }

  state: {
    like: Object,
    likesCount: number
  }

  constructor (props) {
    super(props)
    this.state = {
      like: {
        id: null,
        value: false
      },
      likesCount: 0
    }

    this.handleLike = throttle(this.handleLike.bind(this), 2000)
  }

  componentWillMount () {
    const { data } = this.props
    let selfLikes = this.state.like
    if (data.selfLikes && data.selfLikes.length > 0) {
      selfLikes = data.selfLikes[0]
    }

    this.setState({
      like: selfLikes,
      likesCount: data.likes.length
    })
  }

  parseBissKey (bissKey: string): string {
    let result = ''
    const max = 4

    for (let i = 0; i < bissKey.length / max; i++) {
      result += bissKey.substr(i, 4) + '-'
    }

    return result.replace(/-$/, '')
  }

  updateLike () {
    const id = this.state.like.id

    this.props.updateLike({
      variables: {
        id,
        value: !this.state.like.value
      }
    }).then(res => {
      const counted = res.data.updateLike.value
        ? ++this.state.likesCount
        : --this.state.likesCount

      this.setState({
        like: Object.assign({}, this.state.like, {
          value: res.data.updateLike.value
        }),
        likesCount: counted
      })
    })
  }

  createLike () {
    const { data, profile } = this.props
    this.props.createLike({
      variables: {
        postId: data.id,
        userId: profile.userId,
        value: !this.state.like.value
      }
    }).then((res) => {
      this.setState({
        like: res.data.createLike,
        likesCount: ++this.state.likesCount
      })
    })
  }

  handleLike = (event: MouseEvent) => {
    if (event.target) {
      (event.target: any).classList.add('pop')
      // Play sound if it's a like action
      if (!this.state.like.value) {
        const sound = new global.Audio()
        sound.src = PopSound
        sound.play()
      }
    }

    const { data, profile } = this.props
    if (!profile || !profile.userId) {
      window.alert('You need to login')
      return false
    }

    if (data.selfLikes && data.selfLikes.length === 1) {
      this.updateLike()
    } else {
      this.createLike()
    }

    setTimeout(() => {
      if (event.target) {
        (event.target: any).classList.remove('pop')
      }
    }, 1000)
  }

  _handleIconClick = (event: MouseEvent) => {
    // $FlowFixMe
    event.persist() // eslint-disable-line func-call-spacing
    this.handleLike(event)
  }

  render () {
    const { data } = this.props
    return (
      <SCItem className="post-item" data-liked={this.state.like.value}>
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
          <div className="post-item-action__icon" onClick={this._handleIconClick}>
            <SCImg className="svg-icon"/>
          </div>
          <div className="post-item-action__count">
            {this.state.likesCount}
          </div>
        </SCColumnIcon>
      </SCItem>
    )
  }
}

const updateLike = gql`
  mutation updateLike ($id: ID!, $value: Boolean) {
    updateLike (id: $id, value: $value) {
      value
    }
  }
`

const createLike = gql`
  mutation createLike ($value: Boolean, $postId: ID!, $userId: ID!) {
    createLike (value: $value, postId: $postId, userId: $userId) {
      id
      value
    }
  }
`

const PostItemWithData = compose(
  graphql(updateLike, { name: 'updateLike' }),
  graphql(createLike, { name: 'createLike' })
)(PostItem)

export default PostItemWithData
