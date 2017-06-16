// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
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
  render () {
    const { profile } = this.props
    return (
      <div>
        <SCPicture
          src={(profile && profile.picture && profile.picture.data.url) || 'https://myspace.com/common/images/user.png'}
        />
        <div className="profile-detail">
          <SCDetail className="profile-detail__name">
            <h2>Muhammad Habib Rohman</h2>
          </SCDetail>
          <SCDetail>
            <SCTable>
              <tbody>
                <tr>
                  <td>Posts</td>
                  <td>12</td>
                </tr>
                <tr>
                  <td>Followers</td>
                  <td>232</td>
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

export default connect(mapStateToProps)(Profile)
