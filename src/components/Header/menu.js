// @flow

import React, { Component } from 'react'
import styled from 'styled-components'
import NewsPaperIcon from './icons/newspaper'
import UserIcon from './icons/user'
import GearIcon from './icons/gear'
import { color } from '../../constants/styles'

const SCIcon = styled.div`
  width: 35px;
  margin: 1px auto;
`

const SCUl = styled.ul`
  color: ${color.headerLightWhite};
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
`

const SCLi = styled.li`
  padding: 10px 0;
  flex: 1;
  align-items: center;
  text-align: center;
  font-weight: 300;
  color: ${props => props['data-active'] ? '#FFF' : color.headerLightWhite};
  background-color: ${props => props['data-active'] ? 'rgba(0, 0, 0, 0.1)' : 'inherit'};
  svg {
    fill: ${props => props['data-active'] ? '#FFF' : color.headerLightWhite};
  }
`

class HeaderMenu extends Component {
  listMenu (label: string, icon: any, active: boolean = false) {
    let props = {}
    if (active) {
      props = Object.assign({}, {
        'data-active': active
      })
    }

    return (
      <SCLi {...props}>
        <SCIcon className="header-menu__icon">
          {icon}
        </SCIcon>
        <div className="header-menu__label">
          {label}
        </div>
      </SCLi>
    )
  }

  render () {
    return (
      <SCUl className="header-menu">
        {this.listMenu('Home', <NewsPaperIcon/>, true)}
        {this.listMenu('Profile', <UserIcon/>, false)}
        {this.listMenu('Post', <NewsPaperIcon/>, false)}
        {this.listMenu('Settings', <GearIcon/>, false)}
      </SCUl>
    )
  }
}

export default HeaderMenu
