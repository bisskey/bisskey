// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'

const SCPicture = styled.div`
  width: 100px;
  height: 100px;
  margin: 0 auto;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  border-radius: 100%;
  margin-top: 20px;
`

const SCDetail = styled.div`
  text-align: center;
`

const SCTable = styled.table`
  width: 100%;
  background: #fff;
  border-collapse: collapse;
  tr {
    border-bottom: 1px solid #ddd;
    margin: 2px 0;
  }
  td {
    padding: 20px 25px;
    font-size: 1.2rem;
    color: #999;
    font-weight: 400;
  }
  td:first-child {
    text-align: left;
  }
  td:last-child {
    text-align: right;
    color: #555;
  }
`

class Profile extends Component {
  componentWillReceiveProps () {
    this.props.data.refetch()
  }

  render () {
    const { profile } = this.props
    return (
      <div>
        <SCPicture
          src={(profile && profile.picture && profile.picture.data.url) || 'https://myspace.com/common/images/user.png'}
        />
        <div className="profile-detail">
          <SCDetail className="profile-detail__name">
            <h2>{ profile.name || 'Anonymous'}</h2>
          </SCDetail>
          <SCDetail>
            <SCTable>
              <tbody>
                <tr>
                  <td>Posts</td>
                  <td>{ (this.props.data && this.props.data.User && this.props.data.User.posts.length) || 0 }</td>
                </tr>
                <tr>
                  <td>Likes</td>
                  <td>{ (this.props.data && this.props.data.User && this.props.data.User.likes.length) || 0 }</td>
                </tr>
              </tbody>
            </SCTable>
          </SCDetail>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const { profile } = state
  return {
    profile
  }
}

const QueryUser = gql`
  query getUser ($id: ID!) {
    User (id: $id) {
      posts {
        id
      }
      likes (filter: {value: true}) {
        id
      }
    }
  }
`

const ProfileWithData = compose(
  connect(mapStateToProps),
  graphql(QueryUser, {
    options: ({ profile }) => {
      return {
        variables: {
          id: profile.userId || 0
        }
      }
    }
  })
)(Profile)

export default ProfileWithData
