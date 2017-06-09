// @flow

import React, { Component } from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
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
  > a:before {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    content: "";
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

type menuType = {
  label: string,
  to: string,
  icon: any,
  active?: boolean,
  special?: boolean
}

class HeaderMenu extends Component {
  props: {
    list: menuType[]
  }

  static defaultProps = {
    list: [
      {
        label: 'Home',
        icon: <NewsPaperIcon/>,
        to: '/',
        active: true
      },
      {
        label: 'Profile',
        icon: <UserIcon/>,
        to: '/profile'
      },
      {
        label: 'Add Post',
        icon: <PlusIcon/>,
        to: '/add_post',
        special: true
      },
      {
        label: 'Post',
        icon: <UserIcon/>,
        to: '/post'
      },
      {
        label: 'Settings',
        icon: <GearIcon/>,
        to: '/settings'
      }
    ]
  }

  renderMenu (option: menuType) {
    const {
      label,
      to,
      icon,
      special = false,
      active = false
    } = option

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
      <Li {...props} key={`header-menu__${label.toUpperCase()}--${to.toUpperCase()}`}>
        <SCIcon className="header-menu__icon">
          {icon}
        </SCIcon>
        <div className="header-menu__label">
          {label}
        </div>
        <NavLink to={to}/>
      </Li>
    )
  }

  render () {
    return (
      <SCUl className="header-menu">
        { this.props.list.map(item => this.renderMenu(item)) }
      </SCUl>
    )
  }
}

export default HeaderMenu
