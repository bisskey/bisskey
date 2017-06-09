// @flow

import React from 'react'
import Post from '../../components/Post'

const data = {
  '10 JUNI 2017': [
    {
      id: 'kdj',
      channel: {
        id: 'tvone',
        name: 'TV ONE'
      },
      bissKey: '9847DCE99873AED8'
    },
    {
      id: 'sdf',
      channel: {
        id: 'rcti',
        name: 'RCTI'
      },
      bissKey: 'FFFFDCE99873AED8'
    }
  ],
  '9 JUNI 2017': [
    {
      id: 'kdj',
      channel: {
        id: 'tvone',
        name: 'TV ONE'
      },
      bissKey: '9847DCE99873AED8'
    },
    {
      id: 'sdf',
      channel: {
        id: 'rcti',
        name: 'RCTI'
      },
      bissKey: 'FFFFDCE99873AED8'
    }
  ]
}

export default () => {
  return <Post data={data} />
}
