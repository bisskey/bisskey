// @flow

import React, { Component } from 'react'
import styled from 'styled-components'
import NewsPaperIcon from './icons/newspaper'
import UserIcon from './icons/user'
import GearIcon from './icons/gear'
import PlusIcon from './icons/plus'
import { color } from '../../constants/styles'

const SCIcon = styled.div`
  width: 30px;
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
  position: relative;
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
  > div {
    position: relative;
    z-index: 1;
  }
`

const SCLiSpecial = styled(SCLi)`
  .header-menu__icon {
    top: 3px;
    display: initial;
    svg {
      width: 55px;
    }
  }
  .header-menu__label {
    display: none;
  }
  &:before {
    content: "";
    position: absolute;
    background: ${color.darkBlue};
    width: 90px;
    height: 90px;
    left: 50%;
    top: 0rem;
    border-radius: 100%;
    z-index: 0;
    transform: translateX(-50%)
  }
`

class HeaderMenu extends Component {
  listMenu (label: string, icon: any, active: boolean = false, special: boolean = false) {
    let props = {}
    if (active) {
      props = Object.assign({}, {
        'data-active': active
      })
    }
    let Li = SCLi

    if (special) {
      Li = SCLiSpecial
      props = Object.assign({}, props, {
        'data-special': true
      })
    }

    return (
      <Li {...props}>
        <SCIcon className="header-menu__icon">
          {icon}
        </SCIcon>
        <div className="header-menu__label">
          {label}
        </div>
      </Li>
    )
  }

  render () {
    return (
      <SCUl className="header-menu">
        {this.listMenu('Home', <NewsPaperIcon/>, true)}
        {this.listMenu('Profile', <UserIcon/>, false)}
        {this.listMenu('Add', <PlusIcon/>, false, true)}
        {this.listMenu('Post', <NewsPaperIcon/>, false)}
        {this.listMenu('Settings', <GearIcon/>, false)}
      </SCUl>
    )
  }
}

export default HeaderMenu
