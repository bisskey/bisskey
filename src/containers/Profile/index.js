// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'

class Profile extends Component {
  render () {
    return (
      <div>
        Profile
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
