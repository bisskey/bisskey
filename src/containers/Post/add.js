// @flow

import React, { Component } from 'react'
import styled from 'styled-components'

import TextInput from '../../components/TextInput'
import Select from '../../components/Select'
import Button from '../../components/Button'

import { clearFix } from '../../utils/style'

const SCWrapper = styled.div`
  margin: 10px 20px;
  margin-top: 30px;
`

const SCButton = styled(Button)`
  float: right;
  ${clearFix()}
`

class PostAdd extends Component {
  render () {
    return (
      <SCWrapper>
        <h2>Create post</h2>
        <form action="">
          <Select label="Pilih stasiun TV" placeholder="Pilih..."/>
          <TextInput label="Masukkan BissKey Kode" placeholder="contoh: 8888888A88AE8AEC"/>
          <SCButton>Add Post</SCButton>
        </form>
      </SCWrapper>
    )
  }
}

export default PostAdd
